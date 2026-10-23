const fs = require('fs');
const path = require('path');

const SAMPLE_RATE = 22050; // crisp audio, compact size
const NUM_CHANNELS = 2; // Stereo

function createWavFile(filename, durationSec, synthFn) {
  const numSamples = Math.floor(SAMPLE_RATE * durationSec);
  const dataSize = numSamples * NUM_CHANNELS * 2;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF Header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(NUM_CHANNELS, 22);
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(SAMPLE_RATE * NUM_CHANNELS * 2, 28);
  buffer.writeUInt16LE(NUM_CHANNELS * 2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const [left, right] = synthFn(t, durationSec);
    
    // Clamp to -1.0 .. 1.0 and convert to int16
    const clampL = Math.max(-1, Math.min(1, left));
    const clampR = Math.max(-1, Math.min(1, right));
    
    const intL = clampL < 0 ? clampL * 0x8000 : clampL * 0x7FFF;
    const intR = clampR < 0 ? clampR * 0x8000 : clampR * 0x7FFF;

    buffer.writeInt16LE(Math.floor(intL), offset);
    buffer.writeInt16LE(Math.floor(intR), offset + 2);
    offset += 4;
  }

  const outPath = path.join(__dirname, '..', 'public', 'audio', filename);
  fs.writeFileSync(outPath, buffer);
  console.log(`Generated: ${filename} (${(buffer.length / 1024 / 1024).toFixed(2)} MB)`);
}

// -------------------------------------------------------------
// INSTRUMENT HELPERS
// -------------------------------------------------------------

// Bronze Gamelan Bell / Bonang / Kenong strike
function bronzeStrike(t, strikeTime, freq, decay = 2.5, inharm = 1.48) {
  const dt = t - strikeTime;
  if (dt < 0 || dt > decay) return 0;
  const env = Math.exp(-dt * (4 / decay)) * Math.min(1, dt * 500);
  // Bronze partials: fundamental, minor third, octave, octave + fourth
  const p1 = Math.sin(2 * Math.PI * freq * dt);
  const p2 = 0.5 * Math.sin(2 * Math.PI * freq * inharm * dt);
  const p3 = 0.25 * Math.sin(2 * Math.PI * freq * 2.02 * dt);
  const p4 = 0.15 * Math.sin(2 * Math.PI * freq * 2.85 * dt);
  const shimmer = 1 + 0.08 * Math.sin(2 * Math.PI * 4.5 * dt); // ombak vibrato
  return (p1 + p2 + p3 + p4) * env * shimmer * 0.35;
}

// Deep Gong Ageng (low resonant rumble)
function gongAgeng(t, strikeTime, freq = 65, decay = 6.0) {
  const dt = t - strikeTime;
  if (dt < 0 || dt > decay) return 0;
  const env = Math.exp(-dt * (2.5 / decay)) * Math.min(1, dt * 200);
  const p1 = Math.sin(2 * Math.PI * freq * dt);
  const p2 = 0.7 * Math.sin(2 * Math.PI * (freq * 1.015) * dt); // beating ombak
  const p3 = 0.4 * Math.sin(2 * Math.PI * (freq * 2.01) * dt);
  const p4 = 0.25 * Math.sin(2 * Math.PI * (freq * 2.76) * dt);
  return (p1 + p2 + p3 + p4) * env * 0.5;
}

// Bamboo Flute (Suling / Saluang) with breath noise & warm vibrato
function bambooFlute(t, noteTime, dur, freq) {
  const dt = t - noteTime;
  if (dt < 0 || dt > dur) return 0;
  const attack = Math.min(1, dt * 25);
  const release = Math.max(0, Math.min(1, (dur - dt) * 15));
  const env = attack * release;
  const vibrato = Math.sin(2 * Math.PI * 5.2 * dt) * 0.015;
  const f = freq * (1 + vibrato);
  const sine = Math.sin(2 * Math.PI * f * dt);
  const harmonic = 0.28 * Math.sin(2 * Math.PI * f * 2 * dt) + 0.1 * Math.sin(2 * Math.PI * f * 3 * dt);
  const breath = (Math.sin(dt * 13371) % 0.05) * Math.exp(-dt * 4);
  return (sine + harmonic + breath) * env * 0.35;
}

