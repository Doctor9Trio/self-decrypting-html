// examples/generate-demo.mjs
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const inputHtml = path.join(rootDir, 'examples', 'sample-report.html');
const outputHtml = path.join(rootDir, 'examples', 'sample-report.enc.html');
const cliScript = path.join(rootDir, 'bin', 'encrypt.mjs');
const demoPassword = 'ConfidentialPass2026!';

console.log('Generating demo encrypted HTML document...\n');

execSync(
  `node "${cliScript}" "${inputHtml}" "${demoPassword}" --out "${outputHtml}" --title "Cryptographic Verification Report"`,
  { stdio: 'inherit' }
);

console.log('--------------------------------------------------');
console.log('🎉 Demo ready to test!');
console.log(`Open file in browser: ${outputHtml}`);
console.log(`Password to unlock:  ${demoPassword}`);
console.log('--------------------------------------------------\n');
