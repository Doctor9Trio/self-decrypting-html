#!/usr/bin/env node

/**
 * Self-Decrypting HTML CLI Encryptor
 * 
 * Encrypts any HTML file into a standalone, zero-knowledge HTML document
 * that decrypts entirely client-side using the native Web Crypto API.
 * 
 * Usage:
 *   node bin/encrypt.mjs <inputFile.html> <password> [options]
 * 
 * Options:
 *   --user <username>     Optional username to bind with password (default: none)
 *   --out <outputFile>    Output path (default: <inputFile>.enc.html)
 *   --title <title>       Title shown on the unlock screen (default: "Protected Document")
 *   --iterations <num>    PBKDF2 iteration count (default: 310000)
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length < 2 || args.includes('--help') || args.includes('-h')) {
  console.log(`
Usage:
  node bin/encrypt.mjs <inputFile.html> <password> [options]

Arguments:
  <inputFile.html>    Path to the source HTML file to encrypt
  <password>          Secret password required to unlock the document

Options:
  --user <username>   Optional username to bind to decryption (default: none)
  --out <outputFile>  Destination file path (default: <inputFile>.enc.html)
  --title <title>     Title displayed on unlock card (default: "Protected Document")
  --iterations <num>  PBKDF2 rounds (default: 310000)

Example:
  node bin/encrypt.mjs report.html "SuperSecret#2026" --title "Q3 Financial Report"
`);
  process.exit(0);
}

const inputFile = args[0];
const password = args[1];

let username = '';
let outputFile = '';
let title = 'Protected Document';
let iterations = 310000;

for (let i = 2; i < args.length; i++) {
  if (args[i] === '--user' && args[i + 1]) username = args[++i];
  else if (args[i] === '--out' && args[i + 1]) outputFile = args[++i];
  else if (args[i] === '--title' && args[i + 1]) title = args[++i];
  else if (args[i] === '--iterations' && args[i + 1]) iterations = parseInt(args[++i], 10);
}

if (!fs.existsSync(inputFile)) {
  console.error(`Error: Input file "${inputFile}" does not exist.`);
  process.exit(1);
}

const plainHtml = fs.readFileSync(inputFile, 'utf-8');
const destination = outputFile || inputFile.replace(/\.html$/i, '') + '.enc.html';

// 1. Generate cryptographically strong random salt and initialization vector (IV)
const salt = crypto.randomBytes(16);
const iv = crypto.randomBytes(12);

// 2. Derive 256-bit AES key via PBKDF2 with HMAC-SHA-256
const keyMaterialString = username ? `${username}\u0000${password}` : password;
const keyMaterial = Buffer.from(keyMaterialString, 'utf-8');
const derivedKey = crypto.pbkdf2Sync(keyMaterial, salt, iterations, 32, 'sha256');

// 3. Encrypt the plaintext HTML using AES-256-GCM
const cipher = crypto.createCipheriv('aes-256-gcm', derivedKey, iv);
const encryptedBytes = Buffer.concat([
  cipher.update(Buffer.from(plainHtml, 'utf-8')),
  cipher.final()
]);
const authTag = cipher.getAuthTag();

// Web Cryptography API expects the 16-byte authentication tag appended to the ciphertext
const combinedCipher = Buffer.concat([encryptedBytes, authTag]);

// 4. Construct payload metadata
const payload = {
  salt: salt.toString('base64'),
  iv: iv.toString('base64'),
  iterations: iterations,
  cipher: combinedCipher.toString('base64'),
  requiresUser: Boolean(username)
};

// 5. Build the self-decrypting standalone HTML
const standaloneHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --background: #F8F9FA;
      --foreground: #09090B;
      --card: #FFFFFF;
      --muted: #71717A;
      --border: #E4E4E7;
      --primary: #18181B;
      --primary-hover: #27272A;
      --primary-fg: #FAFAFA;
      --destructive: #EF4444;
      --radius: 12px;
      --ring: rgba(24, 24, 27, 0.08);
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      display: grid;
      place-items: center;
      background-color: var(--background);
      background-image: radial-gradient(at 50% 0%, rgba(228, 228, 231, 0.45) 0px, transparent 60%);
      color: var(--foreground);
      padding: 1.5rem;
      -webkit-font-smoothing: antialiased;
    }
    .vault-card {
      width: 100%;
      max-width: 410px;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 2.25rem 2rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 12px 24px -6px rgba(0, 0, 0, 0.06);
    }
    .icon-badge {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      background: #F4F4F5;
      border: 1px solid var(--border);
      display: grid;
      place-items: center;
      margin-bottom: 1.25rem;
      color: var(--foreground);
    }
    h1 {
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin-bottom: 0.35rem;
      color: var(--foreground);
    }
    p.subtitle {
      color: var(--muted);
      font-size: 0.875rem;
      margin-bottom: 1.5rem;
      line-height: 1.45;
    }
    .field {
      margin-bottom: 1.25rem;
    }
    label {
      display: block;
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--foreground);
      margin-bottom: 0.4rem;
    }
    input {
      width: 100%;
      padding: 0.7rem 0.85rem;
      border-radius: 8px;
      border: 1px solid var(--border);
      background: #FFFFFF;
      color: var(--foreground);
      font-size: 0.925rem;
      outline: none;
      transition: all 0.15s;
    }
    input:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px var(--ring);
    }
    button {
      width: 100%;
      padding: 0.75rem 1rem;
      border: none;
      border-radius: 8px;
      background: var(--primary);
      color: var(--primary-fg);
      font-size: 0.925rem;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      transition: all 0.15s;
      margin-top: 0.5rem;
    }
    button:hover { background: var(--primary-hover); transform: translateY(-1px); }
    button:active { transform: scale(0.985); }
    button:disabled {
      opacity: 0.6;
      cursor: wait;
      transform: none;
    }
    .error-banner {
      margin-top: 1rem;
      color: var(--destructive);
      font-size: 0.825rem;
      min-height: 1.25rem;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="vault-card">
    <div class="icon-badge">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    </div>
    <h1>${escapeHtml(title)}</h1>
    <p class="subtitle">This document is protected with AES-256 client-side encryption. Enter credentials to decrypt.</p>
    
    <form id="vault-form" autocomplete="off">
      ${username ? `
      <div class="field">
        <label for="u">Username</label>
        <input id="u" type="text" value="${escapeHtml(username)}" required />
      </div>` : ''}
      <div class="field">
        <label for="p">Password</label>
        <input id="p" type="password" placeholder="Enter document password" required autofocus />
      </div>
      <button id="unlock-btn" type="submit">Unlock Document</button>
      <div class="error-banner" id="err-msg" role="alert"></div>
    </form>
  </div>

  <script>
    const PAYLOAD = ${JSON.stringify(payload)};

    const base64ToBytes = (base64) => {
      const bin = atob(base64);
      const arr = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      return arr;
    };

    const form = document.getElementById("vault-form");
    const btn = document.getElementById("unlock-btn");
    const errMsg = document.getElementById("err-msg");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      btn.disabled = true;
      btn.textContent = "Decrypting...";
      errMsg.textContent = "";

      try {
        const userInput = document.getElementById("u") ? document.getElementById("u").value.trim() : "";
        const passInput = document.getElementById("p").value;

        // Reconstruct key input material
        const keyMaterialString = PAYLOAD.requiresUser ? (userInput + "\\u0000" + passInput) : passInput;
        const keyMaterial = new TextEncoder().encode(keyMaterialString);

        // 1. Import raw password material into Web Crypto
        const importedKey = await window.crypto.subtle.importKey(
          "raw",
          keyMaterial,
          "PBKDF2",
          false,
          ["deriveKey"]
        );

        // 2. Derive AES key using PBKDF2 (SHA-256, 310,000 iterations)
        const aesKey = await window.crypto.subtle.deriveKey(
          {
            name: "PBKDF2",
            salt: base64ToBytes(PAYLOAD.salt),
            iterations: PAYLOAD.iterations,
            hash: "SHA-256"
          },
          importedKey,
          { name: "AES-GCM", length: 256 },
          false,
          ["decrypt"]
        );

        // 3. Decrypt ciphertext payload using AES-256-GCM
        const decryptedBuffer = await window.crypto.subtle.decrypt(
          {
            name: "AES-GCM",
            iv: base64ToBytes(PAYLOAD.iv)
          },
          aesKey,
          base64ToBytes(PAYLOAD.cipher)
        );

        // 4. Decode plaintext and write document into DOM in-memory
        const decryptedHtml = new TextDecoder().decode(decryptedBuffer);
        document.open();
        document.write(decryptedHtml);
        document.close();
      } catch (err) {
        console.error(err);
        errMsg.textContent = "Invalid password. Unable to decrypt document.";
        btn.disabled = false;
        btn.textContent = "Unlock Document";
      }
    });
  </script>
</body>
</html>`;

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

fs.writeFileSync(destination, standaloneHtml, 'utf-8');
console.log(`\n✅ Encrypted document created successfully!`);
console.log(`📁 Source:      ${inputFile}`);
console.log(`🔒 Output:      ${destination}`);
console.log(`🔑 Iterations:  ${iterations.toLocaleString()} rounds (PBKDF2-SHA256)`);
console.log(`🛡️ Cipher:      AES-256-GCM\n`);
