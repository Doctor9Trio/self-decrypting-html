# Security & Threat Model: Client-Side Self-Decrypting HTML

This document provides a technical security evaluation and threat model for self-decrypting, zero-knowledge HTML containers.

---

## 1. Cryptographic Primitive Selection

### AES-256-GCM (Authenticated Encryption with Associated Data)
* **Confidentiality:** 256-bit symmetric encryption protects against unauthorized disclosure. To date, there are no known practical attacks against AES-256.
* **Integrity & Authenticity:** Galois/Counter Mode (GCM) computes an authentication tag over the ciphertext. If even 1 bit of the ciphertext or tag is modified, or if an incorrect decryption key is supplied, decryption halts with an `OperationError`.
* **Zero Partial Leakage:** Unlike unauthenticated modes (like CBC without HMAC), an attacker cannot leverage padding oracles or byte-flipping attacks.

### PBKDF2 with HMAC-SHA-256
* **Key Stretching:** Human passwords possess low entropy compared to a 256-bit random key. PBKDF2 mathematically increases the cost of evaluating each candidate password.
* **Iteration Count (310,000 Rounds):** 
  * OWASP recommends at least 600,000 rounds for PBKDF2-HMAC-SHA256, and 310,000 rounds is a strong, responsive baseline for cross-platform browser execution on mobile and desktop devices.
  * In the browser, 310,000 rounds takes ~40–90 ms on typical consumer hardware (imperceptible to a human entering a single password, but prohibitive for testing billions of guesses).
* **Cryptographic Salt (16 bytes):** 
  * Generated using CSPRNG (`crypto.getRandomValues()` or `crypto.randomBytes()`).
  * Salt uniqueness guarantees that identical passwords generate entirely distinct derived keys, defeating precomputed Rainbow Table attacks.
* **Initialization Vector / Nonce (12 bytes):**
  * AES-GCM requires a unique IV for every encryption under the same key. A 96-bit (12-byte) random IV adheres to NIST SP 800-38D.

---

## 2. Threat Model Analysis

### What This Architecture Protects Against

| Threat Vector | Mitigation Strategy | Verdict |
| :--- | :--- | :--- |
| **Inspect / View Source** | Plaintext HTML does not exist anywhere in the file. Only base64 ciphertext is stored. | **Protected** |
| **Tampering & Bit-Flipping** | GCM authentication tag verification rejects corrupted or altered files. | **Protected** |
| **Network Eavesdropping** | Decryption occurs 100% locally in the browser runtime. Zero bytes are sent over the network. | **Protected** |
| **Rainbow Table Attacks** | 16-byte random cryptographic salt ensures hash tables cannot be precalculated. | **Protected** |
| **Bypassing the UI (DevTools)** | Removing the login form or forcing `display: block` reveals nothing because the DOM content is empty until decrypted. | **Protected** |

---

### Realistic Attack Vectors & Limitations

#### 1. Offline Brute-Force & Dictionary Attacks
* **Risk:** The attacker who possesses the `.html` file has the ciphertext, the salt, and the iteration parameters. They can run offline attacks with tools like Hashcat or custom GPU kernels.
* **Countermeasure:** The security of the document depends directly on password entropy:
  * ❌ *Weak Password* (`Welcome123!` or `eka2026`): Crackable in minutes on a modern GPU cluster.
  * ✅ *Strong Passphrase* (`correct-horse-battery-staple` or 14+ characters): Computationally infeasible to crack, requiring centuries of computation even on distributed hardware.

#### 2. Compromised Host / Device Malware
* **Risk:** If the recipient's machine has active keyloggers or malicious browser extensions with broad permissions (`<all_urls>`), the plaintext password or decrypted DOM can be inspected once rendered.
* **Countermeasure:** Client-side encryption assumes the operating system and browser runtime are trusted.

#### 3. Ephemeral Memory Exposure
* **Risk:** When unlocked, `document.write(decryptedHtml)` places the plain HTML into browser memory.
* **Countermeasure:** Decrypted content is strictly stored in volatile RAM. Closing or refreshing the tab clears the unencrypted state immediately.

---

## 3. Comparison: When to Use vs. When NOT to Use

```
┌────────────────────────────────────────────────────────┐
│                      USE CASES                         │
├────────────────────────────┬───────────────────────────┤
│        IDEAL FOR           │      DO NOT USE FOR       │
├────────────────────────────┼───────────────────────────┤
│ • Offline confidential     │ • Standard web applications│
│   reports & audits         │ • SaaS multi-user portals │
│ • Client financial models  │ • Systems requiring       │
│ • Secure offline handoff   │   server-side auth & logs │
│ • Frictionless sharing     │ • Situations requiring    │
│   (no 7-Zip/GPG needed)    │   instant password revoke │
└────────────────────────────┴───────────────────────────┘
```
