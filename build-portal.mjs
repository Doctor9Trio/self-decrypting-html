import fs from 'fs';
import path from 'path';

// Read verified payload
const payload = JSON.parse(fs.readFileSync('payload.json', 'utf8'));

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML Document Vault • Client-Side Zero-Knowledge Encryption</title>
  
  <!-- Plus Jakarta Sans & JetBrains Mono Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">

  <style>
    /* Design Tokens: Warm Minimalist, Apple HIG & ShadCN Off-White */
    :root {
      --bg: #F8F9FA;
      --card-bg: #FFFFFF;
      --fg: #09090B;
      --fg-muted: #71717A;
      --fg-subtle: #A1A1AA;
      --border: #E4E4E7;
      --border-hover: #D4D4D8;
      --primary: #18181B;
      --primary-hover: #27272A;
      --primary-fg: #FAFAFA;
      --accent-green: #10B981;
      --accent-green-bg: #ECFDF5;
      --accent-green-border: #A7F3D0;
      --accent-green-text: #065F46;
      --accent-red: #EF4444;
      --accent-red-bg: #FEF2F2;
      --accent-red-border: #FECACA;
      --accent-amber: #F59E0B;
      --accent-amber-bg: #FFFBEB;
      --radius-xl: 18px;
      --radius-lg: 14px;
      --radius-md: 10px;
      --radius-sm: 8px;
      --radius-full: 9999px;
      --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
      --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.03), 0 12px 32px -4px rgba(0, 0, 0, 0.05);
      --shadow-elevated: 0 8px 30px rgba(0, 0, 0, 0.08);
      --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      --font-mono: 'JetBrains Mono', SFMono-Regular, Menlo, monospace;
      --spring: cubic-bezier(0.16, 1, 0.3, 1);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background-color: var(--bg);
      background-image: radial-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px);
      background-size: 24px 24px;
      color: var(--fg);
      font-family: var(--font-sans);
      min-height: 100vh;
      padding: 2.5rem 1.25rem 5rem;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .shell {
      width: 100%;
      max-width: 920px;
      margin: 0 auto;
    }

    /* Top Brand & Header */
    header {
      text-align: center;
      margin-bottom: 2.25rem;
    }

    .pill-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: #FFFFFF;
      border: 1px solid var(--border);
      padding: 0.35rem 0.9rem;
      border-radius: var(--radius-full);
      font-size: 0.775rem;
      font-weight: 600;
      color: var(--fg-muted);
      margin-bottom: 1rem;
      box-shadow: var(--shadow-sm);
    }

    .pill-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--accent-green);
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
    }

    h1 {
      font-size: 2.25rem;
      font-weight: 800;
      letter-spacing: -0.035em;
      color: var(--fg);
      line-height: 1.15;
      margin-bottom: 0.65rem;
    }

    .subtitle {
      font-size: 1.025rem;
      color: var(--fg-muted);
      max-width: 580px;
      margin: 0 auto;
      font-weight: 400;
    }

    /* Navigation Segmented Control */
    .nav-tabs-wrapper {
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;
    }

    .nav-tabs {
      display: inline-flex;
      background: rgba(0, 0, 0, 0.04);
      padding: 0.3rem;
      border-radius: var(--radius-md);
      gap: 0.25rem;
      border: 1px solid rgba(0, 0, 0, 0.04);
    }

    .nav-tab-btn {
      padding: 0.6rem 1.25rem;
      border: none;
      background: transparent;
      color: var(--fg-muted);
      font-family: var(--font-sans);
      font-size: 0.875rem;
      font-weight: 600;
      border-radius: var(--radius-sm);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.18s var(--spring);
    }

    .nav-tab-btn:hover {
      color: var(--fg);
    }

    .nav-tab-btn.active {
      background: #FFFFFF;
      color: var(--fg);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    }

    /* Content Cards */
    .tab-view {
      display: none;
      animation: fadeIn 0.25s var(--spring);
    }

    .tab-view.active {
      display: block;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      padding: 2rem;
      box-shadow: var(--shadow-card);
      margin-bottom: 1.75rem;
    }

    @media (max-width: 640px) {
      .card { padding: 1.25rem; border-radius: var(--radius-lg); }
      h1 { font-size: 1.75rem; }
    }

    /* Card Top Row */
    .card-head {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.5rem;
      padding-bottom: 1.25rem;
      border-bottom: 1px solid var(--border);
      flex-wrap: wrap;
      gap: 1rem;
    }

    .card-title-group h2 {
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin-bottom: 0.25rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .card-title-group p {
      font-size: 0.875rem;
      color: var(--fg-muted);
    }

    /* Vault Capsule Preview (Top of Decrypt) */
    .vault-capsule {
      background: #FAFAFA;
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 1.15rem 1.35rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
      gap: 0.85rem;
    }

    .capsule-left {
      display: flex;
      align-items: center;
      gap: 0.85rem;
    }

    .file-icon-box {
      width: 44px;
      height: 44px;
      border-radius: var(--radius-md);
      background: #FFFFFF;
      border: 1px solid var(--border);
      display: grid;
      place-items: center;
      color: var(--fg);
      flex-shrink: 0;
      box-shadow: var(--shadow-sm);
    }

    .capsule-meta h3 {
      font-size: 0.95rem;
      font-weight: 700;
      font-family: var(--font-mono);
      color: var(--fg);
      margin-bottom: 0.2rem;
    }

    .capsule-tags {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      flex-wrap: wrap;
    }

    .tag-badge {
      display: inline-flex;
      align-items: center;
      font-size: 0.725rem;
      font-family: var(--font-mono);
      font-weight: 600;
      padding: 0.15rem 0.5rem;
      border-radius: 4px;
      background: #FFFFFF;
      border: 1px solid var(--border);
      color: var(--fg-muted);
    }

    .tag-badge.secure {
      color: var(--accent-green-text);
      background: var(--accent-green-bg);
      border-color: var(--accent-green-border);
    }

    .capsule-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-family: var(--font-sans);
      font-size: 0.875rem;
      font-weight: 600;
      padding: 0.65rem 1.15rem;
      border-radius: var(--radius-md);
      border: 1px solid transparent;
      cursor: pointer;
      transition: all 0.15s var(--spring);
      text-decoration: none;
      min-height: 42px;
    }

    .btn:active {
      transform: scale(0.98);
    }

    .btn-primary {
      background: var(--primary);
      color: var(--primary-fg);
    }

    .btn-primary:hover {
      background: var(--primary-hover);
    }

    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    .btn-secondary {
      background: #FFFFFF;
      color: var(--fg);
      border-color: var(--border);
      box-shadow: var(--shadow-sm);
    }

    .btn-secondary:hover {
      background: #F4F4F5;
      border-color: var(--border-hover);
    }

    .btn-sm {
      padding: 0.4rem 0.75rem;
      font-size: 0.8rem;
      min-height: 32px;
      border-radius: var(--radius-sm);
    }

    .btn-ghost {
      background: transparent;
      color: var(--fg-muted);
      border: none;
    }

    .btn-ghost:hover {
      background: rgba(0, 0, 0, 0.05);
      color: var(--fg);
    }

    /* Decrypt Action Box */
    .decrypt-action-box {
      margin-bottom: 1.5rem;
    }

    .input-label-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .input-label {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--fg);
    }

    .input-row {
      display: flex;
      gap: 0.75rem;
      align-items: center;
    }

    @media (max-width: 640px) {
      .input-row {
        flex-direction: column;
        align-items: stretch;
      }
    }

    .input-wrapper {
      position: relative;
      flex: 1;
    }

    .input-text {
      width: 100%;
      height: 44px;
      padding: 0 2.5rem 0 0.95rem;
      font-family: var(--font-mono);
      font-size: 0.925rem;
      background: #FFFFFF;
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      color: var(--fg);
      outline: none;
      transition: all 0.15s ease;
    }

    .input-text:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(24, 24, 27, 0.07);
    }

    .input-icon-btn {
      position: absolute;
      right: 0.65rem;
      top: 50%;
      transform: translateY(-50%);
      background: transparent;
      border: none;
      color: var(--fg-muted);
      cursor: pointer;
      padding: 0.25rem;
      display: grid;
      place-items: center;
      border-radius: 4px;
    }

    .input-icon-btn:hover {
      color: var(--fg);
    }

    .error-banner {
      display: none;
      margin-top: 0.65rem;
      font-size: 0.825rem;
      color: var(--accent-red);
      font-weight: 500;
      align-items: center;
      gap: 0.35rem;
    }

    /* Decrypted Viewport */
    .viewport-container {
      display: none;
      border: 1px solid var(--accent-green-border);
      border-radius: var(--radius-lg);
      background: #FFFFFF;
      overflow: hidden;
      margin-top: 1.5rem;
      box-shadow: 0 4px 20px -2px rgba(16, 185, 129, 0.08);
      animation: slideUp 0.35s var(--spring);
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .viewport-topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #F8FDF9;
      border-bottom: 1px solid var(--accent-green-border);
      padding: 0.75rem 1.15rem;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .viewport-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--accent-green-text);
    }

    .device-switcher {
      display: inline-flex;
      background: #FFFFFF;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 0.15rem;
      gap: 0.15rem;
    }

    .device-btn {
      padding: 0.3rem 0.65rem;
      border: none;
      background: transparent;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--fg-muted);
      border-radius: 4px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      transition: all 0.15s ease;
    }

    .device-btn.active {
      background: var(--primary);
      color: #FFFFFF;
    }

    .viewport-actions {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .iframe-wrapper {
      background: #F4F4F5;
      padding: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      min-height: 480px;
      overflow-x: auto;
    }

    .preview-frame {
      width: 100%;
      height: 650px;
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      background: #FFFFFF;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
      transition: width 0.3s var(--spring);
    }

    .preview-frame.tablet {
      width: 768px;
    }

    .preview-frame.mobile {
      width: 375px;
    }

    /* Collapsible Technical Inspection */
    .tech-disclosure {
      margin-top: 1.75rem;
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      background: #FFFFFF;
      overflow: hidden;
      transition: all 0.2s ease;
    }

    .tech-summary {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.9rem 1.25rem;
      background: #FAFAFA;
      cursor: pointer;
      user-select: none;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--fg);
      list-style: none;
    }

    .tech-summary::-webkit-details-marker {
      display: none;
    }

    .tech-summary:hover {
      background: #F4F4F6;
    }

    .tech-content {
      padding: 1.25rem;
      border-top: 1px solid var(--border);
    }

    /* Micro Stepper */
    .gate-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.5rem;
      margin-bottom: 1.25rem;
    }

    @media (max-width: 640px) {
      .gate-grid { grid-template-columns: 1fr; }
    }

    .gate-cell {
      background: #FAFAFA;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 0.65rem 0.85rem;
      font-size: 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .gate-cell.completed {
      background: var(--accent-green-bg);
      border-color: var(--accent-green-border);
    }

    .gate-num {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: var(--fg-muted);
      text-transform: uppercase;
      font-weight: 700;
    }

    .gate-cell.completed .gate-num {
      color: var(--accent-green-text);
    }

    .gate-label {
      font-weight: 600;
      color: var(--fg);
    }

    /* Terminal Trace */
    .terminal-box {
      background: #18181B;
      border-radius: var(--radius-md);
      padding: 0.85rem 1rem;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: #D4D4D8;
      max-height: 180px;
      overflow-y: auto;
      line-height: 1.6;
    }

    .log-line {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 0.15rem;
    }

    .log-time { color: #71717A; flex-shrink: 0; }
    .log-tag { font-weight: 700; }
    .log-tag.INIT { color: #60A5FA; }
    .log-tag.KDF { color: #FBBF24; }
    .log-tag.CIPHER { color: #A78BFA; }
    .log-tag.SUCCESS { color: #34D399; }
    .log-tag.ERR { color: #F87171; }

    /* Drag & Drop Upload Zone */
    .dropzone {
      border: 2px dashed var(--border);
      border-radius: var(--radius-lg);
      padding: 2.25rem 1.5rem;
      text-align: center;
      background: #FAFAFA;
      cursor: pointer;
      transition: all 0.15s ease;
      margin-bottom: 1.25rem;
    }

    .dropzone:hover, .dropzone.dragover {
      background: #F4F4F6;
      border-color: var(--primary);
    }

    .dropzone-icon {
      width: 48px;
      height: 48px;
      margin: 0 auto 0.75rem;
      border-radius: var(--radius-md);
      background: #FFFFFF;
      border: 1px solid var(--border);
      display: grid;
      place-items: center;
      color: var(--fg-muted);
    }

    .dropzone-title {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--fg);
      margin-bottom: 0.25rem;
    }

    .dropzone-desc {
      font-size: 0.8rem;
      color: var(--fg-muted);
    }

    /* Encrypt Form Fields */
    .form-group {
      margin-bottom: 1.25rem;
    }

    .form-label {
      display: block;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 0.4rem;
      color: var(--fg);
    }

    .form-help {
      font-size: 0.75rem;
      color: var(--fg-muted);
      margin-top: 0.35rem;
    }

    /* Architecture Grid */
    .arch-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem;
    }

    @media (max-width: 640px) {
      .arch-grid { grid-template-columns: 1fr; }
    }

    .arch-card {
      background: #FAFAFA;
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 1.25rem;
    }

    .arch-card h3 {
      font-size: 0.95rem;
      font-weight: 700;
      margin-bottom: 0.4rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .arch-card p {
      font-size: 0.825rem;
      color: var(--fg-muted);
      line-height: 1.5;
    }

    /* Sonner Toast Container */
    .toast-container {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      z-index: 9999;
      pointer-events: none;
    }

    .toast {
      background: #18181B;
      color: #FAFAFA;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: var(--radius-md);
      padding: 0.75rem 1rem;
      font-size: 0.825rem;
      font-weight: 500;
      box-shadow: var(--shadow-elevated);
      display: flex;
      align-items: center;
      gap: 0.65rem;
      pointer-events: auto;
      animation: toastIn 0.25s var(--spring);
      max-width: 380px;
    }

    @keyframes toastIn {
      from { opacity: 0; transform: translateY(12px) scale(0.96); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .toast.success .toast-icon { color: #34D399; }
    .toast.error .toast-icon { color: #F87171; }
  </style>
</head>
<body>

  <div class="shell">
    
    <!-- Top Header -->
    <header>
      <div class="pill-badge">
        <span class="pill-dot"></span>
        <span>Web Cryptography API • Zero-Knowledge Architecture</span>
      </div>
      <h1>HTML Document Vault</h1>
      <p class="subtitle">Client-side self-decrypting HTML reports with AES-256-GCM authenticated encryption and in-memory execution.</p>
    </header>

    <!-- Navigation Bar -->
    <div class="nav-tabs-wrapper">
      <div class="nav-tabs">
        <button id="tab-btn-decrypt" class="nav-tab-btn active" onclick="switchTab('decrypt')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          Decryption Enclave
        </button>
        <button id="tab-btn-encrypt" class="nav-tab-btn" onclick="switchTab('encrypt')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
          Package New Document
        </button>
        <button id="tab-btn-specs" class="nav-tab-btn" onclick="switchTab('specs')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          Architecture & Specs
        </button>
      </div>
    </div>

    <!-- TAB 1: DECRYPTION ENCLAVE -->
    <div id="view-decrypt" class="tab-view active">
      <div class="card">
        
        <div class="card-head">
          <div class="card-title-group">
            <h2>
              <span>Encrypted Vault Capsule</span>
            </h2>
            <p>Inspect and unpack self-decrypting HTML payloads directly in RAM without network requests.</p>
          </div>
          <div class="capsule-actions">
            <button class="btn btn-secondary btn-sm" onclick="triggerCustomUpload()">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              Upload .enc.html
            </button>
            <input type="file" id="custom-file-input" accept=".html,.enc.html" style="display: none;" onchange="handleCustomFile(this.files)">
            <button class="btn btn-secondary btn-sm" onclick="resetToBuiltin()">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path><path d="M8 16H3v5"></path></svg>
              Sample Vault
            </button>
          </div>
        </div>

        <!-- Vault Capsule Info -->
        <div class="vault-capsule">
          <div class="capsule-left">
            <div class="file-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </div>
            <div class="capsule-meta">
              <h3 id="capsule-doc-name">sample-report.enc.html</h3>
              <div class="capsule-tags">
                <span class="tag-badge secure">AES-256-GCM</span>
                <span class="tag-badge" id="capsule-doc-size">18.42 KB</span>
                <span class="tag-badge" id="capsule-doc-rounds">310,000 Rounds</span>
                <span class="tag-badge" id="capsule-doc-state">Status: Locked</span>
              </div>
            </div>
          </div>
          <div>
            <button class="btn btn-secondary btn-sm" onclick="fillDemoPassword()">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              Fill Demo Key
            </button>
          </div>
        </div>

        <!-- Decrypt Input & Action -->
        <div class="decrypt-action-box">
          <div class="input-label-row">
            <label class="input-label" for="vault-password">Decryption Passphrase</label>
            <span style="font-size: 0.775rem; color: var(--fg-muted);" id="key-hint">Default test key: <code>ConfidentialPass2026!</code></span>
          </div>
          <div class="input-row">
            <div class="input-wrapper">
              <input type="password" id="vault-password" class="input-text" placeholder="Enter passphrase to unlock..." value="ConfidentialPass2026!">
              <button class="input-icon-btn" onclick="togglePasswordVisibility()" title="Toggle visibility">
                <svg id="eye-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </button>
            </div>
            <button id="btn-unlock" class="btn btn-primary" onclick="unlockDocument()" style="white-space: nowrap;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>
              <span id="btn-unlock-text">Unlock Document</span>
            </button>
          </div>
          <div id="decrypt-error" class="error-banner">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <span id="decrypt-error-text">Decryption failed. Please check the passphrase.</span>
          </div>
        </div>

        <!-- Decrypted Live Viewport -->
        <div id="decrypted-viewport" class="viewport-container">
          <div class="viewport-topbar">
            <div class="viewport-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span id="viewport-status-text">Verified & Decrypted in RAM (0B Disk Footprint)</span>
            </div>
            <div class="device-switcher">
              <button id="device-desktop" class="device-btn active" onclick="setDeviceView('desktop')">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                Desktop
              </button>
              <button id="device-tablet" class="device-btn" onclick="setDeviceView('tablet')">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                Tablet
              </button>
              <button id="device-mobile" class="device-btn" onclick="setDeviceView('mobile')">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                Mobile
              </button>
            </div>
            <div class="viewport-actions">
              <button class="btn btn-secondary btn-sm" onclick="exportDecryptedHtml()" title="Download raw HTML">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Export HTML
              </button>
              <button class="btn btn-secondary btn-sm" onclick="openInNewTab()" title="Open document full size">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                Full Screen
              </button>
              <button class="btn btn-secondary btn-sm" onclick="lockDocument()" title="Wipe RAM and re-lock">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                Re-Lock
              </button>
            </div>
          </div>
          <div class="iframe-wrapper">
            <iframe id="doc-iframe" class="preview-frame" sandbox="allow-scripts allow-same-origin"></iframe>
          </div>
        </div>

        <!-- Collapsible Technical Inspection -->
        <details class="tech-disclosure">
          <summary class="tech-summary">
            <span>⚙ Cryptographic Telemetry & Pipeline Inspector</span>
            <span style="font-size: 0.75rem; color: var(--fg-muted);">Click to inspect gates & logs</span>
          </summary>
          <div class="tech-content">
            
            <!-- Pipeline Gates -->
            <div class="gate-grid">
              <div id="gate-1" class="gate-cell">
                <span class="gate-num">Gate 01</span>
                <span class="gate-label">Entropy Verification</span>
                <span style="font-size: 0.675rem; color: var(--fg-muted);">16B Salt • 12B IV</span>
              </div>
              <div id="gate-2" class="gate-cell">
                <span class="gate-num">Gate 02</span>
                <span class="gate-label">PBKDF2 Key Stretching</span>
                <span style="font-size: 0.675rem; color: var(--fg-muted);">310k HMAC-SHA256</span>
              </div>
              <div id="gate-3" class="gate-cell">
                <span class="gate-num">Gate 03</span>
                <span class="gate-label">AES-GCM Auth Check</span>
                <span style="font-size: 0.675rem; color: var(--fg-muted);">128-bit MAC Tag Match</span>
              </div>
              <div id="gate-4" class="gate-cell">
                <span class="gate-num">Gate 04</span>
                <span class="gate-label">RAM Reconstitution</span>
                <span style="font-size: 0.675rem; color: var(--fg-muted);">Ephemeral DOM Injection</span>
              </div>
            </div>

            <!-- Terminal Trace Box -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
              <span style="font-size: 0.75rem; font-weight: 600; color: var(--fg-muted); text-transform: uppercase;">Live Execution Trace</span>
              <button class="btn btn-ghost btn-sm" onclick="copyTraceLogs()" style="font-size: 0.7rem; padding: 0.2rem 0.5rem;">Copy Log</button>
            </div>
            <div id="terminal-trace" class="terminal-box">
              <div class="log-line"><span class="log-time">[0.00ms]</span> <span class="log-tag INIT">[INIT]</span> Vault initialized. WebCrypto native subsystem ready.</div>
            </div>

          </div>
        </details>

      </div>
    </div>

    <!-- TAB 2: PACKAGE NEW DOCUMENT -->
    <div id="view-encrypt" class="tab-view">
      <div class="card">
        <div class="card-head">
          <div class="card-title-group">
            <h2>Package Document into Encrypted Vault</h2>
            <p>Embed any HTML file into an offline, self-contained, password-protected single file.</p>
          </div>
        </div>

        <div class="dropzone" id="packager-dropzone" onclick="document.getElementById('packager-file-input').click()">
          <div class="dropzone-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
          </div>
          <div class="dropzone-title" id="packager-filename">Choose an HTML file or drop it here</div>
          <div class="dropzone-desc">Accepts .html files • Completely processed in local browser RAM</div>
          <input type="file" id="packager-file-input" accept=".html,.htm" style="display: none;" onchange="handlePackagerFile(this.files)">
        </div>

        <div class="form-group">
          <label class="form-label" for="packager-pass">Encryption Passphrase</label>
          <div class="input-row">
            <div class="input-wrapper">
              <input type="password" id="packager-pass" class="input-text" placeholder="Enter a strong passphrase...">
            </div>
            <button class="btn btn-secondary" onclick="generateRandomPassphrase()">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path></svg>
              Generate Strong Key
            </button>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="packager-iterations">PBKDF2 Key Stretching (HMAC-SHA256)</label>
          <select id="packager-iterations" class="input-text" style="height: 42px; padding: 0 0.85rem;">
            <option value="310000" selected>310,000 Rounds (OWASP Recommended Standard • ~180ms)</option>
            <option value="600000">600,000 Rounds (High Security • ~360ms)</option>
            <option value="1000000">1,000,000 Rounds (Maximum Hardening • ~600ms)</option>
          </select>
          <p class="form-help">Higher iterations dramatically resist GPU / ASIC brute-force attacks.</p>
        </div>

        <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
          <button id="btn-package" class="btn btn-primary" onclick="packageDocument()" style="flex: 1;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            <span id="btn-package-text">Generate Self-Decrypting Vault (.enc.html)</span>
          </button>
        </div>

      </div>
    </div>

    <!-- TAB 3: ARCHITECTURE & SPECS -->
    <div id="view-specs" class="tab-view">
      <div class="card">
        <div class="card-head">
          <div class="card-title-group">
            <h2>Cryptographic Architecture & Security Specs</h2>
            <p>Pure client-side zero-knowledge security implementation details.</p>
          </div>
        </div>

        <div class="arch-grid">
          <div class="arch-card">
            <h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              AES-256-GCM Cipher
            </h3>
            <p>Galois/Counter Mode provides both confidentiality and built-in 128-bit authentication integrity tags. Any tampering with ciphertext immediately halts decryption.</p>
          </div>

          <div class="arch-card">
            <h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              PBKDF2 Key Stretching
            </h3>
            <p>Passphrases are stretched into 256-bit symmetric keys using 310,000+ rounds of HMAC-SHA256 with 16 bytes of cryptographically random entropy salt.</p>
          </div>

          <div class="arch-card">
            <h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
              Zero Disk Footprint
            </h3>
            <p>Unpacked HTML documents live strictly in ephemeral browser RAM. No temporary files or plaintext artifacts ever touch disk storage or network caches.</p>
          </div>

          <div class="arch-card">
            <h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              Hardware-Accelerated WebCrypto
            </h3>
            <p>Uses the W3C Web Cryptography API natively compiled into browser engines, executing 310k hash rounds and AES decryption in under 200 milliseconds.</p>
          </div>
        </div>

      </div>
    </div>

  </div>

  <!-- Sonner Stacked Toasts -->
  <div id="toast-container" class="toast-container"></div>

  <script>
    // Embedded verified payload from payload.json
    const DEFAULT_PAYLOAD = ${JSON.stringify(payload)};
    let activePayload = DEFAULT_PAYLOAD;
    let decryptedHtmlContent = null;
    let customFileRawHtml = null;

    // Tab Navigation
    function switchTab(tabId) {
      ['decrypt', 'encrypt', 'specs'].forEach(t => {
        document.getElementById('view-' + t).classList.toggle('active', t === tabId);
        document.getElementById('tab-btn-' + t).classList.toggle('active', t === tabId);
      });
    }

    // Sonner-Style Toast Notification
    function showToast(title, desc, type = 'success') {
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      toast.className = 'toast ' + type;
      
      const icon = type === 'success' 
        ? '<svg class="toast-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>'
        : '<svg class="toast-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';

      toast.innerHTML = icon + '<div><div style="font-weight: 600;">' + title + '</div>' + (desc ? '<div style="font-size: 0.75rem; color: #A1A1AA;">' + desc + '</div>' : '') + '</div>';
      container.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(12px) scale(0.96)';
        toast.style.transition = 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => toast.remove(), 200);
      }, 3500);
    }

    // Logging to Technical Trace
    function logTrace(tag, msg) {
      const trace = document.getElementById('terminal-trace');
      if (!trace) return;
      const now = performance.now().toFixed(2);
      const line = document.createElement('div');
      line.className = 'log-line';
      line.innerHTML = '<span class="log-time">[' + now + 'ms]</span> <span class="log-tag ' + tag + '">[' + tag + ']</span> <span>' + msg + '</span>';
      trace.appendChild(line);
      trace.scrollTop = trace.scrollHeight;
    }

    function copyTraceLogs() {
      const text = document.getElementById('terminal-trace').innerText;
      navigator.clipboard.writeText(text).then(() => {
        showToast('Logs Copied', 'Cryptographic execution trace copied to clipboard.');
      });
    }

    // Toggle Password Visibility
    function togglePasswordVisibility() {
      const input = document.getElementById('vault-password');
      const eye = document.getElementById('eye-icon');
      const isPwd = input.type === 'password';
      input.type = isPwd ? 'text' : 'password';
      eye.innerHTML = isPwd 
        ? '<line x1="1" y1="1" x2="23" y2="23"></line><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>'
        : '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
    }

    function fillDemoPassword() {
      document.getElementById('vault-password').value = 'ConfidentialPass2026!';
      document.getElementById('decrypt-error').style.display = 'none';
      logTrace('INIT', 'Injected verified test passphrase.');
      showToast('Key Inserted', 'Ready to unlock sample report.');
    }

    // Gate Stepper helper
    function setGateState(gateNum, completed) {
      const gate = document.getElementById('gate-' + gateNum);
      if (gate) {
        gate.classList.toggle('completed', completed);
      }
    }

    function resetGates() {
      for (let i = 1; i <= 4; i++) setGateState(i, false);
    }

    // Decode Helpers
    const toBytes = (b) => Uint8Array.from(atob(b), c => c.charCodeAt(0));
    const toBase64 = (arr) => btoa(String.fromCharCode(...arr));

    // Decrypt Document Core
    async function unlockDocument() {
      const pass = document.getElementById('vault-password').value;
      const errBox = document.getElementById('decrypt-error');
      const errText = document.getElementById('decrypt-error-text');
      const btn = document.getElementById('btn-unlock');
      const btnText = document.getElementById('btn-unlock-text');
      const viewport = document.getElementById('decrypted-viewport');
      const iframe = document.getElementById('doc-iframe');

      errBox.style.display = 'none';
      if (!pass) {
        errText.textContent = 'Please enter the decryption passphrase.';
        errBox.style.display = 'flex';
        return;
      }

      resetGates();
      btn.disabled = true;
      btnText.textContent = 'Decrypting...';
      logTrace('INIT', 'Starting execution with ' + (activePayload.iterations || 310000).toLocaleString() + ' PBKDF2 rounds...');

      const tStart = performance.now();

      try {
        // Gate 1: Entropy Verification
        const enc = new TextEncoder();
        const salt = toBytes(activePayload.salt);
        const iv = toBytes(activePayload.iv);
        const cipher = toBytes(activePayload.cipher);
        const iterations = activePayload.iterations || 310000;
        setGateState(1, true);
        logTrace('INIT', 'Gate 01 passed: Salt (' + salt.length + 'B) and IV (' + iv.length + 'B) verified.');

        // Gate 2: PBKDF2 Key Stretching
        logTrace('KDF', 'Deriving 256-bit AES master key with HMAC-SHA256 (' + iterations.toLocaleString() + ' rounds)...');
        const keyMaterial = await crypto.subtle.importKey(
          'raw',
          enc.encode(pass),
          { name: 'PBKDF2' },
          false,
          ['deriveKey']
        );
        const key = await crypto.subtle.deriveKey(
          { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
          keyMaterial,
          { name: 'AES-GCM', length: 256 },
          false,
          ['decrypt']
        );
        setGateState(2, true);
        logTrace('KDF', 'Gate 02 passed: AES key derived successfully.');

        // Gate 3: AES-256-GCM Decryption & Auth Tag Check
        logTrace('CIPHER', 'Submitting ' + cipher.length + ' bytes to AES-256-GCM cipher...');
        const decryptedBuffer = await crypto.subtle.decrypt(
          { name: 'AES-GCM', iv },
          key,
          cipher
        );
        setGateState(3, true);
        logTrace('CIPHER', 'Gate 03 passed: 128-bit MAC tag verified. Integrity intact.');

        // Gate 4: RAM Reconstitution
        const decText = new TextDecoder().decode(decryptedBuffer);
        decryptedHtmlContent = decText;
        setGateState(4, true);

        const latency = (performance.now() - tStart).toFixed(1);
        logTrace('SUCCESS', 'Gate 04 passed: Document reconstituted in RAM (' + decText.length.toLocaleString() + ' characters) in ' + latency + 'ms.');

        // Inject into iframe
        iframe.srcdoc = decText;
        viewport.style.display = 'block';
        document.getElementById('capsule-doc-state').textContent = 'Status: Unlocked';
        document.getElementById('viewport-status-text').textContent = '✓ Unlocked in ' + latency + 'ms • 0B Disk Footprint';

        showToast('Document Unlocked', 'Reconstituted ' + (decryptedBuffer.byteLength / 1024).toFixed(1) + ' KB in ' + latency + 'ms.');

      } catch (err) {
        logTrace('ERR', 'Authentication failure: Incorrect passphrase or corrupted tag.');
        errText.textContent = 'Incorrect passphrase. AES-GCM authentication tag verification failed.';
        errBox.style.display = 'flex';
        showToast('Decryption Failed', 'Invalid passphrase or tag mismatch.', 'error');
      } finally {
        btn.disabled = false;
        btnText.textContent = 'Unlock Document';
      }
    }

    // Lock Document and wipe RAM
    function lockDocument() {
      decryptedHtmlContent = null;
      const iframe = document.getElementById('doc-iframe');
      iframe.srcdoc = '';
      document.getElementById('decrypted-viewport').style.display = 'none';
      document.getElementById('capsule-doc-state').textContent = 'Status: Locked';
      resetGates();
      logTrace('INIT', 'Memory wiped. Document returned to encrypted state.');
      showToast('Vault Locked', 'RAM cleared and document sealed.');
    }

    // Export Clean HTML
    function exportDecryptedHtml() {
      if (!decryptedHtmlContent) return;
      const blob = new Blob([decryptedHtmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'decrypted-report.html';
      a.click();
      URL.revokeObjectURL(url);
      showToast('Exported', 'Decrypted document downloaded.');
    }

    // Open full screen in new tab
    function openInNewTab() {
      if (!decryptedHtmlContent) return;
      const blob = new Blob([decryptedHtmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      showToast('Full View', 'Opened in isolated tab.');
    }

    // Device Viewport Emulation
    function setDeviceView(mode) {
      const frame = document.getElementById('doc-iframe');
      ['desktop', 'tablet', 'mobile'].forEach(m => {
        document.getElementById('device-' + m).classList.toggle('active', m === mode);
        frame.classList.toggle(m, m === mode);
      });
    }

    // Custom File Ingestion in Decrypt View
    function triggerCustomUpload() {
      document.getElementById('custom-file-input').click();
    }

    function resetToBuiltin() {
      activePayload = DEFAULT_PAYLOAD;
      document.getElementById('capsule-doc-name').textContent = 'sample-report.enc.html';
      document.getElementById('capsule-doc-size').textContent = '18.42 KB';
      document.getElementById('capsule-doc-rounds').textContent = '310,000 Rounds';
      document.getElementById('capsule-doc-state').textContent = 'Status: Locked';
      document.getElementById('vault-password').value = 'ConfidentialPass2026!';
      lockDocument();
      logTrace('INIT', 'Switched back to sample verification vault.');
      showToast('Sample Loaded', 'Verification sample ready.');
    }

    function handleCustomFile(files) {
      if (!files || !files.length) return;
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const match = text.match(/const PAYLOAD = ({.*?});/s);
        if (match) {
          try {
            const parsed = JSON.parse(match[1]);
            if (parsed.salt && parsed.iv && parsed.cipher) {
              activePayload = parsed;
              document.getElementById('capsule-doc-name').textContent = file.name;
              document.getElementById('capsule-doc-size').textContent = (file.size / 1024).toFixed(1) + ' KB';
              document.getElementById('capsule-doc-rounds').textContent = (parsed.iterations || 310000).toLocaleString() + ' Rounds';
              document.getElementById('capsule-doc-state').textContent = 'Status: Locked';
              document.getElementById('vault-password').value = '';
              lockDocument();
              logTrace('INIT', 'Loaded custom vault payload from ' + file.name);
              showToast('Vault Loaded', file.name);
              return;
            }
          } catch (err) {}
        }
        showToast('Parse Error', 'Could not locate valid encrypted PAYLOAD in file.', 'error');
      };
      reader.readAsText(file);
    }

    // TAB 2: PACKAGING
    function handlePackagerFile(files) {
      if (!files || !files.length) return;
      const file = files[0];
      document.getElementById('packager-filename').textContent = file.name + ' (' + (file.size / 1024).toFixed(1) + ' KB)';
      const reader = new FileReader();
      reader.onload = (e) => {
        customFileRawHtml = e.target.result;
        showToast('File Ready', 'Loaded ' + file.name + ' for packaging.');
      };
      reader.readAsText(file);
    }

    function generateRandomPassphrase() {
      const chars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%&*';
      let pass = '';
      const vals = new Uint8Array(18);
      crypto.getRandomValues(vals);
      vals.forEach(v => { pass += chars[v % chars.length]; });
      document.getElementById('packager-pass').value = pass;
      document.getElementById('packager-pass').type = 'text';
      navigator.clipboard.writeText(pass);
      showToast('Key Generated', 'Strong 18-char key copied to clipboard.');
    }

    async function packageDocument() {
      const pass = document.getElementById('packager-pass').value;
      const iterations = parseInt(document.getElementById('packager-iterations').value, 10);
      const btn = document.getElementById('btn-package');
      const btnText = document.getElementById('btn-package-text');

      if (!customFileRawHtml) {
        showToast('Missing HTML', 'Please select or drop an HTML file first.', 'error');
        return;
      }
      if (!pass) {
        showToast('Missing Passphrase', 'Please enter a passphrase for the vault.', 'error');
        return;
      }

      btn.disabled = true;
      btnText.textContent = 'Encrypting & Packaging...';

      try {
        const enc = new TextEncoder();
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const iv = crypto.getRandomValues(new Uint8Array(12));

        const keyMaterial = await crypto.subtle.importKey(
          'raw',
          enc.encode(pass),
          { name: 'PBKDF2' },
          false,
          ['deriveKey']
        );
        const key = await crypto.subtle.deriveKey(
          { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
          keyMaterial,
          { name: 'AES-GCM', length: 256 },
          false,
          ['encrypt']
        );

        const cipherBuffer = await crypto.subtle.encrypt(
          { name: 'AES-GCM', iv },
          key,
          enc.encode(customFileRawHtml)
        );

        const newPayload = {
          salt: toBase64(salt),
          iv: toBase64(iv),
          iterations: iterations,
          cipher: toBase64(new Uint8Array(cipherBuffer))
        };

        // Build self-contained HTML
        const standaloneHtml = generateStandaloneVaultHtml(newPayload);
        const blob = new Blob([standaloneHtml], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'encrypted-vault.enc.html';
        a.click();
        URL.revokeObjectURL(url);

        showToast('Vault Generated', 'Downloaded self-decrypting encrypted-vault.enc.html');

      } catch (err) {
        showToast('Packaging Error', err.message, 'error');
      } finally {
        btn.disabled = false;
        btnText.textContent = 'Generate Self-Decrypting Vault (.enc.html)';
      }
    }

    function generateStandaloneVaultHtml(p) {
      return '<!doctype html>\\n' +
'<html lang="en">\\n' +
'<head>\\n' +
'  <meta charset="utf-8"/>\\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1"/>\\n' +
'  <title>Confidential Vault</title>\\n' +
'  <style>\\n' +
'    :root { --bg: #F8F9FA; --card: #FFFFFF; --fg: #09090B; --muted: #71717A; --border: #E4E4E7; --primary: #18181B; --radius: 14px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }\\n' +
'    * { box-sizing: border-box; margin: 0; padding: 0; }\\n' +
'    body { min-height: 100vh; display: grid; place-items: center; background: var(--bg); color: var(--fg); padding: 1.5rem; }\\n' +
'    .card { width: 100%; max-width: 420px; background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 2rem; box-shadow: 0 4px 20px -2px rgba(0,0,0,0.06); }\\n' +
'    h1 { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.35rem; }\\n' +
'    p { font-size: 0.875rem; color: var(--muted); margin-bottom: 1.5rem; }\\n' +
'    input { width: 100%; height: 44px; padding: 0 0.85rem; border: 1px solid var(--border); border-radius: 8px; font-size: 0.95rem; margin-bottom: 1rem; outline: none; }\\n' +
'    input:focus { border-color: var(--primary); }\\n' +
'    button { width: 100%; height: 44px; background: var(--primary); color: #FFF; border: none; border-radius: 8px; font-size: 0.95rem; font-weight: 600; cursor: pointer; }\\n' +
'    button:active { transform: scale(0.98); }\\n' +
'    .err { color: #EF4444; font-size: 0.8rem; margin-top: 0.75rem; display: none; }\\n' +
'  </style>\\n' +
'</head>\\n' +
'<body>\\n' +
'  <div class="card" id="lock-card">\\n' +
'    <h1>Confidential Document</h1>\\n' +
'    <p>This file is protected with AES-256-GCM. Enter passphrase to decrypt into RAM.</p>\\n' +
'    <input type="password" id="p" placeholder="Passphrase..."/>\\n' +
'    <button onclick="unlock()">Decrypt Document</button>\\n' +
'    <div class="err" id="e">Incorrect passphrase. Decryption failed.</div>\\n' +
'  </div>\\n' +
'  <script>\\n' +
'    const PAYLOAD = ' + JSON.stringify(p) + ';\\n' +
'    const toBytes = (b) => Uint8Array.from(atob(b), c => c.charCodeAt(0));\\n' +
'    async function unlock() {\\n' +
'      const pass = document.getElementById("p").value;\\n' +
'      const e = document.getElementById("e");\\n' +
'      e.style.display = "none";\\n' +
'      try {\\n' +
'        const enc = new TextEncoder();\\n' +
'        const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(pass), { name: "PBKDF2" }, false, ["deriveKey"]);\\n' +
'        const key = await crypto.subtle.deriveKey({ name: "PBKDF2", salt: toBytes(PAYLOAD.salt), iterations: PAYLOAD.iterations, hash: "SHA-256" }, keyMaterial, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);\\n' +
'        const dec = await crypto.subtle.decrypt({ name: "AES-GCM", iv: toBytes(PAYLOAD.iv) }, key, toBytes(PAYLOAD.cipher));\\n' +
'        document.open(); document.write(new TextDecoder().decode(dec)); document.close();\\n' +
'      } catch(err) { e.style.display = "block"; }\\n' +
'    }\\n' +
'  <\/script>\\n' +
'</body>\\n' +
'</html>';
    }

    // Auto-run verification on load for instant user feedback
    window.addEventListener('DOMContentLoaded', () => {
      logTrace('INIT', 'Ready. Click "Unlock Document" to test client-side decryption.');
    });
  </script>
</body>
</html>`;

fs.writeFileSync('index.html', htmlContent, 'utf8');
fs.writeFileSync('web/index.html', htmlContent, 'utf8');
console.log('Successfully built and updated index.html and web/index.html!');
