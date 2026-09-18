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

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  // Raw Scanlines with filter byte 0
  const scanlineLength = width * 4 + 1;
  const rawData = Buffer.alloc(scanlineLength * height);

  for (let y = 0; y < height; y++) {
    const rawOffset = y * scanlineLength;
    rawData[rawOffset] = 0; // Filter: None
    rgbaBuffer.copy(rawData, rawOffset + 1, y * width * 4, (y + 1) * width * 4);
  }

  const compressedData = zlib.deflateSync(rawData, { level: 9 });
  const idat = createChunk('IDAT', compressedData);
  const iend = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, createChunk('IHDR', ihdr), idat, iend]);
}

// Point in polygon test
function pointInPoly(px, py, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], yi = poly[i][1];
    const xj = poly[j][0], yj = poly[j][1];
    const intersect = ((yi > py) !== (yj > py)) && (px < (xj - xi) * (py - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// Distance from point to line segment
function distToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  if (dx === 0 && dy === 0) return Math.hypot(px - x1, py - y1);
  const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}

function distToPolyBorder(px, py, poly) {
  let minDist = Infinity;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const d = distToSegment(px, py, poly[i][0], poly[i][1], poly[j][0], poly[j][1]);
    if (d < minDist) minDist = d;
  }
  return minDist;
}

