import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MiniDNA from '../DNA/MiniDNA';
import { TRAIT_DEFINITIONS } from '../../utils/dnaEngine';
import { Download, Copy, Check, X, Share2, Sparkles } from 'lucide-react';

export default function ExportModal({
  isOpen,
  onClose,
  dnaProfile,
  onImportDNA
}) {
  const [activeTab, setActiveTab] = useState('card');
  const [copied, setCopied] = useState(false);
  const [importJson, setImportJson] = useState('');
  const [importError, setImportError] = useState(null);

  if (!isOpen || !dnaProfile) return null;

  // Formatted JSON export payload as per requirements
  const jsonPayload = {
    id: dnaProfile.id,
    name: dnaProfile.name,
    version: dnaProfile.version,
    classification: dnaProfile.classification,
    traits: {
      color: dnaProfile.traits.color,
      typography: dnaProfile.traits.typography,
      spacing: dnaProfile.traits.spacing,
      radius: dnaProfile.traits.radius,
      shadow: dnaProfile.traits.shadow,
      contrast: dnaProfile.traits.contrast,
      density: dnaProfile.traits.density,
      motion: dnaProfile.traits.motion,
      layout: dnaProfile.traits.layout,
      component: dnaProfile.traits.component,
      interaction: dnaProfile.traits.interaction,
      complexity: dnaProfile.traits.complexity
    },
    colors: {
      primary: dnaProfile.traits.primaryColor,
      secondary: dnaProfile.traits.secondaryColor,
      accent: dnaProfile.traits.accentColor
    },
    copyright: '2026',
    developedBy: 'Aditya Kumar Jha',
    exportedAt: new Date().toISOString()
  };

  const jsonString = JSON.stringify(jsonPayload, null, 2);

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ui-dna-${dnaProfile.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = () => {
    try {
      setImportError(null);
      const parsed = JSON.parse(importJson);
      if (!parsed.traits) throw new Error('Invalid DNA profile format: Missing traits object.');
      onImportDNA(parsed);
      onClose();
    } catch (err) {
      setImportError(err.message || 'Invalid JSON syntax.');
    }
  };

  return (
    <div className="lab-modal-overlay" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="lab-modal-card"
        style={{ maxWidth: '780px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid var(--border-hairline)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(12, 18, 28, 0.9)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Share2 size={18} color="var(--accent-cyan)" />
            <h2 style={{ fontSize: '17px', color: '#ffffff', fontWeight: 700 }}>
              Export & Disseminate DNA Specimen
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {['card', 'json', 'import'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  border: activeTab === tab ? '1px solid var(--accent-cyan)' : '1px solid transparent',
                  background: activeTab === tab ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                  color: activeTab === tab ? '#ffffff' : 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                {tab === 'card' ? 'Share Card' : tab === 'json' ? 'JSON Payload' : 'Import DNA'}
              </button>
            ))}
            <button
              onClick={onClose}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px', overflowY: 'auto', maxHeight: '70vh' }}>
          {/* TAB 1: VISUAL SHARE CARD */}
          {activeTab === 'card' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              {/* Scientific Specimen Share Card Container */}
              <div
                id="ui-dna-share-card"
                className="lab-panel tech-corners"
                style={{
                  width: '100%',
                  maxWidth: '560px',
                  background: 'linear-gradient(145deg, #090e17 0%, #111824 100%)',
                  border: '1px solid rgba(0, 242, 254, 0.3)',
                  boxShadow: '0 0 35px rgba(0, 242, 254, 0.18)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '18px'
                }}
              >
                {/* Card Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent-cyan)', letterSpacing: '0.12em', fontWeight: 800 }}>
                      UI DNA PROTOCOL • SPECIMEN IDENTITY
                    </span>
                    <h3 style={{ fontSize: '20px', color: '#ffffff', fontWeight: 800, marginTop: '2px' }}>
                      {dnaProfile.name}
                    </h3>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                      {dnaProfile.id}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)' }}>
                      GEN-V{dnaProfile.version}
                    </div>
                  </div>
                </div>

                {/* Central Visual Fingerprint & Genome Overview */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    background: 'rgba(6, 9, 14, 0.65)',
                    padding: '16px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-hairline)'
                  }}
                >
                  <MiniDNA traits={dnaProfile.traits} size={110} pulse />

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
                      PHENOTYPE CLASSIFICATION:
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>
                      {dnaProfile.classification}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent-emerald)', marginTop: '4px' }}>
                      CHROMATIC CHROMOSOMES STABLE
                    </div>
                  </div>
                </div>

                {/* Trait Matrix Summary Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '8px'
                  }}
                >
                  {TRAIT_DEFINITIONS.slice(0, 8).map((t) => (
                    <div
                      key={t.id}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid var(--border-hairline)',
                        borderRadius: '4px',
                        padding: '6px 8px',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)' }}>
                        {t.symbol}
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, color: t.color }}>
                        {Math.round(dnaProfile.traits[t.id] ?? 50)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Card Footer Barcode / Verification */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    paddingTop: '10px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9.5px',
                    color: 'var(--text-muted)'
                  }}
                >
                  <span>SYNTHESIZED BROWSER SPECIMEN • COPYRIGHT 2026</span>
                  <span style={{ color: 'var(--accent-cyan)' }}>DEVELOPED BY:- ADITYA KUMAR JHA</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={handleCopyJSON}
                  className="btn-primary"
                  style={{ padding: '10px 20px', fontSize: '12px' }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'COPIED TO CLIPBOARD' : 'COPY SPECIMEN DATA'}
                </button>
                <button
                  onClick={handleDownloadJSON}
                  className="btn-secondary"
                  style={{ padding: '10px 20px', fontSize: '12px' }}
                >
                  <Download size={14} />
                  DOWNLOAD JSON
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: RAW JSON PAYLOAD */}
          {activeTab === 'json' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)' }}>
                  STANDARD UI DNA SCHEMA (RFC-7159)
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={handleCopyJSON} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '11px' }}>
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                  <button onClick={handleDownloadJSON} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '11px' }}>
                    <Download size={12} />
                    Download
                  </button>
                </div>
              </div>

              <pre
                style={{
                  background: 'rgba(5, 8, 12, 0.9)',
                  border: '1px solid var(--border-hairline)',
                  borderRadius: '6px',
                  padding: '16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--accent-cyan)',
                  overflowX: 'auto',
                  lineHeight: 1.6
                }}
              >
                {jsonString}
              </pre>
            </div>
          )}

          {/* TAB 3: IMPORT DNA PROFILE */}
          {activeTab === 'import' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Paste a previously exported UI DNA profile JSON to immediately import and calibrate the laboratory workspace.
              </p>

              <textarea
                rows={10}
                placeholder="Paste UI DNA JSON here..."
                value={importJson}
                onChange={(e) => setImportJson(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(5, 8, 12, 0.9)',
                  border: '1px solid var(--border-hairline)',
                  borderRadius: '6px',
                  padding: '14px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: '#ffffff',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />

              {importError && (
                <div style={{ color: 'var(--accent-crimson)', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
                  {importError}
                </div>
              )}

              <button
                onClick={handleImportSubmit}
                disabled={!importJson.trim()}
                className="btn-primary"
                style={{ alignSelf: 'flex-start', padding: '10px 22px' }}
              >
                <Sparkles size={14} />
                LOAD AND CALIBRATE SPECIMEN
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
