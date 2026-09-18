const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC32 implementation for PNG chunks
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const toCrc = chunk.subarray(4, 8 + len);
  chunk.writeUInt32BE(crc32(toCrc), 8 + len);
  return chunk;
}

function encodePNG(width, height, rgbaBuffer) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const scanlineLength = width * 4 + 1;
  const rawData = Buffer.alloc(scanlineLength * height);

  for (let y = 0; y < height; y++) {
    const rawOffset = y * scanlineLength;
    rawData[rawOffset] = 0;
    rgbaBuffer.copy(rawData, rawOffset + 1, y * width * 4, (y + 1) * width * 4);
  }

  const compressedData = zlib.deflateSync(rawData, { level: 9 });
  const idat = createChunk('IDAT', compressedData);
  const iend = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

function renderIcon(size, isMaskable = false) {
  const buf = Buffer.alloc(size * size * 4);
  const center = size / 2;
  const maxR = size / 2;
  const scale = size / 512;
  const contentScale = isMaskable ? 0.75 : 0.95;

  function dist(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  }

  function inHexagon(px, py, cx, cy, rad) {
    const dx = Math.abs(px - cx) / rad;
    const dy = Math.abs(py - cy) / rad;
    const a = 0.86602540378;
    return (dx <= 1 && dy <= a && (a * dx + 0.5 * dy) <= a);
  }

  function inLightning(px, py, cx, cy, s, flip = false) {
    let x = (px - cx) / s;
    let y = (py - cy) / s;
    if (flip) x = -x;
    return (
      (x >= -25 && x <= 20 && y >= -130 && y <= -10 && (y - 2.8 * x) <= 60 && (y - 2.8 * x) >= -70) ||
      (x >= -35 && x <= 15 && y >= -30 && y <= 60 && (y - 2.5 * x) <= 70 && (y - 2.5 * x) >= -50) ||
      (x >= -20 && x <= 10 && y >= 40 && y <= 130 && (y - 3.8 * x) <= 120 && (y - 3.8 * x) >= -30)
    );
  }

  function inStar(px, py, cx, cy, rOut, rIn) {
    const dx = px - cx;
    const dy = py - cy;
    const d = Math.sqrt(dx * dx + dy * dy);
    if (d > rOut) return false;
    if (d < rIn * 0.7) return true;
    let angle = Math.atan2(dy, dx) + Math.PI / 2;
    if (angle < 0) angle += 2 * Math.PI;
    const arm = Math.PI / 2.5;
    const rel = (angle % arm) / arm;
    const distLimit = (rel < 0.5)
      ? rOut - (rOut - rIn) * (rel * 2)
      : rIn + (rOut - rIn) * ((rel - 0.5) * 2);
    return d <= distLimit;
  }

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const dCenter = dist(x, y, center, center);

      let r = 0x0d, g = 0x0d, b = 0x11, a = 255;

      if (isMaskable) {
        const bgGrad = Math.min(1, dCenter / maxR);
        r = Math.round(18 + 10 * (1 - bgGrad));
        g = Math.round(14 + 6 * (1 - bgGrad));
        b = Math.round(28 + 12 * (1 - bgGrad));
      }

      const hexRadius = 220 * scale * contentScale;
      const inHex = inHexagon(x, y, center, center, hexRadius);
      const inHexInner = inHexagon(x, y, center, center, hexRadius * 0.94);
      const inHexCore = inHexagon(x, y, center, center, hexRadius * 0.88);

      if (inHex && !inHexInner) {
        const goldRatio = (x + y) / (size * 2);
        r = Math.round(245 + 10 * goldRatio);
        g = Math.round(180 + 20 * goldRatio);
        b = Math.round(35 + 20 * goldRatio);
      } else if (inHexInner && !inHexCore) {
        r = 160; g = 20; b = 30;
      } else if (inHexCore) {
        const coreRatio = (y - center + hexRadius) / (2 * hexRadius);
        r = Math.round(24 + 18 * coreRatio);
        g = Math.round(20 + 8 * coreRatio);
        b = Math.round(40 + 15 * coreRatio);
      }

      const boltScale = scale * contentScale;
      const inLeftBolt = inLightning(x, y, center - 20 * boltScale, center, boltScale, false);
      const inRightBolt = inLightning(x, y, center + 20 * boltScale, center, boltScale, true);

      if (inLeftBolt) {
        r = 255; g = 195; b = 40;
      } else if (inRightBolt) {
        r = 50; g = 190; b = 255;
      }

      const starOuter = 38 * scale * contentScale;
      const starInner = 16 * scale * contentScale;
      if (inStar(x, y, center, center - 8 * scale * contentScale, starOuter, starInner)) {
        r = 255; g = 255; b = 255;
      }

      buf[idx] = r;
      buf[idx + 1] = g;
      buf[idx + 2] = b;
      buf[idx + 3] = a;
    }
  }

  return encodePNG(size, size, buf);
}

const resDir = path.resolve(__dirname, 'app/src/main/res');

// 1. Generate Drawables for Splash Screen
const drawableDirs = [
  path.join(resDir, 'drawable'),
  path.join(resDir, 'drawable-nodpi'),
  path.join(resDir, 'drawable-xxxhdpi'),
];

for (const dir of drawableDirs) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'splash.png'), renderIcon(512, false));
  console.log(`✓ Generated ${dir}/splash.png`);
}

// 2. Generate Mipmaps for Launcher Icons
const mipmaps = [
  { dir: 'mipmap-mdpi', size: 48 },
  { dir: 'mipmap-hdpi', size: 72 },
  { dir: 'mipmap-xhdpi', size: 96 },
  { dir: 'mipmap-xxhdpi', size: 144 },
  { dir: 'mipmap-xxxhdpi', size: 192 },
];

for (const m of mipmaps) {
  const targetDir = path.join(resDir, m.dir);
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'ic_launcher.png'), renderIcon(m.size, false));
  fs.writeFileSync(path.join(targetDir, 'ic_maskable.png'), renderIcon(m.size, true));
  console.log(`✓ Generated ${m.dir} icons (${m.size}x${m.size})`);
}

console.log('All Android resources generated successfully!');
