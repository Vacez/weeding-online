const fs = require('fs');
const path = require('path');

const prismaDb = path.join(__dirname, '..', 'prisma', 'dev.db');
const rootDb = path.join(__dirname, '..', 'dev.db');

try {
  if (fs.existsSync(prismaDb)) {
    fs.copyFileSync(prismaDb, rootDb);
    console.log('[prepare-db] Successfully synced prisma/dev.db -> dev.db');
  } else if (fs.existsSync(rootDb)) {
    fs.mkdirSync(path.dirname(prismaDb), { recursive: true });
    fs.copyFileSync(rootDb, prismaDb);
    console.log('[prepare-db] Successfully synced dev.db -> prisma/dev.db');
  } else {
    console.warn('[prepare-db] Warning: No dev.db found to sync.');
  }
} catch (err) {
  console.error('[prepare-db] Error syncing database files:', err);
}
