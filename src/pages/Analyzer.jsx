import React, { useState } from 'react';
import ManualAnalyzer from '../components/Analyzer/ManualAnalyzer';
import ScreenshotAnalyzer from '../components/Analyzer/ScreenshotAnalyzer';
import DNAVisualizer from '../components/DNA/DNAVisualizer';
import { generateDNAId, classifyDNA } from '../utils/dnaEngine';
import { Sliders, Camera, Sparkles } from 'lucide-react';

export default function Analyzer({ currentTraits, onApplySynthesizedDNA, onNavigate }) {
  const [mode, setMode] = useState('manual'); // 'manual' | 'screenshot'
  const [draftTraits, setDraftTraits] = useState({ ...currentTraits });

  const handleChangeTrait = (traitId, value) => {
    setDraftTraits(prev => ({
      ...prev,
      [traitId]: value
    }));
  };

  const handleApplyEstimated = (estimatedTraits) => {
    setDraftTraits(prev => ({
      ...prev,
      ...estimatedTraits
    }));
  };

  const synthesizedId = generateDNAId(draftTraits);
  const synthesizedClass = classifyDNA(draftTraits);

  const handleSynthesizeAndOpenLab = () => {
    onApplySynthesizedDNA(draftTraits);
    onNavigate('lab');
  };

  return (
    <div
      style={{
        flex: 1,
        overflowY: 'auto',
        padding: '28px 24px',
        maxWidth: '1360px',
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}
    >
      {/* Header Banner */}
      <div
        style={{
          background: 'rgba(10, 15, 24, 0.75)',
          border: '1px solid var(--border-hairline)',
          borderRadius: '8px',
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--accent-cyan)',
              letterSpacing: '0.1em',
              fontWeight: 700
            }}
          >
            ANALYSIS LAB • SPECIMEN EXTRACTION
          </div>
          <h1 style={{ fontSize: '26px', color: '#ffffff', fontWeight: 800, marginTop: '2px' }}>
            Analysis Lab
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Configure visual characteristics manually or upload UI screenshots to extract estimated chromatic and spatial genomes.
          </p>
        </div>

        {/* Mode Selector Segmented Control */}
        <div
          style={{
            display: 'flex',
            background: 'rgba(0, 0, 0, 0.45)',
            padding: '4px',
            borderRadius: '6px',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <button
            onClick={() => setMode('manual')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '4px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              fontWeight: 600,
              background: mode === 'manual' ? 'rgba(0, 242, 254, 0.15)' : 'transparent',
              color: mode === 'manual' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              border: mode === 'manual' ? '1px solid rgba(0, 242, 254, 0.3)' : '1px solid transparent',
              cursor: 'pointer'
            }}
          >
            <Sliders size={14} />
            MODE 1: MANUAL ANALYSIS
          </button>

          <button
            onClick={() => setMode('screenshot')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '4px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              fontWeight: 600,
              background: mode === 'screenshot' ? 'rgba(0, 242, 254, 0.15)' : 'transparent',
              color: mode === 'screenshot' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              border: mode === 'screenshot' ? '1px solid rgba(0, 242, 254, 0.3)' : '1px solid transparent',
              cursor: 'pointer'
            }}
          >
            <Camera size={14} />
            MODE 2: SCREENSHOT ANALYSIS
          </button>
        </div>
      </div>

      {/* Main Analyzer Body & Real-Time Preview */}
      <div className="analyzer-grid-layout">
        {/* Left: Active Mode Analyzer Panel */}
        <div>
          {mode === 'manual' ? (
            <ManualAnalyzer
              traits={draftTraits}
              onChangeTrait={handleChangeTrait}
              onSynthesize={handleSynthesizeAndOpenLab}
            />
          ) : (
            <ScreenshotAnalyzer
              onApplyEstimatedTraits={handleApplyEstimated}
            />
          )}
        </div>

        {/* Right: Live Synthesized DNA Fingerprint Specimen */}
        <div
          className="lab-panel tech-corners analyzer-preview-sticky"
          style={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-cyan)', fontWeight: 700 }}>
              SYNTHESIZED PROFILE PREVIEW
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
              {synthesizedId}
            </span>
          </div>

          <div style={{ width: '100%', maxWidth: '300px', aspectRatio: '1 / 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DNAVisualizer
              traits={draftTraits}
              dnaId={synthesizedId}
              classification={synthesizedClass}
              size={300}
              interactive={true}
              showLabels={true}
            />
          </div>

          <div
            style={{
              width: '100%',
              background: 'rgba(0, 0, 0, 0.35)',
              padding: '10px 14px',
              borderRadius: '4px',
              border: '1px solid var(--border-hairline)',
              textAlign: 'center'
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
              PROJECTED PHENOTYPE:
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#ffffff', fontWeight: 700, marginTop: '2px' }}>
              {synthesizedClass}
            </div>
          </div>

          <button
            onClick={handleSynthesizeAndOpenLab}
            className="btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '12px' }}
          >
            <Sparkles size={14} />
            APPLY & OPEN LABORATORY
          </button>
        </div>
      </div>
    </div>
  );
}
