const fs = require('fs');
const path = require('path');

const dcList = JSON.parse(fs.readFileSync('server/scripts/dc_98_list.json', 'utf8'));
const targetDir = path.resolve(__dirname, '../../client/public/characters');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function downloadImage(char) {
  const targetPath = path.join(targetDir, `${char.id}.jpg`);
  const url = `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/${char.slug}.jpg`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} for ${url}`);
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    if (buffer.length < 5000) {
      throw new Error(`File too small (${buffer.length} bytes) for ${char.id}`);
    }
    fs.writeFileSync(targetPath, buffer);
    console.log(`✓ Downloaded ${char.id} (${buffer.length} bytes) from ${char.slug}`);
    return { success: true, id: char.id, size: buffer.length };
  } catch (err) {
    console.error(`✗ Failed for ${char.id} (${url}):`, err.message);
    return { success: false, id: char.id, error: err.message };
  }
}

async function main() {
  console.log(`Starting download of ${dcList.length} DC character images to ${targetDir}...`);
  let successCount = 0;
  let failCount = 0;

  // Process in batches of 10
  for (let i = 0; i < dcList.length; i += 10) {
    const batch = dcList.slice(i, i + 10);
    const results = await Promise.all(batch.map(c => downloadImage(c)));
    for (const r of results) {
      if (r.success) successCount++;
      else failCount++;
    }
  }

  console.log(`\nFinished: ${successCount} succeeded, ${failCount} failed.`);
}

main().catch(console.error);