// Plucked string (Kacapi / Hasapi / Oud)
function pluckedString(t, pluckTime, freq, decay = 2.0) {
  const dt = t - pluckTime;
  if (dt < 0 || dt > decay) return 0;
  const env = Math.exp(-dt * (5 / decay)) * Math.min(1, dt * 1000);
  let signal = 0;
  for (let h = 1; h <= 6; h++) {
    signal += (1 / Math.pow(h, 1.35)) * Math.sin(2 * Math.PI * freq * h * dt);
  }
  return signal * env * 0.28;
}

// Bamboo Rindik / Marimba
function bambooRindik(t, strikeTime, freq, decay = 1.6) {
  const dt = t - strikeTime;
  if (dt < 0 || dt > decay) return 0;
  const env = Math.exp(-dt * (6 / decay)) * Math.min(1, dt * 800);
  const p1 = Math.sin(2 * Math.PI * freq * dt);
  const p2 = 0.45 * Math.sin(2 * Math.PI * freq * 2.75 * dt); // woody hollow overtone
  const p3 = 0.2 * Math.sin(2 * Math.PI * freq * 5.1 * dt);
  return (p1 + p2 + p3) * env * 0.38;
}

// Piano note
function pianoNote(t, noteTime, freq, decay = 3.5) {
  const dt = t - noteTime;
  if (dt < 0 || dt > decay) return 0;
  const env = Math.exp(-dt * (2.8 / decay)) * Math.min(1, dt * 600);
  const p1 = Math.sin(2 * Math.PI * freq * dt);
  const p2 = 0.5 * Math.sin(2 * Math.PI * freq * 2 * dt);
  const p3 = 0.25 * Math.sin(2 * Math.PI * freq * 3 * dt);
  const p4 = 0.12 * Math.sin(2 * Math.PI * freq * 4 * dt);
  return (p1 + p2 + p3 + p4) * env * 0.3;
}

// -------------------------------------------------------------
// TRACK 1: JAWA - GAMELAN KERATON (Ladrang Wilujeng / Kebo Giro)
// -------------------------------------------------------------
function synthJawa(t, totalDur) {
  // Pelog Nem scale in Hz:
  // 1(Ji)=280, 2(Ro)=310, 3(Lu)=350, 5(Ma)=420, 6(Nem)=468, 7(Barang)=525, 1'=560
  const pelog = [280, 310, 350, 420, 468, 525, 560];
  const lowGong = 65;
  const kempulFreq = 140;
  const kenongFreq = 210;

  // 16 beat cycle, 0.75s per beat = 12s per gong cycle
  const beatDur = 0.75;
  const cycleDur = 16 * beatDur; // 12 seconds
  const localT = t % cycleDur;
  const beatIndex = Math.floor(localT / beatDur);

  let left = 0;
  let right = 0;

  // Gong Ageng on beat 0 (and at cycle end)
  const gongTime = 0;
  const g = gongAgeng(localT, gongTime, lowGong, 7.0);
  left += g * 0.8;
  right += g * 0.8;

  // Kenong on beat 4, 8, 12, 16(0)
  [4, 8, 12].forEach(b => {
    const kt = b * beatDur;
    const ken = bronzeStrike(localT, kt, kenongFreq, 3.0, 1.45);
    left += ken * 0.6;
    right += ken * 0.4;
  });

  // Kempul on beat 6, 10, 14
  [6, 10, 14].forEach(b => {
    const kpt = b * beatDur;
    const kp = bronzeStrike(localT, kpt, kempulFreq, 2.5, 1.48);
    left += kp * 0.35;
    right += kp * 0.65;
  });

  // Bonang interlocking melody (every 0.375s)
  const bonangNotes = [2, 3, 5, 6, 5, 3, 2, 1, 2, 3, 5, 6, 7, 6, 5, 3, 5, 6, 5, 3, 2, 1, 2, 3, 5, 3, 2, 1, 2, 3, 5, 6];
  for (let step = 0; step < 32; step++) {
    const noteTime = step * (beatDur / 2);
    const noteIdx = bonangNotes[step % bonangNotes.length] - 1;
    const freq = pelog[noteIdx] * 1.5;
    const bs = bronzeStrike(localT, noteTime, freq, 1.2, 1.5);
    const pan = (step % 2 === 0) ? 0.3 : 0.7;
    left += bs * (1 - pan);
    right += bs * pan;
  }

  // Saron metallophone punctuation on each beat
  const saronNotes = [1, 2, 3, 5, 6, 5, 3, 2, 3, 5, 6, 7, 6, 5, 3, 2];
  for (let b = 0; b < 16; b++) {
    const noteTime = b * beatDur;
    const noteIdx = saronNotes[b] - 1;
    const freq = pelog[noteIdx];
    const sar = bronzeStrike(localT, noteTime, freq, 1.8, 1.42);
    left += sar * 0.45;
    right += sar * 0.45;
  }

  // Gentle Rebab bowed chord drone
  const rebabFreq = 280;
  const rebabEnv = 0.15 * (1 + 0.05 * Math.sin(2 * Math.PI * 4 * t));
  const rebab = Math.sin(2 * Math.PI * rebabFreq * t) * rebabEnv;
  left += rebab * 0.3;
  right += rebab * 0.3;

  return [left, right];
}

