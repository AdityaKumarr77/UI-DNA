import React from 'react';
import { TRAIT_DEFINITIONS, calculateDivergence } from '../../utils/dnaEngine';
import DNAVisualizer from '../DNA/DNAVisualizer';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';
import { GitCompare } from 'lucide-react';

export default function ComparisonMatrix({ dnaA, dnaB }) {
  if (!dnaA || !dnaB) return null;

  const divergence = calculateDivergence(dnaA.traits, dnaB.traits);

  // Radar data format for Recharts
  const radarData = TRAIT_DEFINITIONS.map(trait => ({
    trait: trait.symbol,
    fullName: trait.name,
    DNA_A: dnaA.traits[trait.id] ?? 50,
    DNA_B: dnaB.traits[trait.id] ?? 50
  }));

  return (
    <div
      className="comparison-page-wrapper"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto'
      }}
    >
      {/* Neutral Scientific Protocol Header */}
      <div
        style={{
          background: 'rgba(11, 16, 26, 0.7)',
          border: '1px solid var(--border-hairline)',
          borderRadius: '8px',
          padding: '18px 24px',
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
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <GitCompare size={14} />
            GENOME CROSS-ANALYSIS PROTOCOL
          </div>
          <h2 style={{ fontSize: '20px', color: '#ffffff', fontWeight: 700, marginTop: '2px' }}>
            Comparative Morphological Divergence
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Neutral bi-directional topology comparison. Values reflect structural variance, not hierarchy or quality.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
              OVERALL GENETIC DIVERGENCE
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', fontWeight: 800, color: 'var(--accent-cyan)' }}>
              {divergence.divergencePercentage}%
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
              MAX VARIANCE LOCUS
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700, color: 'var(--accent-pink)' }}>
              {divergence.maxDeltaTrait} (±{divergence.maxDeltaValue})
            </div>
          </div>
        </div>
      </div>

      {/* Dual Visual Fingerprints Section */}
      <div className="comparison-dual-grid">
        {/* Specimen A */}
        <div
          className="lab-panel tech-corners"
          style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                SPECIMEN A
              </span>
              <h3 style={{ fontSize: '16px', color: '#fff' }}>{dnaA.name}</h3>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent-cyan)' }}>
              {dnaA.id}
            </span>
          </div>

          <div style={{ width: '100%', maxWidth: '280px', aspectRatio: '1 / 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DNAVisualizer
              traits={dnaA.traits}
              dnaId={dnaA.id}
              classification={dnaA.classification}
              size={280}
              interactive={false}
              showLabels={false}
            />
          </div>

          <div
            style={{
              width: '100%',
              marginTop: '12px',
              padding: '8px 12px',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '4px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-secondary)',
              textAlign: 'center'
            }}
          >
            {dnaA.classification}
          </div>
        </div>

        {/* Specimen B */}
        <div
          className="lab-panel tech-corners"
          style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                SPECIMEN B
              </span>
              <h3 style={{ fontSize: '16px', color: '#fff' }}>{dnaB.name}</h3>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent-emerald)' }}>
              {dnaB.id}
            </span>
          </div>

          <div style={{ width: '100%', maxWidth: '280px', aspectRatio: '1 / 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DNAVisualizer
              traits={dnaB.traits}
              dnaId={dnaB.id}
              classification={dnaB.classification}
              size={280}
              interactive={false}
              showLabels={false}
            />
          </div>

          <div
            style={{
              width: '100%',
              marginTop: '12px',
              padding: '8px 12px',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '4px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-secondary)',
              textAlign: 'center'
            }}
          >
            {dnaB.classification}
          </div>
        </div>
      </div>

      {/* Visual Difference Map (Radar) & Trait Comparison Ladder */}
      <div className="comparison-details-grid">
        {/* Trait Comparison Ladder */}
        <div className="lab-panel" style={{ padding: '18px' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.08em',
              color: 'var(--text-muted)',
              marginBottom: '16px',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <span>GENOME TRAIT</span>
            <div style={{ display: 'flex', gap: '16px' }}>
              <span style={{ color: 'var(--accent-cyan)' }}>A</span>
              <span style={{ color: 'var(--accent-emerald)' }}>B</span>
              <span style={{ width: '38px', textAlign: 'right' }}>Δ</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {TRAIT_DEFINITIONS.map((def) => {
              const valA = dnaA.traits[def.id] ?? 50;
              const valB = dnaB.traits[def.id] ?? 50;
              const delta = valB - valA;

              return (
                <div
                  key={def.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    padding: '8px 10px',
                    background: 'rgba(14, 20, 30, 0.4)',
                    borderRadius: '4px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#ffffff' }}>
                      {def.name}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                      <span style={{ color: 'var(--accent-cyan)', fontWeight: 700, width: '24px', textAlign: 'right' }}>
                        {valA}
                      </span>
                      <span style={{ color: 'var(--border-subtle)', fontSize: '10px' }}>→</span>
                      <span style={{ color: 'var(--accent-emerald)', fontWeight: 700, width: '24px' }}>
                        {valB}
                      </span>
                      <span
                        style={{
                          width: '38px',
                          textAlign: 'right',
                          color: delta === 0 ? 'var(--text-muted)' : (delta > 0 ? 'var(--accent-emerald)' : 'var(--accent-cyan)'),
                          fontSize: '11px',
                          fontWeight: 700
                        }}
                      >
                        {delta > 0 ? `+${delta}` : delta}
                      </span>
                    </div>
                  </div>

                  {/* Dual comparison bar visual */}
                  <div style={{ width: '100%', height: '4px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '2px', position: 'relative' }}>
                    <div
                      style={{
                        position: 'absolute',
                        left: `${Math.min(valA, valB)}%`,
                        width: `${Math.abs(delta)}%`,
                        height: '100%',
                        background: 'rgba(249, 83, 198, 0.6)',
                        borderRadius: '2px'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Visual Difference Map (Radar Topology) */}
        <div className="lab-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>
            GENETIC TOPOLOGY RADAR
          </div>
          <div style={{ flex: 1, minHeight: '340px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="rgba(255, 255, 255, 0.08)" />
                <PolarAngleAxis dataKey="trait" stroke="rgba(255, 255, 255, 0.5)" tick={{ fontSize: 10, fontFamily: 'var(--font-mono)' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(255, 255, 255, 0.15)" tick={{ fontSize: 9 }} />
                <Radar name={dnaA.name} dataKey="DNA_A" stroke="#00f2fe" fill="#00f2fe" fillOpacity={0.25} />
                <Radar name={dnaB.name} dataKey="DNA_B" stroke="#38ef7d" fill="#38ef7d" fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '24px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              marginTop: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: 10, height: 10, background: '#00f2fe', borderRadius: '2px' }} />
              <span style={{ color: '#ffffff' }}>{dnaA.name} ({dnaA.id})</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: 10, height: 10, background: '#38ef7d', borderRadius: '2px' }} />
              <span style={{ color: '#ffffff' }}>{dnaB.name} ({dnaB.id})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