function renderIcon(size, isMaskable) {
  const buf = Buffer.alloc(size * size * 4);

  // Normalize scale factor: maskable icons have safe zone padding of 15%
  const scale = isMaskable ? 0.72 : 0.88;
  const cx = size / 2;
  const cy = size / 2;

  // Normalized coordinate transformation
  function toCanvas(nx, ny) {
    return [cx + (nx - 256) * (size / 512) * scale, cy + (ny - 256) * (size / 512) * scale];
  }

  // Define geometric shapes in 512x512 coordinate space
  // Shield polygon
  const shieldNorm = [
    [256, 54],
    [416, 104],
    [410, 230],
    [375, 330],
    [256, 436],
    [137, 330],
    [102, 230],
    [96, 104]
  ];
  const shieldPoly = shieldNorm.map(pt => toCanvas(pt[0], pt[1]));

  // Inner Gold Shield polygon
  const innerNorm = [
    [256, 88],
    [384, 128],
    [376, 224],
    [348, 308],
    [256, 386],
    [164, 308],
    [136, 224],
    [128, 128]
  ];
  const innerPoly = innerNorm.map(pt => toCanvas(pt[0], pt[1]));

  // Lightning Bolt polygon
  const boltNorm = [
    [274, 80],
    [184, 234],
    [260, 234],
    [220, 366],
    [338, 198],
    [262, 198]
  ];
  const boltPoly = boltNorm.map(pt => toCanvas(pt[0], pt[1]));

  // Slanted Ribbon polygon
  const ribbonNorm = [
    [50, 370],
    [462, 370],
    [446, 424],
    [34, 424]
  ];
  const ribbonPoly = ribbonNorm.map(pt => toCanvas(pt[0], pt[1]));

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;

      // Default Background: Deep comic dark #0d0d11
      let r = 0x0d;
      let g = 0x0d;
      let b = 0x11;
      let a = 0xff;

      // Subtle radial carbon grid / action lines
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx);
      if (Math.sin(angle * 14) > 0.65) {
        // subtle yellow ray
        r = Math.min(255, r + 18);
        g = Math.min(255, g + 16);
        b = Math.min(255, b + 4);
      }

      // Rounded rect border for non-maskable icons
      if (!isMaskable) {
        const borderDist = Math.max(Math.abs(x - cx) - (size * 0.46), Math.abs(y - cy) - (size * 0.46));
        if (borderDist > 0 && borderDist < 4) {
          r = 0xff; g = 0xd1; b = 0x00; // Gold border
        }
      }

      // Shield Check
      const inShield = pointInPoly(x, y, shieldPoly);
      const distShieldBorder = distToPolyBorder(x, y, shieldPoly);
      const inInner = pointInPoly(x, y, innerPoly);
      const distInnerBorder = distToPolyBorder(x, y, innerPoly);

      // Hard comic shadow offset (down 6px, right 5px)
      const inShieldShadow = pointInPoly(x - 5, y - 6, shieldPoly);
      if (inShieldShadow && !inShield) {
        r = 0x00; g = 0x00; b = 0x00;
      }

      if (inShield) {
        if (distShieldBorder < 5) {
          // Thick comic black shield border
          r = 0x00; g = 0x00; b = 0x00;
        } else if (!inInner) {
          // Vibrant comic red gradient #ef4444 to #991b1b
          const t = y / size;
          r = Math.round(239 * (1 - t * 0.4));
          g = Math.round(68 * (1 - t * 0.4));
          b = Math.round(68 * (1 - t * 0.4));

          // Halftone dots overlay
          if ((x % 6 < 2) && (y % 6 < 2)) {
            r = Math.round(r * 0.7);
            g = Math.round(g * 0.7);
            b = Math.round(b * 0.7);
          }
        } else {
          // Inner gold shield with border
          if (distInnerBorder < 3) {
            r = 0x00; g = 0x00; b = 0x00;
          } else {
            // Gold gradient #ffe033 to #f59e0b
            const t = (y - cy) / (size * 0.3);
            r = Math.round(255 - t * 15);
            g = Math.round(224 - t * 50);
            b = Math.round(51 - t * 40);
          }
        }
      }

      // Lightning Bolt
      const inBoltShadow = pointInPoly(x - 4, y - 5, boltPoly);
      const inBolt = pointInPoly(x, y, boltPoly);
      const distBolt = distToPolyBorder(x, y, boltPoly);

      if (inBoltShadow && !inBolt) {
        r = 0x00; g = 0x00; b = 0x00;
      }

      if (inBolt) {
        if (distBolt < 4) {
          r = 0x00; g = 0x00; b = 0x00; // Bold black border
        } else if (distBolt < 7) {
          r = 0xff; g = 0xd1; b = 0x00; // Bright yellow
        } else {
          r = 0xff; g = 0xff; b = 0xff; // Electric white-hot core
        }
      }

      // Bottom Ribbon: "BATTLE AUCTION"
      const inRibbonShadow = pointInPoly(x - 3, y - 4, ribbonPoly);
      const inRibbon = pointInPoly(x, y, ribbonPoly);
      const distRibbon = distToPolyBorder(x, y, ribbonPoly);

      if (inRibbonShadow && !inRibbon) {
        r = 0x00; g = 0x00; b = 0x00;
      }

      if (inRibbon) {
        if (distRibbon < 3) {
          r = 0x00; g = 0x00; b = 0x00;
        } else {
          r = 0xff; g = 0xd1; b = 0x00; // Comic yellow
        }
      }

      buf[idx] = r;
      buf[idx + 1] = g;
      buf[idx + 2] = b;
      buf[idx + 3] = a;
    }
  }

  return encodePNG(size, size, buf);
}

const iconsDir = path.resolve(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

console.log('Generating PWA & Android TWA icon assets...');

// Standard Icons
fs.writeFileSync(path.join(iconsDir, 'icon-192x192.png'), renderIcon(192, false));
console.log('✓ icon-192x192.png');
fs.writeFileSync(path.join(iconsDir, 'icon-512x512.png'), renderIcon(512, false));
console.log('✓ icon-512x512.png');

// Maskable Icons (safe zone padding)
fs.writeFileSync(path.join(iconsDir, 'icon-192x192-maskable.png'), renderIcon(192, true));
console.log('✓ icon-192x192-maskable.png');
fs.writeFileSync(path.join(iconsDir, 'icon-512x512-maskable.png'), renderIcon(512, true));
console.log('✓ icon-512x512-maskable.png');

console.log('All icons generated successfully!');
