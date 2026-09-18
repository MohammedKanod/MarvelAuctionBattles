const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PORT = 8765;
const publicDir = path.resolve(__dirname, '../client/public');
const twaManifestPath = path.resolve(__dirname, 'twa-manifest.json');

console.log('1. Starting temporary local icon server on port', PORT);
const server = http.createServer((req, res) => {
  const cleanUrl = req.url.split('?')[0].replace(/^\//, '');
  const filePath = path.join(publicDir, cleanUrl);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    if (filePath.endsWith('.png')) res.setHeader('Content-Type', 'image/png');
    else if (filePath.endsWith('.svg')) res.setHeader('Content-Type', 'image/svg+xml');
    else if (filePath.endsWith('.json') || filePath.endsWith('.webmanifest')) res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    return res.end(fs.readFileSync(filePath));
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('✓ Temporary icon server ready at http://127.0.0.1:' + PORT);

  const originalManifest = JSON.parse(fs.readFileSync(twaManifestPath, 'utf8'));

  try {
    // Point icon URLs temporarily to local server for Android asset generation
    const tempManifest = { ...originalManifest };
    tempManifest.iconUrl = `http://127.0.0.1:${PORT}/icons/icon-512x512.png`;
    tempManifest.maskableIconUrl = `http://127.0.0.1:${PORT}/icons/icon-512x512-maskable.png`;
    tempManifest.webManifestUrl = `http://127.0.0.1:${PORT}/manifest.webmanifest`;
    fs.writeFileSync(twaManifestPath, JSON.stringify(tempManifest, null, 2), 'utf8');

    console.log('2. Running bubblewrap update to generate native Android project & launcher mipmaps...');
    execSync('npx.cmd @bubblewrap/cli update --skipPwaValidation', {
      cwd: __dirname,
      stdio: 'inherit'
    });

    console.log('✓ Android project structure generated successfully!');
  } catch (err) {
    console.error('Error during bubblewrap generation:', err.message);
  } finally {
    // Always restore production URLs in twa-manifest.json
    fs.writeFileSync(twaManifestPath, JSON.stringify(originalManifest, null, 2), 'utf8');
    server.close(() => {
      console.log('✓ Restored production URLs and closed temporary server.');
    });
  }
});