// -------------------------------------------------------------
// TRACK 2: SUNDA - DEGUNG KACAPI SULING
// -------------------------------------------------------------
function synthSunda(t, totalDur) {
  // Pelog Degung scale: Da(440), Mi(392), Na(330), Ti(261), La(247)
  const degung = [247, 261, 330, 392, 440, 523, 659];
  const cycleDur = 8; // 8 second cycle
  const localT = t % cycleDur;

  let left = 0;
  let right = 0;

  // Kacapi plucked arpeggios
  const kacapiPattern = [
    { t: 0.0, n: 0 }, { t: 0.4, n: 2 }, { t: 0.8, n: 3 }, { t: 1.2, n: 4 },
    { t: 1.6, n: 2 }, { t: 2.0, n: 3 }, { t: 2.4, n: 4 }, { t: 2.8, n: 6 },
    { t: 3.2, n: 4 }, { t: 3.6, n: 3 }, { t: 4.0, n: 2 }, { t: 4.4, n: 0 },
    { t: 4.8, n: 2 }, { t: 5.2, n: 3 }, { t: 5.6, n: 4 }, { t: 6.0, n: 5 },
    { t: 6.4, n: 4 }, { t: 6.8, n: 3 }, { t: 7.2, n: 2 }, { t: 7.6, n: 1 }
  ];

  kacapiPattern.forEach(item => {
    const k = pluckedString(localT, item.t, degung[item.n % degung.length], 2.2);
    left += k * 0.6;
    right += k * 0.4;
  });

  // Suling Sunda (expressive, long sustained notes)
  const sulingMelody = [
    { t: 0.2, dur: 1.8, freq: degung[4] },
    { t: 2.0, dur: 1.4, freq: degung[5] },
    { t: 3.5, dur: 2.2, freq: degung[3] },
    { t: 5.8, dur: 2.0, freq: degung[2] }
  ];

  sulingMelody.forEach(item => {
    const s = bambooFlute(localT, item.t, item.dur, item.freq);
    left += s * 0.45;
    right += s * 0.55;
  });

  // Go'ong (Sundanese deep gong) at beat 0
  const gong = gongAgeng(localT, 0, 75, 5.0);
  left += gong * 0.5;
  right += gong * 0.5;

  return [left, right];
}

// -------------------------------------------------------------
// TRACK 3: MINANG - TALEMPONG & SALUANG
// -------------------------------------------------------------
function synthMinang(t, totalDur) {
  // Minang Pentatonic: 310, 348, 392, 466, 523, 622
  const minangNotes = [310, 348, 392, 466, 523, 622];
  const beatDur = 0.45; // faster, spirited tempo
  const cycleDur = 16 * beatDur; // 7.2s
  const localT = t % cycleDur;

  let left = 0;
  let right = 0;

  // Talempong rhythmic interlocking (Pacik)
  for (let i = 0; i < 16; i++) {
    const time = i * beatDur;
    const noteIdx = (i * 2 + 1) % minangNotes.length;
    const talempong = bronzeStrike(localT, time, minangNotes[noteIdx] * 1.6, 0.8, 1.42);
    const pan = (i % 2 === 0) ? 0.25 : 0.75;
    left += talempong * (1 - pan) * 0.7;
    right += talempong * pan * 0.7;
  }

  // Gandang (drum beat) on 0, 4, 8, 12
  [0, 4, 8, 12].forEach(b => {
    const drumTime = b * beatDur;
    const drum = gongAgeng(localT, drumTime, 95, 1.2);
    left += drum * 0.6;
    right += drum * 0.6;
  });

  // Saluang Minang (flute melody)
  const saluangPhrases = [
    { t: 0.5, dur: 1.6, freq: minangNotes[4] },
    { t: 2.2, dur: 1.5, freq: minangNotes[5] },
    { t: 3.8, dur: 1.6, freq: minangNotes[3] },
    { t: 5.5, dur: 1.5, freq: minangNotes[2] }
  ];

  saluangPhrases.forEach(item => {
    const sal = bambooFlute(localT, item.t, item.dur, item.freq);
    left += sal * 0.5;
    right += sal * 0.5;
  });

  return [left, right];
}

