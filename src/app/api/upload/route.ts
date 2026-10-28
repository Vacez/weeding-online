import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ message: 'Tidak ada file yang diunggah' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // If running in environment with writable public/uploads
    const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;
    
    // In Vercel serverless where filesystem is read-only, return high-speed base64 Data URL
    if (isServerless) {
      const mime = file.type || 'application/octet-stream';
      const base64 = buffer.toString('base64');
      const dataUrl = `data:${mime};base64,${base64}`;
      return NextResponse.json({ url: dataUrl, name: file.name, size: file.size });
    }

    // Local environment: save to public/uploads
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = path.join(uploadsDir, safeName);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${safeName}`;
    return NextResponse.json({ url: publicUrl, name: file.name, size: file.size });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ message: 'Gagal mengunggah file' }, { status: 500 });
  }
}
