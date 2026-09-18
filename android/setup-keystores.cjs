/**
 * Android Keystore Generator & SHA-256 Fingerprint Extractor for Digital Asset Links
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function findKeytool() {
  // Check PATH
  try {
    const stdout = execSync('where.exe keytool', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
    if (stdout && fs.existsSync(stdout.split('\r\n')[0])) {
      return `"${stdout.split('\r\n')[0]}"`;
    }
  } catch {}

  // Check JAVA_HOME
  if (process.env.JAVA_HOME) {
    const candidate = path.join(process.env.JAVA_HOME, 'bin', 'keytool.exe');
    if (fs.existsSync(candidate)) return `"${candidate}"`;
  }

  // Check Bubblewrap JDK directory
  const homeDir = process.env.USERPROFILE || process.env.HOME || '';
  const bubblewrapDir = path.join(homeDir, '.bubblewrap', 'jdk');
  if (fs.existsSync(bubblewrapDir)) {
    const findRecursive = (dir) => {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const full = path.join(dir, file);
        try {
          const stat = fs.statSync(full);
          if (stat.isDirectory()) {
            const res = findRecursive(full);
            if (res) return res;
          } else if (file.toLowerCase() === 'keytool.exe' || file === 'keytool') {
            return full;
          }
        } catch {}
      }
      return null;
    };
    const found = findRecursive(bubblewrapDir);
    if (found) return `"${found}"`;
  }

  // Check common Program Files Java paths
  const pfJava = 'C:\\Program Files\\Java';
  if (fs.existsSync(pfJava)) {
    for (const jdk of fs.readdirSync(pfJava)) {
      const candidate = path.join(pfJava, jdk, 'bin', 'keytool.exe');
      if (fs.existsSync(candidate)) return `"${candidate}"`;
    }
  }

  return 'keytool';
}

function extractSha256(keystorePath, alias, storepass) {
  const keytool = findKeytool();
  const cmd = `${keytool} -list -v -keystore "${keystorePath}" -alias "${alias}" -storepass "${storepass}"`;
  const output = execSync(cmd).toString();
  const match = output.match(/SHA256:\s*([A-F0-9:]{95})/i);
  if (match) {
    return match[1].toUpperCase();
  }
  // Try alternative format without colons or spaces
  const match2 = output.match(/SHA-?256:\s*([A-Fa-f0-9: ]+)/i);
  if (match2) {
    return match2[1].trim().replace(/\s+/g, '').toUpperCase();
  }
  throw new Error(`Could not parse SHA-256 fingerprint from keytool output:\n${output}`);
}

function updateAssetLinks(newFingerprint) {
  const assetLinksPath = path.resolve(__dirname, '../client/public/.well-known/assetlinks.json');
  let data = [];
  if (fs.existsSync(assetLinksPath)) {
    try {
      data = JSON.parse(fs.readFileSync(assetLinksPath, 'utf8'));
    } catch {}
  }

  if (!data || !Array.isArray(data) || data.length === 0) {
    data = [
      {
        relation: ["delegate_permission/common.handle_all_urls"],
        target: {
          namespace: "android_app",
          package_name: "com.marvelbattleauction.app",
          sha256_cert_fingerprints: []
        }
      }
    ];
  }

  const fingerprints = data[0].target.sha256_cert_fingerprints;
  if (!fingerprints.includes(newFingerprint)) {
    fingerprints.push(newFingerprint);
  }

  fs.mkdirSync(path.dirname(assetLinksPath), { recursive: true });
  fs.writeFileSync(assetLinksPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`✓ Updated ${assetLinksPath} with SHA-256: ${newFingerprint}`);
}

// CLI entry
const mode = process.argv[2] || '--generate-debug';

if (mode === '--generate-debug') {
  const debugKeystore = path.resolve(__dirname, 'debug.keystore');
  const keytool = findKeytool();

  if (!fs.existsSync(debugKeystore)) {
    console.log(`Generating debug keystore at ${debugKeystore}...`);
    const genCmd = `${keytool} -genkeypair -v -keystore "${debugKeystore}" -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Android Debug,O=Android,C=US"`;
    try {
      execSync(genCmd, { stdio: 'inherit' });
      console.log('✓ Created debug.keystore');
    } catch (err) {
      console.error('Error creating debug.keystore:', err.message);
      process.exit(1);
    }
  } else {
    console.log(`Using existing debug keystore at ${debugKeystore}`);
  }

  try {
    const fingerprint = extractSha256(debugKeystore, 'androiddebugkey', 'android');
    console.log(`Debug SHA-256 Fingerprint: ${fingerprint}`);
    updateAssetLinks(fingerprint);
  } catch (err) {
    console.error('Failed to extract fingerprint:', err.message);
  }
} else if (mode === '--extract') {
  const targetKeystore = process.argv[3];
  const alias = process.argv[4] || 'android';
  const pass = process.argv[5] || 'android';
  if (!targetKeystore) {
    console.error('Usage: node setup-keystores.cjs --extract <keystore_path> [alias] [storepass]');
    process.exit(1);
  }
  const fingerprint = extractSha256(targetKeystore, alias, pass);
  console.log(`SHA-256 Fingerprint: ${fingerprint}`);
  updateAssetLinks(fingerprint);
} else {
  console.log('Available commands:');
  console.log('  node setup-keystores.cjs --generate-debug');
  console.log('  node setup-keystores.cjs --extract <keystore_path> <alias> <password>');
}
