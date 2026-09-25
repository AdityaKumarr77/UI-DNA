import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { generateMutations, TRAIT_DEFINITIONS } from '../../utils/dnaEngine';
import MiniDNA from '../DNA/MiniDNA';
import { Zap, X, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';

export default function MutationModal({
  isOpen,
  onClose,
  currentDNA,
  targetTraitId = 'motion',
  onAdoptMutation
}) {
  const [activeTrait, setActiveTrait] = useState(targetTraitId || 'motion');
  const [variations, setVariations] = useState(() => 
    currentDNA ? generateMutations(currentDNA, targetTraitId || 'motion') : []
  );

  if (!isOpen || !currentDNA) return null;

  const currentTraitDef = TRAIT_DEFINITIONS.find(t => t.id === activeTrait) || TRAIT_DEFINITIONS[0];
  const currentVal = currentDNA.traits[activeTrait] ?? 50;

  const handleRegenerate = (newTrait = activeTrait) => {
    setActiveTrait(newTrait);
    const newMutations = generateMutations(currentDNA, newTrait);
    setVariations(newMutations);
  };

  const handleAdopt = (variant) => {
    // Trigger temporary particle burst of cyan and violet
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f2fe', '#f953c6', '#38ef7d', '#ffffff'],
      disableForReducedMotion: true
    });

    onAdoptMutation(variant);
    onClose();
  };

  return (
    <div className="lab-modal-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="lab-modal-card"
        style={{ maxWidth: '980px', maxHeight: '90vh' }}
      >
        {/* Header */}
        <div
          style={{
            padding: '14px clamp(14px, 3vw, 24px)',
            borderBottom: '1px solid var(--border-hairline)',
            background: 'rgba(12, 18, 28, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 4,
                background: 'rgba(249, 83, 198, 0.15)',
                border: '1px solid rgba(249, 83, 198, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f953c6'
              }}
            >
              <Zap size={18} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--accent-pink)',
                  letterSpacing: '0.08em',
                  fontWeight: 700
                }}
              >
                MUTATION LABORATORY PROTOCOL
              </div>
              <h2 style={{ fontSize: '18px', color: '#ffffff', fontWeight: 700 }}>
                Synthesize Evolutionary Variations
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => handleRegenerate(activeTrait)}
              className="btn-secondary"
              style={{ padding: '6px 12px', fontSize: '11px' }}
            >
              <RefreshCw size={12} />
              Re-Synthesize
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Current State & Trait Selector Bar */}
        <div
          style={{
            padding: '12px 24px',
            background: 'rgba(7, 10, 15, 0.7)',
            borderBottom: '1px solid var(--border-hairline)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-secondary)'
              }}
            >
              TARGET LOCUS:
            </span>
            <select
              value={activeTrait}
              onChange={(e) => handleRegenerate(e.target.value)}
              style={{
                background: 'rgba(18, 26, 40, 0.8)',
                border: '1px solid var(--border-subtle)',
                color: '#ffffff',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                padding: '5px 12px',
                borderRadius: '4px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {TRAIT_DEFINITIONS.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name} (Current: {currentDNA.traits[t.id] ?? 50})
                </option>
              ))}
            </select>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span style={{ color: 'var(--text-muted)' }}>CURRENT:</span>
            <span style={{ color: currentTraitDef.color, fontWeight: 700 }}>
              {currentTraitDef.symbol} = {currentVal}
            </span>
            <span style={{ color: 'var(--text-muted)' }}>•</span>
            <span style={{ color: 'var(--accent-cyan)' }}>{currentDNA.id}</span>
          </div>
        </div>

        {/* 3 Evolutionary Possibilities Grid */}
        <div
          style={{
            padding: 'clamp(14px, 3vw, 24px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '16px',
            overflowY: 'auto'
          }}
        >
          {variations.map((variant) => {
            const isIncrease = variant.newValue >= variant.oldValue;
            const delta = variant.newValue - variant.oldValue;

            return (
              <motion.div
                key={variant.code}
                whileHover={{ y: -4, borderColor: 'rgba(0, 242, 254, 0.45)' }}
                style={{
                  background: 'rgba(14, 20, 32, 0.7)',
                  border: '1px solid var(--border-hairline)',
                  borderRadius: '6px',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  position: 'relative'
                }}
              >
                {/* Branch Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        fontWeight: 800,
                        padding: '2px 8px',
                        background: 'rgba(0, 242, 254, 0.15)',
                        color: 'var(--accent-cyan)',
                        borderRadius: '3px',
                        border: '1px solid rgba(0, 242, 254, 0.3)'
                      }}
                    >
                      MUTATION {variant.code}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        color: 'var(--text-muted)'
                      }}
                    >
                      {variant.branch}
                    </span>
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    Δ {variant.divergence.divergencePercentage}% DIV
                  </span>
                </div>

                {/* Mini Visual Fingerprint & Target Value */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'rgba(6, 9, 14, 0.5)',
                    padding: '12px',
                    borderRadius: '6px'
                  }}
                >
                  <MiniDNA traits={variant.traits} size={64} />

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                      {currentTraitDef.symbol} GENOME
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-muted)' }}>
                        {variant.oldValue}
                      </span>
                      <ArrowRight size={13} color="var(--text-muted)" />
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '20px',
                          fontWeight: 800,
                          color: isIncrease ? 'var(--accent-emerald)' : 'var(--accent-cyan)'
                        }}
                      >
                        {variant.newValue}
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        color: isIncrease ? 'var(--accent-emerald)' : 'var(--accent-cyan)'
                      }}
                    >
                      {delta >= 0 ? `+${delta}` : delta} shift
                    </span>
                  </div>
                </div>

                {/* Evolutionary Hypothesis */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      marginBottom: '4px'
                    }}
                  >
                    {variant.title}
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {variant.hypothesis}
                  </p>
                </div>

                {/* Target Classification */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'var(--text-muted)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    padding: '6px',
                    borderRadius: '4px'
                  }}
                >
                  PHENOTYPE: {variant.classification}
                </div>

                {/* Adopt Mutation Action Button */}
                <button
                  onClick={() => handleAdopt(variant)}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '12px'
                  }}
                >
                  <Sparkles size={14} />
                  ADOPT MUTATION {variant.code}
                </button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