// -------------------------------------------------------------
// TRACK 4: BATAK - GONDANG & HASAPI TOBA
// -------------------------------------------------------------
function synthBatak(t, totalDur) {
  // Batak scale: 220, 247, 277, 330, 370, 440
  const batakScale = [220, 247, 277, 330, 370, 440];
  const beatDur = 0.5;
  const cycleDur = 16 * beatDur; // 8.0s
  const localT = t % cycleDur;

  let left = 0;
  let right = 0;

  // Hasapi wooden lute strumming rhythm
  for (let i = 0; i < 16; i++) {
    const time = i * beatDur;
    const note = batakScale[i % batakScale.length];
    const h = pluckedString(localT, time, note, 1.0);
    left += h * 0.5;
    right += h * 0.5;
  }

  // Taganing tuned percussion
  const taganingNotes = [0, 2, 4, 6, 8, 10, 12, 14];
  taganingNotes.forEach((b, idx) => {
    const tt = b * beatDur;
    const freq = batakScale[idx % batakScale.length] * 1.5;
    const tag = bronzeStrike(localT, tt, freq, 0.6, 1.3);
    left += tag * 0.45;
    right += tag * 0.35;
  });

  // Ogung (Batak bass gong) on beat 0 and 8
  [0, 8].forEach(b => {
    const og = gongAgeng(localT, b * beatDur, 70, 3.5);
    left += og * 0.65;
    right += og * 0.65;
  });

  // Sarune reedy horn melody
  const saruneNotes = [
    { t: 0.3, dur: 1.7, freq: 440 },
    { t: 2.1, dur: 1.5, freq: 494 },
    { t: 3.7, dur: 2.0, freq: 554 },
    { t: 5.8, dur: 2.0, freq: 370 }
  ];
  saruneNotes.forEach(item => {
    const dt = localT - item.t;
    if (dt >= 0 && dt <= item.dur) {
      const env = Math.min(1, dt * 10) * Math.max(0, Math.min(1, (item.dur - dt) * 8));
      const s = (Math.sin(2 * Math.PI * item.freq * dt) + 0.4 * Math.sin(2 * Math.PI * item.freq * 2 * dt)) * env * 0.35;
      left += s * 0.5;
      right += s * 0.5;
    }
  });

  return [left, right];
}

// -------------------------------------------------------------
// TRACK 5: BALI - RINDIK DEWATA & SEMAR PAGULINGAN
// -------------------------------------------------------------
function synthBali(t, totalDur) {
  // Bali Selisir scale: Ding(261), Dong(293), Deng(329), Dung(392), Dang(440)
  const selisir = [261, 293, 329, 392, 440, 523, 587, 659];
  const stepDur = 0.28; // bright, rapid interlocking Kotekan
  const cycleDur = 24 * stepDur; // ~6.72s
  const localT = t % cycleDur;

  let left = 0;
  let right = 0;

  // Kotekan Polos (on-beat)
  for (let i = 0; i < 24; i += 2) {
    const time = i * stepDur;
    const noteIdx = (i % 6);
    const r = bambooRindik(localT, time, selisir[noteIdx] * 1.5, 1.2);
    left += r * 0.65;
    right += r * 0.25;
  }

  // Kotekan Sangsih (interlocking off-beat)
  for (let i = 1; i < 24; i += 2) {
    const time = i * stepDur;
    const noteIdx = ((i + 2) % 6);
    const r = bambooRindik(localT, time, selisir[noteIdx] * 1.5, 1.2);
    left += r * 0.25;
    right += r * 0.65;
  }

  // Kempur gong accent on beat 0 and 12
  [0, 12].forEach(s => {
    const bg = gongAgeng(localT, s * stepDur, 80, 4.0);
    left += bg * 0.55;
    right += bg * 0.55;
  });

  // Ceng-ceng cymbal shimmer
  for (let i = 0; i < 24; i++) {
    const time = i * stepDur;
    const dt = localT - time;
    if (dt >= 0 && dt < 0.15) {
      const noise = (Math.sin(dt * 98765) % 0.08) * Math.exp(-dt * 25);
      left += noise;
      right += noise;
    }
  }

  return [left, right];
}

