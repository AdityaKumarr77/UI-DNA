import React from 'react';
import { TRAIT_DEFINITIONS, getTraitSubCharacteristics } from '../../utils/dnaEngine';
import { Dna, Zap, Sliders, Info } from 'lucide-react';

export default function TraitDetailPanel({
  traitId = 'motion',
  value = 50,
  onChangeValue,
  onOpenMutate
}) {
  const trait = TRAIT_DEFINITIONS.find(t => t.id === traitId) || TRAIT_DEFINITIONS[0];
  const subMetrics = getTraitSubCharacteristics(trait.id, value);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '18px',
        overflowY: 'auto',
        gap: '20px'
      }}
    >
      {/* Header Badge */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: trait.color,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '4px'
            }}
          >
            <Dna size={12} />
            {trait.category}
          </div>
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.01em'
            }}
          >
            {trait.name}
          </h3>
        </div>

        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '22px',
            fontWeight: 800,
            color: trait.color,
            textShadow: `0 0 16px ${trait.color}66`
          }}
        >
          {Math.round(value)}
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>/100</span>
        </div>
      </div>

      {/* Trait Value Slider & Calibration */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--border-hairline)',
          borderRadius: '6px',
          padding: '12px'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-secondary)',
            marginBottom: '8px'
          }}
        >
          <span>CALIBRATION</span>
          <span style={{ color: trait.color }}>{Math.round(value)}% MAGNITUDE</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChangeValue(trait.id, Number(e.target.value))}
          className="tech-slider"
          style={{
            background: `linear-gradient(to right, ${trait.color} ${value}%, rgba(255, 255, 255, 0.1) ${value}%)`
          }}
        />
      </div>

      {/* Characteristics Sub-Metrics with Laboratory Meters */}
      <div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--text-muted)',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Sliders size={12} />
          GENOMIC SUB-CHARACTERISTICS
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {subMetrics.map((sm, index) => {
            const filled = sm.bars;
            const empty = 10 - filled;
            const meterVisual = '█'.repeat(filled) + '░'.repeat(empty);

            return (
              <div
                key={index}
                style={{
                  background: 'rgba(14, 20, 30, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '4px',
                  padding: '8px 10px'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: '#e2e8f0',
                    marginBottom: '4px'
                  }}
                >
                  <span>{sm.name}</span>
                  <span style={{ color: trait.color, fontWeight: 700 }}>{sm.value}%</span>
                </div>
                {/* Block Meter */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    color: trait.color,
                    lineHeight: 1
                  }}
                >
                  {meterVisual}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scientific Explanation of Genome Effect */}
      <div
        style={{
          background: 'rgba(0, 242, 254, 0.03)',
          border: '1px solid rgba(0, 242, 254, 0.15)',
          borderRadius: '6px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.06em',
            color: 'var(--accent-cyan)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Info size={12} />
          PHENOTYPIC MANIFESTATION
        </div>
        <p
          style={{
            fontSize: '12px',
            color: 'var(--text-secondary)',
            lineHeight: 1.55
          }}
        >
          {trait.description}
        </p>
      </div>

      {/* Primary Mutate Button */}
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button
          onClick={() => onOpenMutate(trait.id)}
          className="btn-mutate"
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <Zap size={14} />
          MUTATE {trait.symbol} GENOME
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <button
            onClick={() => onChangeValue(trait.id, Math.min(100, Math.round(value + 15)))}
            className="btn-secondary"
            style={{ fontSize: '11px', padding: '6px' }}
          >
            +15 Boost
          </button>
          <button
            onClick={() => onChangeValue(trait.id, Math.max(0, Math.round(value - 15)))}
            className="btn-secondary"
            style={{ fontSize: '11px', padding: '6px' }}
          >
            -15 Dampen
          </button>
        </div>
      </div>
    </div>
  );
}
