import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DNAVisualizer from '../components/DNA/DNAVisualizer';
import LiveUIPreview from '../components/Preview/LiveUIPreview';
import TraitDetailPanel from '../components/DNA/TraitDetailPanel';
import EvolutionTimeline from '../components/Timeline/EvolutionTimeline';
import { TRAIT_DEFINITIONS } from '../utils/dnaEngine';
import { 
  Eye, 
  Dna, 
  Sliders, 
  Zap, 
  RotateCcw, 
  Split, 
  Activity,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function Lab({
  currentDNA,
  onChangeTrait,
  onOpenMutationLab,
  onSelectVersion,
  onSnapshotVersion,
  onResetDNA
}) {
  const [selectedTraitId, setSelectedTraitId] = useState('motion');
  const [viewMode, setViewMode] = useState('dna'); // 'dna' | 'preview' | 'split'
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false);
  
  // Mobile active tab: 'dna' | 'rack' | 'inspector' | 'simulation'
  const [mobileTab, setMobileTab] = useState('dna');

  if (!currentDNA) return null;

  return (
    <div className="lab-workspace-wrapper">
      {/* Mobile Laboratory Segmented Navigation Bar (Visible only on mobile/tablet) */}
      <div className="lab-mobile-tabs-bar">
        <button
          onClick={() => setMobileTab('dna')}
          className={`lab-mobile-tab-btn ${mobileTab === 'dna' ? 'active' : ''}`}
        >
          <Dna size={13} />
          <span>DNA</span>
        </button>
        <button
          onClick={() => setMobileTab('rack')}
          className={`lab-mobile-tab-btn ${mobileTab === 'rack' ? 'active' : ''}`}
        >
          <Sliders size={13} />
          <span>GENOMES</span>
        </button>
        <button
          onClick={() => setMobileTab('inspector')}
          className={`lab-mobile-tab-btn ${mobileTab === 'inspector' ? 'active' : ''}`}
        >
          <Activity size={13} />
          <span>INSPECT</span>
        </button>
        <button
          onClick={() => setMobileTab('simulation')}
          className={`lab-mobile-tab-btn ${mobileTab === 'simulation' ? 'active' : ''}`}
        >
          <Eye size={13} />
          <span>LIVE UI</span>
        </button>
      </div>

      <div
        className={`lab-workspace mobile-view-${mobileTab}`}
        style={{
          gridTemplateColumns: `${leftPanelCollapsed ? '48px' : '320px'} 1fr ${rightPanelCollapsed ? '48px' : '340px'}`
        }}
      >
        {/* ========================================================
            LEFT PANEL: TOOLS & 12 GENOME TRAITS RACK
            ======================================================== */}
        <div className={`lab-left-panel ${mobileTab === 'rack' ? 'mobile-active-panel' : ''}`}>
          <div className="panel-header">
            {!leftPanelCollapsed && (
              <div className="panel-title">
                <Sliders size={13} color="var(--accent-cyan)" />
                <span>GENOMIC RACK (12)</span>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: 'auto' }}>
              {!leftPanelCollapsed && (
                <button
                  onClick={onResetDNA}
                  title="Reset to Genesis traits"
                  className="btn-secondary"
                  style={{ padding: '3px 8px', fontSize: '10px' }}
                >
                  <RotateCcw size={10} />
                  Reset
                </button>
              )}

              <button
                onClick={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
                className="btn-secondary desktop-collapse-btn"
                style={{ padding: '4px 6px', height: '24px' }}
                title={leftPanelCollapsed ? 'Expand Genomic Rack' : 'Collapse Genomic Rack'}
              >
                {leftPanelCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
              </button>
            </div>
          </div>

          <div className="panel-body-scroll">
            {TRAIT_DEFINITIONS.map((trait) => {
              const isSelected = selectedTraitId === trait.id;
              const val = currentDNA.traits[trait.id] ?? 50;

              return (
                <div
                  key={trait.id}
                  className={`trait-control-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedTraitId(trait.id);
                    // On mobile, keep in rack or allow inspecting
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="trait-control-top">
                    <span className="trait-name-badge">
                      <span
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: '50%',
                          backgroundColor: trait.color
                        }}
                      />
                      {trait.name}
                    </span>
                    <span className="trait-val-indicator" style={{ color: trait.color }}>
                      {Math.round(val)}%
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={val}
                    onChange={(e) => {
                      e.stopPropagation();
                      onChangeTrait(trait.id, Number(e.target.value));
                    }}
                    className="tech-slider"
                    style={{
                      background: `linear-gradient(to right, ${trait.color} ${val}%, rgba(255, 255, 255, 0.1) ${val}%)`
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            CENTER PANEL: DNA VISUALIZATION & LIVE PREVIEW STAGE
            ======================================================== */}
        <div className={`lab-center-panel ${(mobileTab === 'dna' || mobileTab === 'simulation') ? 'mobile-active-panel' : ''}`}>
          {/* Stage Toolbar */}
          <div className="center-toolbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, overflow: 'hidden' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--accent-cyan)',
                  fontWeight: 700,
                  whiteSpace: 'nowrap'
                }}
              >
                {currentDNA.id}
              </span>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span
                className="hide-on-mobile-sm"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {currentDNA.classification}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Desktop View Mode Segmented Toggle */}
              <div className="view-mode-toggle desktop-view-toggle">
                <button
                  onClick={() => setViewMode('dna')}
                  className={`view-mode-btn ${viewMode === 'dna' ? 'active' : ''}`}
                >
                  <Dna size={12} style={{ display: 'inline', marginRight: 4 }} />
                  DNA
                </button>
                <button
                  onClick={() => setViewMode('preview')}
                  className={`view-mode-btn ${viewMode === 'preview' ? 'active' : ''}`}
                >
                  <Eye size={12} style={{ display: 'inline', marginRight: 4 }} />
                  SIMULATION
                </button>
                <button
                  onClick={() => setViewMode('split')}
                  className={`view-mode-btn ${viewMode === 'split' ? 'active' : ''}`}
                >
                  <Split size={12} style={{ display: 'inline', marginRight: 4 }} />
                  SPLIT
                </button>
              </div>

              {/* Quick Mutate Trigger */}
              <button
                onClick={() => onOpenMutationLab(selectedTraitId)}
                className="btn-mutate"
                style={{ padding: '6px 12px', fontSize: '11px' }}
              >
                <Zap size={13} />
                <span>MUTATE</span>
              </button>
            </div>
          </div>

          {/* Center Stage Container */}
          <div className="center-stage-container">
            {/* Display based on desktop viewMode or mobileTab */}
            {(viewMode === 'dna' || mobileTab === 'dna') && mobileTab !== 'simulation' && viewMode !== 'split' && (
              <motion.div
                key="dna-stage"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px'
                }}
              >
                <DNAVisualizer
                  traits={currentDNA.traits}
                  dnaId={currentDNA.id}
                  classification={currentDNA.classification}
                  selectedTraitId={selectedTraitId}
                  onSelectTrait={(traitId) => {
                    setSelectedTraitId(traitId);
                    if (window.innerWidth <= 768) {
                      setMobileTab('inspector');
                    }
                  }}
                  size={520}
                  interactive={true}
                  showLabels={true}
                />
              </motion.div>
            )}

            {(viewMode === 'preview' || mobileTab === 'simulation') && viewMode !== 'split' && (
              <motion.div
                key="preview-stage"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                style={{ width: '100%', height: '100%', overflowY: 'auto' }}
              >
                <LiveUIPreview
                  traits={currentDNA.traits}
                  dnaId={currentDNA.id}
                  classification={currentDNA.classification}
                />
              </motion.div>
            )}

            {viewMode === 'split' && mobileTab !== 'simulation' && mobileTab !== 'dna' && (
              <motion.div
                key="split-stage"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1px',
                  background: 'var(--border-hairline)'
                }}
              >
                <div
                  style={{
                    background: 'var(--bg-deep)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    padding: '12px'
                  }}
                >
                  <DNAVisualizer
                    traits={currentDNA.traits}
                    dnaId={currentDNA.id}
                    classification={currentDNA.classification}
                    selectedTraitId={selectedTraitId}
                    onSelectTrait={setSelectedTraitId}
                    size={360}
                    interactive={true}
                    showLabels={true}
                  />
                </div>

                <div
                  style={{
                    background: 'var(--bg-deep)',
                    overflowY: 'auto'
                  }}
                >
                  <LiveUIPreview
                    traits={currentDNA.traits}
                    dnaId={currentDNA.id}
                    classification={currentDNA.classification}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* ========================================================
            RIGHT PANEL: TRAIT INSPECTOR & DETAIL PANEL
            ======================================================== */}
        <div className={`lab-right-panel ${mobileTab === 'inspector' ? 'mobile-active-panel' : ''}`}>
          <div className="panel-header">
            <button
              onClick={() => setRightPanelCollapsed(!rightPanelCollapsed)}
              className="btn-secondary desktop-collapse-btn"
              style={{ padding: '4px 6px', height: '24px' }}
              title={rightPanelCollapsed ? 'Expand Trait Inspector' : 'Collapse Trait Inspector'}
            >
              {rightPanelCollapsed ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
            </button>

            {!rightPanelCollapsed && (
              <>
                <div className="panel-title" style={{ marginLeft: 6 }}>
                  <Activity size={13} color="var(--accent-pink)" />
                  <span>TRAIT INSPECTOR</span>
                </div>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'var(--text-muted)',
                    marginLeft: 'auto'
                  }}
                >
                  ACTIVE LOCUS
                </span>
              </>
            )}
          </div>

          {!rightPanelCollapsed && (
            <TraitDetailPanel
              traitId={selectedTraitId}
              value={currentDNA.traits[selectedTraitId] ?? 50}
              onChangeValue={onChangeTrait}
              onOpenMutate={onOpenMutationLab}
            />
          )}
        </div>

        {/* ========================================================
            BOTTOM PANEL: HORIZONTAL EVOLUTION TIMELINE
            ======================================================== */}
        <EvolutionTimeline
          history={currentDNA.history || []}
          currentVersion={currentDNA.version || 1}
          onSelectVersion={onSelectVersion}
          onSnapshot={onSnapshotVersion}
        />
      </div>
    </div>
  );
}