// -------------------------------------------------------------
// TRACK 6: ISLAMI - GAMBUS OUD & NAY
// -------------------------------------------------------------
function synthIslami(t, totalDur) {
  // Bayati / Hijaz scale: 220, 240, 277, 293, 330, 350, 392, 440
  const maqam = [220, 240, 277, 293, 330, 350, 392, 440];
  const cycleDur = 8;
  const localT = t % cycleDur;

  let left = 0;
  let right = 0;

  // Oud plucks
  const oudPattern = [
    { t: 0.0, n: 0 }, { t: 0.5, n: 2 }, { t: 1.0, n: 3 }, { t: 1.5, n: 4 },
    { t: 2.0, n: 5 }, { t: 2.5, n: 4 }, { t: 3.0, n: 3 }, { t: 3.5, n: 2 },
    { t: 4.0, n: 3 }, { t: 4.5, n: 4 }, { t: 5.0, n: 6 }, { t: 5.5, n: 7 },
    { t: 6.0, n: 6 }, { t: 6.5, n: 4 }, { t: 7.0, n: 2 }, { t: 7.5, n: 0 }
  ];

  oudPattern.forEach(item => {
    const o = pluckedString(localT, item.t, maqam[item.n], 1.8);
    left += o * 0.55;
    right += o * 0.45;
  });

  // Nay reed flute
  const nayPhrases = [
    { t: 0.5, dur: 2.2, freq: maqam[4] },
    { t: 3.0, dur: 2.0, freq: maqam[5] },
    { t: 5.2, dur: 2.4, freq: maqam[2] }
  ];

  nayPhrases.forEach(item => {
    const n = bambooFlute(localT, item.t, item.dur, item.freq);
    left += n * 0.5;
    right += n * 0.5;
  });

  // Frame drum (Daff / Riq)
  [0, 2, 4, 6].forEach(time => {
    const drum = gongAgeng(localT, time, 85, 1.2);
    left += drum * 0.45;
    right += drum * 0.45;
  });

  return [left, right];
}

// -------------------------------------------------------------
// TRACK 7: MODERN - ROMANTIC PIANO & STRINGS
// -------------------------------------------------------------
function synthModern(t, totalDur) {
  // D Major wedding chords: D (D-F#-A), A (A-C#-E), Bm (B-D-F#), G (G-B-D)
  const cycleDur = 12; // 3 seconds per chord
  const localT = t % cycleDur;

  let left = 0;
  let right = 0;

  const chords = [
    { baseT: 0, root: 146.83, arpeggio: [293.66, 369.99, 440.0, 587.33] }, // D
    { baseT: 3, root: 110.00, arpeggio: [220.0, 277.18, 329.63, 440.0] }, // A
    { baseT: 6, root: 123.47, arpeggio: [246.94, 293.66, 369.99, 493.88] }, // Bm
    { baseT: 9, root: 98.00,  arpeggio: [196.0, 246.94, 293.66, 392.0] }  // G
  ];

  chords.forEach(c => {
    // Bass note
    const bass = pianoNote(localT, c.baseT, c.root, 3.8);
    left += bass * 0.6;
    right += bass * 0.6;

    // Arpeggios (0, 0.6, 1.2, 1.8, 2.4)
    c.arpeggio.forEach((note, idx) => {
      const noteTime = c.baseT + idx * 0.6;
      const p = pianoNote(localT, noteTime, note, 2.5);
      const pan = (idx % 2 === 0) ? 0.35 : 0.65;
      left += p * (1 - pan);
      right += p * pan;
    });
  });

  return [left, right];
}

// -------------------------------------------------------------
// MAIN EXECUTION
// -------------------------------------------------------------
console.log('Generating traditional authentic tracks for Janji Digital...');

createWavFile('jawa-gamelan-keraton.wav', 24, synthJawa);
createWavFile('sunda-kacapi-suling.wav', 24, synthSunda);
createWavFile('minang-talempong-saluang.wav', 21.6, synthMinang);
createWavFile('batak-gondang-hasapi.wav', 24, synthBatak);
createWavFile('bali-rindik-dewata.wav', 20.16, synthBali);
createWavFile('islami-gambus-oud.wav', 24, synthIslami);
createWavFile('modern-romantic-piano.wav', 24, synthModern);

console.log('All 7 traditional music tracks successfully created in public/audio/!');
