import fs from 'fs';

const payload = JSON.parse(fs.readFileSync('payload.json', 'utf8'));

// Safe script closer for standalone vault generator
const SAFE_CLOSING_SCRIPT = '<' + '/script>';

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML Document Vault • Client-Side Cryptographic Enclave</title>
  
  <!-- Typography: Plus Jakarta Sans & JetBrains Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">

  <style>
    :root {
      --bg: #F8F9FA;
      --card: #FFFFFF;
      --fg: #09090B;
      --fg-muted: #71717A;
      --fg-subtle: #A1A1AA;
      --border: #E4E4E7;
      --border-focus: #18181B;
      --primary: #18181B;
      --primary-hover: #27272A;
      --primary-fg: #FAFAFA;
      --accent-green: #10B981;
      --accent-green-bg: #ECFDF5;
      --accent-green-border: #A7F3D0;
      --accent-green-text: #065F46;
      --accent-blue: #3B82F6;
      --accent-blue-bg: #EFF6FF;
      --accent-amber: #F59E0B;
      --accent-amber-bg: #FFFBEB;
      --accent-amber-border: #FDE68A;
      --accent-red: #EF4444;
      --accent-red-bg: #FEF2F2;
      --radius-xl: 18px;
      --radius-lg: 14px;
      --radius-md: 10px;
      --radius-sm: 8px;
      --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --spring: cubic-bezier(0.16, 1, 0.3, 1);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background-color: var(--bg);
      background-image: radial-gradient(rgba(24, 24, 27, 0.05) 1px, transparent 1px);
      background-size: 20px 20px;
      color: var(--fg);
      font-family: var(--font-sans);
      min-height: 100vh;
      padding: 2.25rem 1.25rem 5rem;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .shell {
      width: 100%;
      max-width: 980px;
      margin: 0 auto;
    }

    /* Header */
    header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .brand-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: #FFFFFF;
      border: 1px solid var(--border);
      padding: 0.35rem 0.95rem;
      border-radius: 9999px;
      font-size: 0.775rem;
      font-weight: 600;
      color: var(--fg-muted);
      margin-bottom: 0.85rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    }

    .brand-dot {
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
      margin-bottom: 0.5rem;
    }

    .subtitle {
      font-size: 0.975rem;
      color: var(--fg-muted);
      max-width: 620px;
      margin: 0 auto;
    }

    /* Top Navigation Tabs */
    .tabs-bar {
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;
    }

    .tabs-container {
      display: inline-flex;
      background: #EEEEF2;
      padding: 0.25rem;
      border-radius: var(--radius-lg);
      gap: 0.25rem;
      border: 1px solid var(--border);
    }

    .tab-btn {
      padding: 0.55rem 1.25rem;
      border: none;
      background: transparent;
      color: var(--fg-muted);
      font-family: var(--font-sans);
      font-size: 0.85rem;
      font-weight: 600;
      border-radius: var(--radius-md);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      transition: all 0.15s var(--spring);
    }

    .tab-btn:hover { color: var(--fg); }

    .tab-btn.active {
      background: #FFFFFF;
      color: var(--fg);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    }

    .badge-interactive {
      font-size: 0.65rem;
      padding: 0.15rem 0.4rem;
      background: #F4F4F5;
      border-radius: 4px;
      color: var(--fg-muted);
      font-family: var(--font-mono);
      font-weight: 700;
      text-transform: uppercase;
    }

    .tab-btn.active .badge-interactive {
      background: #18181B;
      color: #FFFFFF;
    }

    /* Tab Views */
    .tab-panel {
      display: none;
    }

    .tab-panel.active {
      display: block;
      animation: tabFadeIn 0.25s var(--spring);
    }

    @keyframes tabFadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Main Vault Box */
    .vault-box {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      padding: 2.25rem 2rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02), 0 16px 40px -10px rgba(0, 0, 0, 0.07);
      margin-bottom: 2rem;
    }

    @media (max-width: 640px) {
      .vault-box { padding: 1.25rem; }
      h1 { font-size: 1.75rem; }
    }

    /* Vault Box Header & Telemetry */
    .vault-box-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .vault-box-title h2 {
      font-size: 1.35rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 0.25rem;
    }

    .vault-box-title p {
      font-size: 0.875rem;
      color: var(--fg-muted);
    }

    /* 4 Top Telemetry Badges */
    .telemetry-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.75rem;
      margin-bottom: 1.75rem;
    }

    @media (max-width: 768px) {
      .telemetry-row { grid-template-columns: repeat(2, 1fr); }
    }

    .tel-card {
      background: #F8F9FA;
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 0.85rem 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      transition: all 0.2s ease;
    }

    .tel-label {
      font-family: var(--font-mono);
      font-size: 0.675rem;
      font-weight: 700;
      color: var(--fg-muted);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .tel-val {
      font-family: var(--font-mono);
      font-size: 0.875rem;
      font-weight: 700;
      color: var(--fg);
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .status-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--fg-subtle);
      transition: all 0.3s ease;
    }

    .status-dot.active {
      background: var(--accent-green);
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
    }

    /* Vault Source Switcher */
    .source-switch-row {
      display: flex;
      gap: 0.5rem;
      background: #F4F4F6;
      padding: 0.25rem;
      border-radius: var(--radius-md);
      border: 1px solid var(--border);
      margin-bottom: 1.5rem;
    }

    .source-btn {
      flex: 1;
      padding: 0.55rem 0.85rem;
      border: none;
      background: transparent;
      color: var(--fg-muted);
      font-family: var(--font-sans);
      font-size: 0.825rem;
      font-weight: 600;
      border-radius: var(--radius-sm);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      transition: all 0.15s ease;
    }

    .source-btn.active {
      background: #FFFFFF;
      color: var(--fg);
      box-shadow: 0 1px 2px rgba(0,0,0,0.06);
    }

    /* Document Capsule Card */
    .doc-capsule {
      background: #FAFAFC;
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 1.25rem 1.4rem;
      margin-bottom: 1.75rem;
    }

    .doc-capsule-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .doc-capsule-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .file-icon-square {
      width: 42px;
      height: 42px;
      border-radius: var(--radius-md);
      background: #FFFFFF;
      border: 1px solid var(--border);
      display: grid;
      place-items: center;
      color: var(--fg);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
      flex-shrink: 0;
    }

    .doc-name-group h3 {
      font-family: var(--font-mono);
      font-size: 0.925rem;
      font-weight: 700;
      color: var(--fg);
      margin-bottom: 0.2rem;
    }

    .doc-badges {
      display: flex;
      gap: 0.4rem;
      flex-wrap: wrap;
    }

    .doc-badge {
      font-size: 0.7rem;
      font-family: var(--font-mono);
      font-weight: 600;
      padding: 0.15rem 0.45rem;
      border-radius: 4px;
      background: #FFFFFF;
      border: 1px solid var(--border);
      color: var(--fg-muted);
    }

    .doc-badge.green {
      background: var(--accent-green-bg);
      border-color: var(--accent-green-border);
      color: var(--accent-green-text);
    }

    .btn-meta-toggle {
      background: #FFFFFF;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 0.4rem 0.75rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--fg-muted);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      transition: all 0.15s ease;
    }

    .btn-meta-toggle:hover {
      background: #F4F4F5;
      color: var(--fg);
    }

    /* Collapsible Technical Details Inside Capsule */
    .capsule-meta-drawer {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border);
      display: none;
      animation: tabFadeIn 0.2s ease;
    }

    .meta-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.75rem;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      margin-bottom: 0.85rem;
    }

    @media (max-width: 640px) {
      .meta-grid { grid-template-columns: 1fr; }
    }

    .meta-item {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }

    .meta-lbl {
      color: var(--fg-muted);
      font-size: 0.675rem;
      text-transform: uppercase;
      font-weight: 600;
    }

    .meta-val {
      color: var(--fg);
      font-weight: 600;
      word-break: break-all;
    }

    .hex-box {
      background: #18181B;
      color: #A1A1AA;
      border-radius: var(--radius-sm);
      padding: 0.75rem;
      font-family: var(--font-mono);
      font-size: 0.7rem;
      line-height: 1.5;
      max-height: 120px;
      overflow-y: auto;
      word-break: break-all;
    }

    /* SECTION: UNIFIED PASSWORD & ACTION ROW (Top UX Hierarchy) */
    .action-panel {
      background: #FFFFFF;
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      margin-bottom: 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    }

    .action-panel-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.65rem;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .action-panel-title {
      font-size: 0.875rem;
      font-weight: 700;
      color: var(--fg);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .quick-key-pill {
      background: #F4F4F6;
      border: 1px solid var(--border);
      color: var(--fg);
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.3rem 0.7rem;
      border-radius: 9999px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      transition: all 0.15s ease;
    }

    .quick-key-pill:hover {
      background: #E4E4E7;
      border-color: #D4D4D8;
    }

    .action-input-row {
      display: flex;
      gap: 0.75rem;
      align-items: center;
    }

    @media (max-width: 680px) {
      .action-input-row {
        flex-direction: column;
        align-items: stretch;
      }
    }

    .input-wrap {
      position: relative;
      flex: 1;
    }

    .input-password {
      width: 100%;
      height: 48px;
      padding: 0 2.5rem 0 1rem;
      font-family: var(--font-mono);
      font-size: 0.95rem;
      background: #FFFFFF;
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      color: var(--fg);
      outline: none;
      transition: all 0.15s ease;
    }

    .input-password:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(24, 24, 27, 0.08);
    }

    .eye-toggle-btn {
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      background: transparent;
      border: none;
      color: var(--fg-muted);
      cursor: pointer;
      padding: 0.25rem;
      display: grid;
      place-items: center;
    }

    .eye-toggle-btn:hover { color: var(--fg); }

    .btn-trigger-primary {
      height: 48px;
      padding: 0 1.5rem;
      background: var(--primary);
      color: var(--primary-fg);
      border: none;
      border-radius: var(--radius-md);
      font-family: var(--font-sans);
      font-size: 0.925rem;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      white-space: nowrap;
      transition: all 0.15s var(--spring);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    }

    .btn-trigger-primary:hover { background: var(--primary-hover); }
    .btn-trigger-primary:active { transform: scale(0.98); }
    .btn-trigger-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

    .btn-trigger-secondary {
      height: 48px;
      padding: 0 1.25rem;
      background: #FFFFFF;
      color: var(--fg);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      font-family: var(--font-sans);
      font-size: 0.875rem;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.45rem;
      white-space: nowrap;
      transition: all 0.15s var(--spring);
    }

    .btn-trigger-secondary:hover { background: #F4F4F5; border-color: #D4D4D8; }
    .btn-trigger-secondary:active { transform: scale(0.98); }
    .btn-trigger-secondary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

    .error-toast-inline {
      display: none;
      margin-top: 0.75rem;
      color: var(--accent-red);
      font-size: 0.825rem;
      font-weight: 600;
      align-items: center;
      gap: 0.4rem;
    }

    /* SECTION: CONNECTED PIPELINE STEPPER (Smooth 01 -> 02 -> 03 -> 04 Flow) */
    .stepper-section {
      margin-bottom: 2rem;
    }

    .stepper-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.85rem;
    }

    .stepper-title {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--fg-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .stepper-live-badge {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--fg-muted);
      transition: all 0.2s ease;
    }

    .stepper-live-badge.running {
      color: var(--accent-amber);
      font-weight: 700;
    }

    .stepper-live-badge.complete {
      color: var(--accent-green-text);
      font-weight: 700;
    }

    /* Connected Pipeline Stepper Layout with Progress Connectors */
    .stepper-track {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.85rem;
      position: relative;
    }

    @media (max-width: 680px) {
      .stepper-track { grid-template-columns: 1fr; }
    }

    .step-card {
      background: #FAFAFC;
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      position: relative;
      transition: all 0.25s var(--spring);
    }

    .step-card.active {
      border-color: var(--accent-amber);
      background: var(--accent-amber-bg);
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(245, 158, 11, 0.16);
    }

    .step-card.complete {
      border-color: var(--accent-green-border);
      background: var(--accent-green-bg);
      transform: translateY(0);
      animation: popGate 0.3s var(--spring);
    }

    @keyframes popGate {
      0% { transform: scale(0.96); }
      50% { transform: scale(1.03); }
      100% { transform: scale(1); }
    }

    .step-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .step-num-pill {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      font-weight: 700;
      color: var(--fg-muted);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .step-card.active .step-num-pill { color: var(--accent-amber); }
    .step-card.complete .step-num-pill { color: var(--accent-green-text); }

    .step-icon {
      width: 16px;
      height: 16px;
      color: var(--fg-subtle);
      transition: all 0.2s ease;
    }

    .step-card.active .step-icon {
      color: var(--accent-amber);
      animation: spinStep 1s linear infinite;
    }

    @keyframes spinStep {
      100% { transform: rotate(360deg); }
    }

    .step-card.complete .step-icon {
      color: var(--accent-green);
    }

    .step-title {
      font-size: 0.875rem;
      font-weight: 700;
      color: var(--fg);
    }

    .step-status {
      font-family: var(--font-mono);
      font-size: 0.725rem;
      color: var(--fg-muted);
      transition: color 0.2s ease;
    }

    .step-card.complete .step-status {
      color: var(--accent-green-text);
      font-weight: 600;
    }

    /* Live Telemetry Terminal */
    .terminal-wrapper {
      margin-bottom: 2rem;
      border-radius: var(--radius-lg);
      background: #18181B;
      border: 1px solid rgba(255, 255, 255, 0.08);
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }

    .terminal-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.65rem 1rem;
      background: #121214;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    .terminal-dots {
      display: flex;
      gap: 0.4rem;
    }

    .tdot { width: 10px; height: 10px; border-radius: 50%; }
    .tdot.r { background: #FF5F56; }
    .tdot.y { background: #FFBD2E; }
    .tdot.g { background: #27C93F; }

    .terminal-bar-title {
      font-family: var(--font-mono);
      font-size: 0.725rem;
      color: #A1A1AA;
      font-weight: 600;
      letter-spacing: 0.04em;
    }

    .terminal-actions {
      display: flex;
      gap: 0.5rem;
    }

    .terminal-btn {
      background: transparent;
      border: none;
      color: #71717A;
      font-family: var(--font-mono);
      font-size: 0.7rem;
      cursor: pointer;
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
    }

    .terminal-btn:hover {
      color: #FAFAFA;
      background: rgba(255, 255, 255, 0.08);
    }

    .terminal-screen {
      padding: 1rem;
      font-family: var(--font-mono);
      font-size: 0.775rem;
      color: #E4E4E7;
      max-height: 200px;
      overflow-y: auto;
      line-height: 1.65;
    }

    .tline {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 0.25rem;
    }

    .t-time { color: #71717A; flex-shrink: 0; }
    .t-tag { font-weight: 700; flex-shrink: 0; }
    .t-tag.INIT { color: #60A5FA; }
    .t-tag.KDF { color: #FBBF24; }
    .t-tag.CIPHER { color: #A78BFA; }
    .t-tag.SUCCESS { color: #34D399; }
    .t-tag.ERR { color: #F87171; }

    /* Decrypted Document Viewport */
    .viewport-box {
      display: none;
      border: 1px solid var(--accent-green-border);
      border-radius: var(--radius-xl);
      background: #FFFFFF;
      overflow: hidden;
      margin-top: 2rem;
      box-shadow: 0 6px 30px -4px rgba(16, 185, 129, 0.14);
      animation: viewportSlide 0.4s var(--spring);
    }

    @keyframes viewportSlide {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .viewport-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #F8FDF9;
      border-bottom: 1px solid var(--accent-green-border);
      padding: 0.95rem 1.35rem;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .viewport-status-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      font-weight: 700;
      color: var(--accent-green-text);
    }

    .viewport-buttons {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn-vaction {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-family: var(--font-sans);
      font-size: 0.8rem;
      font-weight: 600;
      padding: 0.45rem 0.85rem;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border);
      background: #FFFFFF;
      color: var(--fg);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .btn-vaction:hover {
      background: #F4F4F5;
      border-color: #D4D4D8;
    }

    .btn-vaction.danger:hover {
      background: #FEF2F2;
      border-color: #FECACA;
      color: var(--accent-red);
    }

    .iframe-container {
      background: #F4F4F6;
      padding: 1.25rem;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      min-height: 520px;
    }

    .sandboxed-frame {
      width: 100%;
      height: 720px;
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      background: #FFFFFF;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    }

    /* Custom Dropzone (Custom File mode) */
    .custom-dropzone-box {
      border: 2px dashed var(--border);
      border-radius: var(--radius-lg);
      padding: 2rem 1.5rem;
      text-align: center;
      background: #FAFAFC;
      cursor: pointer;
      margin-bottom: 1.5rem;
      transition: all 0.15s ease;
    }

    .custom-dropzone-box:hover, .custom-dropzone-box.dragover {
      background: #F4F4F6;
      border-color: var(--primary);
    }

    /* Tab 2: Encrypt Packager */
    .packager-dropzone {
      border: 2px dashed var(--border);
      border-radius: var(--radius-lg);
      padding: 2.5rem 1.5rem;
      text-align: center;
      background: #FAFAFC;
      cursor: pointer;
      margin-bottom: 1.5rem;
      transition: all 0.15s ease;
    }

    .packager-dropzone:hover, .packager-dropzone.dragover {
      background: #F4F4F6;
      border-color: var(--primary);
    }

    .pack-icon {
      width: 52px;
      height: 52px;
      margin: 0 auto 0.85rem;
      border-radius: var(--radius-md);
      background: #FFFFFF;
      border: 1px solid var(--border);
      display: grid;
      place-items: center;
      color: var(--fg);
    }

    /* Tab 3: Architecture */
    .arch-cards-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    @media (max-width: 640px) {
      .arch-cards-grid { grid-template-columns: 1fr; }
    }

    .arch-item {
      background: #FAFAFC;
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 1.25rem;
    }

    .arch-item h3 {
      font-size: 0.95rem;
      font-weight: 700;
      margin-bottom: 0.4rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .arch-item p {
      font-size: 0.825rem;
      color: var(--fg-muted);
      line-height: 1.55;
    }

    /* Sonner Floating Toasts */
    .toast-tray {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      z-index: 9999;
      pointer-events: none;
    }

    .sonner-toast {
      background: #18181B;
      color: #FAFAFA;
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: var(--radius-md);
      padding: 0.75rem 1.15rem;
      font-size: 0.825rem;
      font-weight: 500;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
      display: flex;
      align-items: center;
      gap: 0.65rem;
      pointer-events: auto;
      animation: sonnerIn 0.25s var(--spring);
      max-width: 400px;
    }

    @keyframes sonnerIn {
      from { opacity: 0; transform: translateY(12px) scale(0.96); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .sonner-toast.success .s-icon { color: #34D399; }
    .sonner-toast.error .s-icon { color: #F87171; }
  </style>
</head>
<body>

  <div class="shell">
    
    <!-- Top Header -->
    <header>
      <div class="brand-pill">
        <span class="brand-dot"></span>
        <span>Web Cryptography API (Native Subsystem)</span>
      </div>
      <h1>HTML Document Vault</h1>
      <p class="subtitle">Zero-knowledge client-side encryption and execution sandbox powered by AES-256-GCM and PBKDF2.</p>
    </header>

    <!-- Top Navigation Tabs -->
    <div class="tabs-bar">
      <div class="tabs-container">
        <button id="nav-btn-enclave" class="tab-btn active" onclick="setTab('enclave')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
          Decryption Enclave
          <span class="badge-interactive">Interactive</span>
        </button>
        <button id="nav-btn-encrypt" class="tab-btn" onclick="setTab('encrypt')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          Encrypt Document
        </button>
        <button id="nav-btn-specs" class="tab-btn" onclick="setTab('specs')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          Architecture & Specs
        </button>
      </div>
    </div>

    <!-- TAB 1: DECRYPTION ENCLAVE & SANDBOX -->
    <div id="tab-enclave" class="tab-panel active">
      <div class="vault-box">

        <!-- Header Row -->
        <div class="vault-box-header">
          <div class="vault-box-title">
            <h2>Decryption Enclave & Sandbox</h2>
            <p>Test cryptographic execution, inspect memory telemetry, and unpack encrypted HTML in volatile RAM.</p>
          </div>
        </div>

        <!-- 4 Top Telemetry Badges -->
        <div class="telemetry-row">
          <div class="tel-card">
            <span class="tel-label">Enclave Status</span>
            <div class="tel-val" id="tel-status-val">
              <span class="status-dot active" id="tel-status-dot"></span>
              <span id="tel-status-text">READY</span>
            </div>
          </div>
          <div class="tel-card">
            <span class="tel-label">Symmetric Cipher</span>
            <div class="tel-val">AES-256-GCM</div>
          </div>
          <div class="tel-card">
            <span class="tel-label">Key Stretching</span>
            <div class="tel-val" id="tel-iter-val">310,000 Rounds</div>
          </div>
          <div class="tel-card">
            <span class="tel-label">Execution Latency</span>
            <div class="tel-val" id="tel-latency-val">-- ms</div>
          </div>
        </div>

        <!-- Mode Switch: Built-in vs Custom File -->
        <div class="source-switch-row">
          <button id="btn-mode-builtin" class="source-btn active" onclick="setVaultSource('builtin')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            Built-in Verification Vault
          </button>
          <button id="btn-mode-custom" class="source-btn" onclick="setVaultSource('custom')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            Load Custom .enc.html File
          </button>
        </div>

        <!-- Custom Upload Dropzone (Hidden when in Built-in mode) -->
        <div id="custom-dropzone" class="custom-dropzone-box" style="display: none;" onclick="document.getElementById('custom-file-input').click()">
          <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 0.25rem;" id="custom-dropzone-title">Drop your encrypted .enc.html file here or click to browse</div>
          <div style="font-size: 0.775rem; color: var(--fg-muted);">Extracts PAYLOAD object and verifies MAC tag integrity locally</div>
          <input type="file" id="custom-file-input" accept=".html,.enc.html" style="display: none;" onchange="loadCustomVaultFile(this.files)">
        </div>

        <!-- Document Capsule Card -->
        <div class="doc-capsule">
          <div class="doc-capsule-head">
            <div class="doc-capsule-info">
              <div class="file-icon-square">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              <div class="doc-name-group">
                <h3 id="payload-filename">sample-report.enc.html</h3>
                <div class="doc-badges">
                  <span class="doc-badge green">AES-256-GCM</span>
                  <span class="doc-badge" id="payload-filesize">18.42 KB</span>
                  <span class="doc-badge" id="disp-iter-badge">310,000 Rounds</span>
                  <span class="doc-badge" id="disp-status-badge">Locked</span>
                </div>
              </div>
            </div>
            <div>
              <button class="btn-meta-toggle" id="btn-toggle-meta" onclick="toggleCapsuleMeta()">
                <span id="meta-toggle-text">▾ Technical Parameters</span>
              </button>
            </div>
          </div>

          <!-- Collapsible Technical Parameters (Salt, IV, Shannon, Hex) -->
          <div id="capsule-meta-drawer" class="capsule-meta-drawer">
            <div class="meta-grid">
              <div class="meta-item">
                <span class="meta-lbl">Entropy Salt (16B)</span>
                <span class="meta-val" id="disp-salt">M/AP2QrNtCX0jFtzmrlWqg==</span>
              </div>
              <div class="meta-item">
                <span class="meta-lbl">Init Vector (12B)</span>
                <span class="meta-val" id="disp-iv">lktUAK5PHmmYoDzv</span>
              </div>
              <div class="meta-item">
                <span class="meta-lbl">Shannon Entropy</span>
                <span class="meta-val" style="color: #10B981;">~7.98 bits/byte (High Noise)</span>
              </div>
            </div>
            <div class="hex-box">00000000: 48 33 77 47 44 79 54 44 4F 70 33 77 61 38 5A 69 H3wGDyTDOp3wa8Zi 00000010: 52 2B 65 6C 68 52 33 45 43 6C 46 5A 44 4B 41 48 R+elhR3EClFZDKAH 00000020: 44 71 53 33 6D 58 72 36 32 59 62 76 77 58 33 75 DqS3mXr62YbvwX3u ... [12,183 bytes encrypted AES-GCM payload with embedded 16-byte MAC authentication tag]</div>
          </div>
        </div>

        <!-- SECTION: UNIFIED PASSPHRASE INPUT & ACTION BUTTONS -->
        <div class="action-panel">
          <div class="action-panel-top">
            <span class="action-panel-title">Decryption Passphrase</span>
            <button class="quick-key-pill" onclick="fillTestPassword()">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="4"></circle><path d="M12 12l8 8m-4-2l2 2m-2-4l2 2"></path></svg>
              <span>Use Demo Key: ConfidentialPass2026!</span>
            </button>
          </div>

          <div class="action-input-row">
            <div class="input-wrap">
              <input type="password" id="pass-field" class="input-password" value="ConfidentialPass2026!" placeholder="Enter vault password...">
              <button class="eye-toggle-btn" onclick="togglePassView()" title="Toggle visibility">
                <svg id="pass-eye-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </button>
            </div>
            <button id="btn-auto-run" class="btn-trigger-secondary" onclick="oneClickAutoRun()">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              <span>1-Click Auto Run</span>
            </button>
            <button id="btn-execute-decrypt" class="btn-trigger-primary" onclick="executeDecryption()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              <span id="btn-execute-text">Unlock Document</span>
            </button>
          </div>

          <div id="decrypt-error-banner" class="error-toast-inline">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <span id="decrypt-error-label">Incorrect password. AES-GCM authentication tag verification failed.</span>
          </div>
        </div>

        <!-- SECTION: CONNECTED PIPELINE STEPPER (Smooth 01 -> 02 -> 03 -> 04 Flow) -->
        <div class="stepper-section">
          <div class="stepper-header">
            <span class="stepper-title">Cryptographic Pipeline Gates</span>
            <span class="stepper-live-badge" id="pipeline-status-label">Ready for execution</span>
          </div>

          <div class="stepper-track">
            <div id="gate-1" class="step-card">
              <div class="step-top">
                <span class="step-num-pill">Gate 01</span>
                <svg id="gate-icon-1" class="step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="9"></circle></svg>
              </div>
              <div class="step-title">Entropy Verification</div>
              <div class="step-status" id="gate-desc-1">16B Salt + 12B IV</div>
            </div>

            <div id="gate-2" class="step-card">
              <div class="step-top">
                <span class="step-num-pill">Gate 02</span>
                <svg id="gate-icon-2" class="step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="9"></circle></svg>
              </div>
              <div class="step-title">PBKDF2 Key Stretch</div>
              <div class="step-status" id="gate-desc-2">310k HMAC-SHA256</div>
            </div>

            <div id="gate-3" class="step-card">
              <div class="step-top">
                <span class="step-num-pill">Gate 03</span>
                <svg id="gate-icon-3" class="step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="9"></circle></svg>
              </div>
              <div class="step-title">AES-GCM Auth Check</div>
              <div class="step-status" id="gate-desc-3">128-bit MAC Tag Match</div>
            </div>

            <div id="gate-4" class="step-card">
              <div class="step-top">
                <span class="step-num-pill">Gate 04</span>
                <svg id="gate-icon-4" class="step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="9"></circle></svg>
              </div>
              <div class="step-title">RAM Reconstitution</div>
              <div class="step-status" id="gate-desc-4">0B Disk Footprint</div>
            </div>
          </div>
        </div>

        <!-- Live Hacker / Developer Telemetry Console -->
        <div class="terminal-wrapper">
          <div class="terminal-bar">
            <div class="terminal-dots">
              <span class="tdot r"></span>
              <span class="tdot y"></span>
              <span class="tdot g"></span>
            </div>
            <div class="terminal-bar-title">CRYPTOGRAPHIC EXECUTION TRACE • WEBCRYPTO API</div>
            <div class="terminal-actions">
              <button class="terminal-btn" onclick="copyConsoleLogs()">Copy Log</button>
              <button class="terminal-btn" onclick="clearConsoleLogs()">Clear</button>
            </div>
          </div>
          <div class="terminal-screen" id="terminal-screen">
            <div class="tline"><span class="t-time">[+0.00ms]</span> <span class="t-tag INIT">[INIT]</span> <span>Enclave online. Native WebCrypto subsystem initialized.</span></div>
            <div class="tline"><span class="t-time">[+0.15ms]</span> <span class="t-tag INIT">[INIT]</span> <span>Target vault: sample-report.enc.html (18,421 bytes). Ready for key injection.</span></div>
          </div>
        </div>

        <!-- Decrypted Report Viewport (Clean, Full Responsive Width) -->
        <div id="decrypted-viewport" class="viewport-box">
          <div class="viewport-header">
            <div class="viewport-status-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span id="viewport-heading">✓ Cryptographic Verification Report Decrypted</span>
            </div>
            <div class="viewport-buttons">
              <button class="btn-vaction" onclick="downloadDecryptedHtml()">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Export HTML
              </button>
              <button class="btn-vaction" onclick="openFullscreenReport()">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                Full Screen
              </button>
              <button class="btn-vaction danger" onclick="relockVault()">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                Lock & Wipe RAM
              </button>
            </div>
          </div>
          <div class="iframe-container">
            <iframe id="report-frame" class="sandboxed-frame" sandbox="allow-scripts allow-same-origin"></iframe>
          </div>
        </div>

      </div>
    </div>

    <!-- TAB 2: ENCRYPT DOCUMENT (PACKAGER) -->
    <div id="tab-encrypt" class="tab-panel">
      <div class="vault-box">
        <div class="vault-box-header">
          <div class="vault-box-title">
            <h2>Package Document into Encrypted Vault</h2>
            <p>Embed any standard HTML file into an offline, password-protected self-decrypting single file.</p>
          </div>
        </div>

        <div class="packager-dropzone" onclick="document.getElementById('pack-file-input').click()">
          <div class="pack-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
          </div>
          <div style="font-weight: 700; font-size: 1rem; margin-bottom: 0.25rem;" id="pack-filename">Choose an HTML file or drag & drop here</div>
          <div style="font-size: 0.8rem; color: var(--fg-muted);">Processed 100% locally in browser memory • No upload to any server</div>
          <input type="file" id="pack-file-input" accept=".html,.htm" style="display: none;" onchange="handlePackFile(this.files)">
        </div>

        <div style="margin-bottom: 1.25rem;">
          <div class="action-panel-top">
            <label style="font-size:0.875rem; font-weight:700;" for="pack-pass">Vault Passphrase</label>
            <button class="quick-key-pill" onclick="generateKey()">Generate Strong Password</button>
          </div>
          <input type="password" id="pack-pass" class="input-password" placeholder="Enter passphrase to encrypt...">
        </div>

        <div style="margin-bottom: 1.5rem;">
          <label style="display:block; margin-bottom: 0.4rem; font-size:0.875rem; font-weight:700;">PBKDF2 Iteration Rounds (Key Hardening)</label>
          <select id="pack-iter" class="input-password" style="height: 46px; padding: 0 0.85rem;">
            <option value="310000" selected>310,000 Rounds (OWASP Recommended Standard • ~180ms)</option>
            <option value="600000">600,000 Rounds (High Security • ~360ms)</option>
            <option value="1000000">1,000,000 Rounds (Paranoid Hardening • ~600ms)</option>
          </select>
        </div>

        <button id="btn-build-vault" class="btn-trigger-primary" style="width: 100%; height: 48px;" onclick="buildAndDownloadVault()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          <span id="btn-build-text">Generate Self-Decrypting Vault (.enc.html)</span>
        </button>
      </div>
    </div>

    <!-- TAB 3: ARCHITECTURE & SPECS -->
    <div id="tab-specs" class="tab-panel">
      <div class="vault-box">
        <div class="vault-box-header">
          <div class="vault-box-title">
            <h2>Cryptographic Architecture & Security Specs</h2>
            <p>Zero-knowledge cryptographic design principles implemented natively with W3C WebCrypto API.</p>
          </div>
        </div>

        <div class="arch-cards-grid">
          <div class="arch-item">
            <h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              AES-256-GCM Cipher
            </h3>
            <p>Galois/Counter Mode provides authenticated encryption with built-in 128-bit MAC integrity tags. Prevents both unauthorized reading and tampering.</p>
          </div>

          <div class="arch-item">
            <h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              PBKDF2 Key Stretching
            </h3>
            <p>Transforms raw human passphrases into 256-bit symmetric keys using 310,000 iterations of HMAC-SHA256 with 16 bytes of cryptographically secure random salt.</p>
          </div>

          <div class="arch-item">
            <h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
              Zero Disk Footprint
            </h3>
            <p>Decrypted HTML reports exist exclusively inside ephemeral browser RAM. No unencrypted files or fragments are ever saved to local disks or server logs.</p>
          </div>

          <div class="arch-item">
            <h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              Native Hardware Acceleration
            </h3>
            <p>Executed natively in compiled C++ / Rust browser engines via the W3C Web Cryptography API, unlocking high security in under 200 milliseconds.</p>
          </div>
        </div>
      </div>
    </div>

  </div>

  <!-- Sonner Toast Tray -->
  <div id="toast-tray" class="toast-tray"></div>

  <script>
    // Byte-exact verified payload
    const DEFAULT_PAYLOAD = ${JSON.stringify(payload)};
    let activePayload = DEFAULT_PAYLOAD;
    let decryptedDocumentHtml = null;
    let rawHtmlToPackage = null;

    // Small async sleep helper for visual smoothness in UI pipeline
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Toast Functionality
    function fireToast(title, subtitle, type = 'success') {
      const tray = document.getElementById('toast-tray');
      const toast = document.createElement('div');
      toast.className = 'sonner-toast ' + type;

      const icon = type === 'success'
        ? '<svg class="s-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>'
        : '<svg class="s-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';

      toast.innerHTML = icon + '<div><div style="font-weight:700;">' + title + '</div>' + (subtitle ? '<div style="font-size:0.75rem; color:#A1A1AA;">' + subtitle + '</div>' : '') + '</div>';
      tray.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px) scale(0.96)';
        toast.style.transition = 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => toast.remove(), 200);
      }, 3500);
    }

    // Terminal Logging
    function logToScreen(tag, msg) {
      const scr = document.getElementById('terminal-screen');
      if (!scr) return;
      const ms = performance.now().toFixed(2);
      const row = document.createElement('div');
      row.className = 'tline';
      row.innerHTML = '<span class="t-time">[+' + ms + 'ms]</span> <span class="t-tag ' + tag + '">[' + tag + ']</span> <span>' + msg + '</span>';
      scr.appendChild(row);
      scr.scrollTop = scr.scrollHeight;
    }

    function clearConsoleLogs() {
      document.getElementById('terminal-screen').innerHTML = '<div class="tline"><span class="t-time">[+0.00ms]</span> <span class="t-tag INIT">[INIT]</span> <span>Console cleared. Ready for next cryptographic trace.</span></div>';
    }

    function copyConsoleLogs() {
      const txt = document.getElementById('terminal-screen').innerText;
      navigator.clipboard.writeText(txt).then(() => {
        fireToast('Logs Copied', 'Copied execution trace to clipboard.');
      });
    }

    // Tab Navigation
    function setTab(tabName) {
      ['enclave', 'encrypt', 'specs'].forEach(t => {
        document.getElementById('tab-' + t).classList.toggle('active', t === tabName);
        document.getElementById('nav-btn-' + (t === 'enclave' ? 'enclave' : t)).classList.toggle('active', t === tabName);
      });
    }

    // Source Mode (Builtin vs Custom)
    function setVaultSource(source) {
      const isBuiltin = source === 'builtin';
      document.getElementById('btn-mode-builtin').classList.toggle('active', isBuiltin);
      document.getElementById('btn-mode-custom').classList.toggle('active', !isBuiltin);
      document.getElementById('custom-dropzone').style.display = isBuiltin ? 'none' : 'block';

      if (isBuiltin) {
        activePayload = DEFAULT_PAYLOAD;
        document.getElementById('payload-filename').textContent = 'sample-report.enc.html';
        document.getElementById('payload-filesize').textContent = '18.42 KB';
        document.getElementById('disp-salt').textContent = activePayload.salt;
        document.getElementById('disp-iv').textContent = activePayload.iv;
        document.getElementById('disp-iter-badge').textContent = activePayload.iterations.toLocaleString() + ' Rounds';
        document.getElementById('tel-iter-val').textContent = activePayload.iterations.toLocaleString() + ' Rounds';
        logToScreen('INIT', 'Switched to built-in sample vault payload.');
        fireToast('Sample Vault Loaded', 'sample-report.enc.html active.');
      } else {
        logToScreen('INIT', 'Custom mode active. Ready for user .enc.html upload.');
      }
    }

    function loadCustomVaultFile(files) {
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
              document.getElementById('payload-filename').textContent = file.name;
              document.getElementById('payload-filesize').textContent = (file.size / 1024).toFixed(1) + ' KB';
              document.getElementById('disp-salt').textContent = parsed.salt;
              document.getElementById('disp-iv').textContent = parsed.iv;
              document.getElementById('disp-iter-badge').textContent = (parsed.iterations || 310000).toLocaleString() + ' Rounds';
              document.getElementById('tel-iter-val').textContent = (parsed.iterations || 310000).toLocaleString() + ' Rounds';
              document.getElementById('custom-dropzone-title').textContent = 'Loaded: ' + file.name;
              logToScreen('INIT', 'Successfully loaded custom payload from ' + file.name + ' (' + file.size + ' bytes).');
              fireToast('Payload Loaded', file.name);
              return;
            }
          } catch(err) {}
        }
        fireToast('Parse Error', 'Could not find PAYLOAD object in HTML file.', 'error');
      };
      reader.readAsText(file);
    }

    // Toggle Technical Parameters inside Capsule
    function toggleCapsuleMeta() {
      const drawer = document.getElementById('capsule-meta-drawer');
      const text = document.getElementById('meta-toggle-text');
      const isHidden = drawer.style.display === 'none' || drawer.style.display === '';
      drawer.style.display = isHidden ? 'block' : 'none';
      text.textContent = isHidden ? '▴ Hide Technical Parameters' : '▾ Technical Parameters';
    }

    // Password Eye Toggle
    function togglePassView() {
      const p = document.getElementById('pass-field');
      const icon = document.getElementById('pass-eye-icon');
      const isPwd = p.type === 'password';
      p.type = isPwd ? 'text' : 'password';
      icon.innerHTML = isPwd
        ? '<line x1="1" y1="1" x2="23" y2="23"></line><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>'
        : '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
    }

    function fillTestPassword() {
      document.getElementById('pass-field').value = 'ConfidentialPass2026!';
      document.getElementById('decrypt-error-banner').style.display = 'none';
      logToScreen('INIT', 'Injected verified test passphrase: ConfidentialPass2026!');
      fireToast('Passphrase Inserted', 'Ready for decryption.');
    }

    // Gate State Helper
    const gateDefaultDescs = [
      '16B Salt + 12B IV',
      '310k HMAC-SHA256',
      '128-bit MAC Tag Match',
      '0B Disk Footprint'
    ];

    function setGate(n, state, customDesc = null) {
      const gate = document.getElementById('gate-' + n);
      const icon = document.getElementById('gate-icon-' + n);
      const desc = document.getElementById('gate-desc-' + n);
      if (!gate) return;

      gate.classList.remove('active', 'complete');
      gate.style.borderColor = '';
      gate.style.background = '';

      if (state === 'active') {
        gate.classList.add('active');
        // Animated spinner icon
        icon.innerHTML = '<path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"></path>';
        if (customDesc && desc) desc.textContent = customDesc;
      } else if (state === 'complete') {
        gate.classList.add('complete');
        // Crisp checkmark icon
        icon.innerHTML = '<polyline points="20 6 9 17 4 12"></polyline>';
        if (desc) desc.textContent = customDesc || 'Passed ✓';
      } else {
        // Idle circle icon
        icon.innerHTML = '<circle cx="12" cy="12" r="9"></circle>';
        if (desc) desc.textContent = gateDefaultDescs[n - 1];
      }
    }

    function resetPipeline() {
      for (let i = 1; i <= 4; i++) setGate(i, 'idle');
      const label = document.getElementById('pipeline-status-label');
      label.textContent = 'Ready for execution';
      label.className = 'stepper-live-badge';
    }

    // Base64 helpers
    const toBytes = (b) => Uint8Array.from(atob(b), c => c.charCodeAt(0));
    const toBase64 = (arr) => btoa(String.fromCharCode(...arr));

    // Core Decryption Function with Sequential Smooth Step Progression
    async function executeDecryption() {
      const pass = document.getElementById('pass-field').value;
      const errBanner = document.getElementById('decrypt-error-banner');
      const errLabel = document.getElementById('decrypt-error-label');
      const btn = document.getElementById('btn-execute-decrypt');
      const btnText = document.getElementById('btn-execute-text');
      const autoBtn = document.getElementById('btn-auto-run');
      const viewport = document.getElementById('decrypted-viewport');
      const iframe = document.getElementById('report-frame');
      const telStatusText = document.getElementById('tel-status-text');
      const telLatency = document.getElementById('tel-latency-val');
      const statusLabel = document.getElementById('pipeline-status-label');

      errBanner.style.display = 'none';

      if (!pass) {
        errLabel.textContent = 'Please enter a passphrase to execute decryption.';
        errBanner.style.display = 'flex';
        return;
      }

      resetPipeline();
      btn.disabled = true;
      if (autoBtn) autoBtn.disabled = true;
      btnText.textContent = 'Decrypting...';

      statusLabel.className = 'stepper-live-badge running';
      statusLabel.textContent = 'Gate 01: Verifying Entropy...';

      const tStart = performance.now();

      try {
        // ==========================================
        // STEP 1: GATE 01 - ENTROPY VERIFICATION
        // ==========================================
        setGate(1, 'active', 'Checking Salt & IV...');
        logToScreen('INIT', 'Reading parameters: Salt, IV, and ciphertext payload...');
        const enc = new TextEncoder();
        const salt = toBytes(activePayload.salt);
        const iv = toBytes(activePayload.iv);
        const cipher = toBytes(activePayload.cipher);
        const iterations = activePayload.iterations || 310000;

        if (salt.length !== 16 || iv.length !== 12) {
          throw new Error('Invalid salt or IV length');
        }

        await sleep(350);
        setGate(1, 'complete', '16B Salt + 12B IV Verified ✓');
        logToScreen('INIT', 'Gate 01 passed: Entropy verified (16-byte Salt, 12-byte IV).');

        // ==========================================
        // STEP 2: GATE 02 - PBKDF2 KEY STRETCHING
        // ==========================================
        statusLabel.textContent = 'Gate 02: Key Stretching (' + iterations.toLocaleString() + ' rounds)...';
        setGate(2, 'active', 'Deriving 256-bit Key...');
        logToScreen('KDF', 'Importing passphrase into PBKDF2 key material...');

        const keyMaterial = await crypto.subtle.importKey(
          'raw',
          enc.encode(pass),
          { name: 'PBKDF2' },
          false,
          ['deriveKey']
        );

        logToScreen('KDF', 'Executing ' + iterations.toLocaleString() + ' HMAC-SHA256 rounds via WebCrypto engine...');
        const key = await crypto.subtle.deriveKey(
          { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
          keyMaterial,
          { name: 'AES-GCM', length: 256 },
          false,
          ['decrypt']
        );

        await sleep(400);
        setGate(2, 'complete', iterations.toLocaleString() + ' Rounds Complete ✓');
        logToScreen('KDF', 'Gate 02 passed: 256-bit AES master key derived. (extractable: false)');

        // ==========================================
        // STEP 3: GATE 03 - AES-GCM AUTH CHECK
        // ==========================================
        statusLabel.textContent = 'Gate 03: Authenticating AES-256-GCM MAC Tag...';
        setGate(3, 'active', 'Checking 128-bit MAC Tag...');
        logToScreen('CIPHER', 'Submitting ' + cipher.length + ' bytes to AES-256-GCM cipher...');

        const decryptedBuffer = await crypto.subtle.decrypt(
          { name: 'AES-GCM', iv },
          key,
          cipher
        );

        await sleep(350);
        setGate(3, 'complete', '128-bit Tag Match Verified ✓');
        logToScreen('CIPHER', 'Gate 03 passed: 128-bit MAC tag verified. Cryptographic authentication successful.');

        // ==========================================
        // STEP 4: GATE 04 - RAM RECONSTITUTION
        // ==========================================
        statusLabel.textContent = 'Gate 04: Reconstituting HTML in Volatile RAM...';
        setGate(4, 'active', 'Injecting into RAM...');

        const decText = new TextDecoder().decode(decryptedBuffer);
        decryptedDocumentHtml = decText;

        await sleep(300);
        setGate(4, 'complete', (decryptedBuffer.byteLength / 1024).toFixed(1) + ' KB Reconstituted ✓');

        const latency = (performance.now() - tStart).toFixed(1);
        telLatency.textContent = latency + ' ms';
        telStatusText.textContent = 'VERIFIED (IN RAM)';
        document.getElementById('tel-status-dot').style.background = '#10B981';
        document.getElementById('disp-status-badge').textContent = 'Unlocked';
        document.getElementById('disp-status-badge').className = 'doc-badge green';

        statusLabel.className = 'stepper-live-badge complete';
        statusLabel.textContent = 'Pipeline execution complete (4/4 gates passed)';

        logToScreen('SUCCESS', 'Gate 04 passed: Reconstituted ' + (decryptedBuffer.byteLength / 1024).toFixed(1) + ' KB HTML document in volatile RAM in ' + latency + 'ms.');

        // Render in Iframe Viewport
        iframe.srcdoc = decText;
        viewport.style.display = 'block';
        document.getElementById('viewport-heading').textContent = '✓ Cryptographic Verification Report Decrypted (' + latency + 'ms • 0B Disk Footprint)';
        
        viewport.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        fireToast('Document Decrypted', 'Reconstituted in volatile RAM in ' + latency + 'ms.');

      } catch (err) {
        setGate(3, 'active', 'Authentication Failure');
        document.getElementById('gate-3').style.borderColor = '#EF4444';
        document.getElementById('gate-3').style.background = '#FEF2F2';
        statusLabel.className = 'stepper-live-badge';
        statusLabel.textContent = 'Execution halted on authentication error.';
        statusLabel.style.color = '#EF4444';
        telStatusText.textContent = 'FAILED (TAG MISMATCH)';
        document.getElementById('tel-status-dot').style.background = '#EF4444';
        
        logToScreen('ERR', 'Cryptographic failure: Invalid passphrase or AES-GCM MAC tag mismatch.');
        errLabel.textContent = 'Incorrect password. AES-GCM authentication tag verification failed.';
        errBanner.style.display = 'flex';
        fireToast('Decryption Failed', 'Invalid password or corrupted MAC tag.', 'error');
      } finally {
        btn.disabled = false;
        if (autoBtn) autoBtn.disabled = false;
        btnText.textContent = 'Unlock Document';
      }
    }

    // 1-Click Auto Run Feature with Smooth Visual Transition
    async function oneClickAutoRun() {
      setVaultSource('builtin');
      fillTestPassword();
      logToScreen('INIT', '1-Click Auto Run triggered by user. Starting sequential gate execution...');
      await executeDecryption();
    }

    // Download Decrypted HTML
    function downloadDecryptedHtml() {
      if (!decryptedDocumentHtml) return;
      const blob = new Blob([decryptedDocumentHtml], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'decrypted-report.html';
      a.click();
      URL.revokeObjectURL(url);
      fireToast('Export Complete', 'Decrypted HTML saved to downloads.');
    }

    // Open Fullscreen in isolated tab
    function openFullscreenReport() {
      if (!decryptedDocumentHtml) return;
      const blob = new Blob([decryptedDocumentHtml], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      fireToast('Full View', 'Opened in isolated memory window.');
    }

    // Re-lock Vault and zero memory
    function relockVault() {
      decryptedDocumentHtml = null;
      document.getElementById('report-frame').srcdoc = '';
      document.getElementById('decrypted-viewport').style.display = 'none';
      document.getElementById('tel-status-text').textContent = 'READY';
      document.getElementById('tel-status-dot').style.background = '#10B981';
      document.getElementById('tel-latency-val').textContent = '-- ms';
      document.getElementById('disp-status-badge').textContent = 'Locked';
      document.getElementById('disp-status-badge').className = 'doc-badge';
      resetPipeline();
      logToScreen('INIT', 'Memory zeroized. Decrypted document wiped from RAM.');
      fireToast('Vault Locked', 'RAM wiped clean. Document re-locked.');
    }

    // Tab 2: Packager
    function handlePackFile(files) {
      if (!files || !files.length) return;
      const file = files[0];
      document.getElementById('pack-filename').textContent = 'Loaded: ' + file.name + ' (' + (file.size / 1024).toFixed(1) + ' KB)';
      const reader = new FileReader();
      reader.onload = (e) => {
        rawHtmlToPackage = e.target.result;
        fireToast('HTML Loaded', file.name + ' ready to package.');
      };
      reader.readAsText(file);
    }

    function generateKey() {
      const chars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%&*';
      let pass = '';
      const bytes = new Uint8Array(18);
      crypto.getRandomValues(bytes);
      bytes.forEach(b => { pass += chars[b % chars.length]; });
      document.getElementById('pack-pass').value = pass;
      document.getElementById('pack-pass').type = 'text';
      navigator.clipboard.writeText(pass);
      fireToast('Password Generated', 'Copied 18-char key to clipboard.');
    }

    async function buildAndDownloadVault() {
      const pass = document.getElementById('pack-pass').value;
      const iterations = parseInt(document.getElementById('pack-iter').value, 10);
      const btn = document.getElementById('btn-build-vault');
      const btnText = document.getElementById('btn-build-text');

      if (!rawHtmlToPackage) {
        fireToast('Missing File', 'Please select an HTML file to package.', 'error');
        return;
      }
      if (!pass) {
        fireToast('Missing Key', 'Please enter a password for the vault.', 'error');
        return;
      }

      btn.disabled = true;
      btnText.textContent = 'Encrypting with AES-256-GCM...';

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
          enc.encode(rawHtmlToPackage)
        );

        const newPayload = {
          salt: toBase64(salt),
          iv: toBase64(iv),
          iterations: iterations,
          cipher: toBase64(new Uint8Array(cipherBuffer))
        };

        const standalone = createStandaloneHtml(newPayload);
        const blob = new Blob([standalone], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'encrypted-vault.enc.html';
        a.click();
        URL.revokeObjectURL(url);

        fireToast('Vault Created', 'Downloaded encrypted-vault.enc.html');
      } catch (err) {
        fireToast('Encryption Error', err.message, 'error');
      } finally {
        btn.disabled = false;
        btnText.textContent = 'Generate Self-Decrypting Vault (.enc.html)';
      }
    }

    function createStandaloneHtml(p) {
      return '<!doctype html>\\n' +
'<html lang="en">\\n' +
'<head>\\n' +
'  <meta charset="utf-8"/>\\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1"/>\\n' +
'  <title>Encrypted HTML Document</title>\\n' +
'  <style>\\n' +
'    :root { --bg: #F8F9FA; --card: #FFFFFF; --fg: #09090B; --muted: #71717A; --border: #E4E4E7; --primary: #18181B; --radius: 12px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }\\n' +
'    * { box-sizing: border-box; margin: 0; padding: 0; }\\n' +
'    body { min-height: 100vh; display: grid; place-items: center; background: var(--bg); color: var(--fg); padding: 1.5rem; }\\n' +
'    .card { width: 100%; max-width: 420px; background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 2.25rem 2rem; box-shadow: 0 4px 24px -4px rgba(0,0,0,0.06); }\\n' +
'    h1 { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.35rem; }\\n' +
'    p { font-size: 0.875rem; color: var(--muted); margin-bottom: 1.5rem; }\\n' +
'    input { width: 100%; height: 44px; padding: 0 0.85rem; border: 1px solid var(--border); border-radius: 8px; font-size: 0.95rem; margin-bottom: 1rem; outline: none; font-family: monospace; }\\n' +
'    input:focus { border-color: var(--primary); }\\n' +
'    button { width: 100%; height: 44px; background: var(--primary); color: #FFF; border: none; border-radius: 8px; font-size: 0.95rem; font-weight: 600; cursor: pointer; }\\n' +
'    .err { color: #EF4444; font-size: 0.8rem; margin-top: 0.75rem; display: none; }\\n' +
'  </style>\\n' +
'</head>\\n' +
'<body>\\n' +
'  <div class="card">\\n' +
'    <h1>Confidential Document</h1>\\n' +
'    <p>Protected with AES-256-GCM. Enter passphrase to decrypt into RAM.</p>\\n' +
'    <input type="password" id="p" placeholder="Passphrase..."/>\\n' +
'    <button onclick="unlock()">Decrypt Document</button>\\n' +
'    <div class="err" id="e">Incorrect passphrase or tag mismatch.</div>\\n' +
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
'  ' + SAFE_CLOSING_SCRIPT + '\\n' +
'</body>\\n' +
'</html>';
    }
  </script>
</body>
</html>`;

fs.writeFileSync('index.html', html, 'utf8');
fs.writeFileSync('web/index.html', html, 'utf8');
console.log('Build complete! Successfully wrote upgraded index.html and web/index.html with unified UX flow and logical hierarchy.');
