import React from 'react';
import { Palette, Type, Layout, Sparkles } from 'lucide-react';

export default function ManualAnalyzer({ traits, onChangeTrait, onSynthesize }) {
  const controls = [
    {
      group: 'Chromatic Attributes',
      icon: Palette,
      items: [
        { id: 'color', label: 'Color Genome Vibrancy', val: traits.color ?? 70, min: 0, max: 100 },
        { id: 'contrast', label: 'Luminance Contrast', val: traits.contrast ?? 75, min: 0, max: 100 }
      ]
    },
    {
      group: 'Spatial & Morphology',
      icon: Layout,
      items: [
        { id: 'radius', label: 'Border Radius Curvature', val: traits.radius ?? 45, min: 0, max: 100 },
        { id: 'spacing', label: 'Spacing Density Rhythm', val: traits.spacing ?? 60, min: 0, max: 100 },
        { id: 'density', label: 'Component Density Compacting', val: traits.density ?? 55, min: 0, max: 100 }
      ]
    },
    {
      group: 'Typography & Structure',
      icon: Type,
      items: [
        { id: 'typography', label: 'Font Scale & Hierarchy', val: traits.typography ?? 70, min: 0, max: 100 },
        { id: 'layout', label: 'Layout Grid Complexity', val: traits.layout ?? 60, min: 0, max: 100 },
        { id: 'component', label: 'Component Nesting Depth', val: traits.component ?? 65, min: 0, max: 100 }
      ]
    },
    {
      group: 'Kinetic & Atmosphere',
      icon: Sparkles,
      items: [
        { id: 'motion', label: 'Animation Intensity & Speed', val: traits.motion ?? 65, min: 0, max: 100 },
        { id: 'interaction', label: 'Interaction Response & Tactility', val: traits.interaction ?? 70, min: 0, max: 100 },
        { id: 'shadow', label: 'Shadow & Depth Elevation', val: traits.shadow ?? 50, min: 0, max: 100 },
        { id: 'complexity', label: 'Visual Noise & Textural Layering', val: traits.complexity ?? 45, min: 0, max: 100 }
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Color Selectors Bar */}
      <div
        style={{
          background: 'rgba(14, 20, 30, 0.65)',
          border: '1px solid var(--border-hairline)',
          borderRadius: '6px',
          padding: '16px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px'
        }}
      >
        <div>
          <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            PRIMARY CHROMATIC SEED
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="color"
              value={traits.primaryColor || '#00f2fe'}
              onChange={(e) => onChangeTrait('primaryColor', e.target.value)}
              style={{ width: '32px', height: '32px', border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'transparent' }}
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#fff' }}>
              {traits.primaryColor || '#00f2fe'}
            </span>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            SECONDARY SPECTRUM
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="color"
              value={traits.secondaryColor || '#4facfe'}
              onChange={(e) => onChangeTrait('secondaryColor', e.target.value)}
              style={{ width: '32px', height: '32px', border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'transparent' }}
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#fff' }}>
              {traits.secondaryColor || '#4facfe'}
            </span>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            ACCENT PHOTONIC PEAK
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="color"
              value={traits.accentColor || '#38ef7d'}
              onChange={(e) => onChangeTrait('accentColor', e.target.value)}
              style={{ width: '32px', height: '32px', border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'transparent' }}
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#fff' }}>
              {traits.accentColor || '#38ef7d'}
            </span>
          </div>
        </div>
      </div>

      {/* Control Groups Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px'
        }}
      >
        {controls.map((grp, idx) => {
          const IconComponent = grp.icon;
          return (
            <div
              key={idx}
              className="lab-panel"
              style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--accent-cyan)',
                  letterSpacing: '0.08em',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <IconComponent size={14} />
                {grp.group.toUpperCase()}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {grp.items.map((item) => (
                  <div key={item.id} className="trait-control-item">
                    <div className="trait-control-top">
                      <span className="trait-name-badge">{item.label}</span>
                      <span className="trait-val-indicator">{Math.round(item.val)}%</span>
                    </div>
                    <input
                      type="range"
                      min={item.min}
                      max={item.max}
                      value={item.val}
                      onChange={(e) => onChangeTrait(item.id, Number(e.target.value))}
                      className="tech-slider"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Synthesis CTA */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '10px' }}>
        <button
          onClick={onSynthesize}
          className="btn-primary"
          style={{ padding: '12px 28px', fontSize: '13px' }}
        >
          <Sparkles size={16} />
          SYNTHESIZE GENETIC FINGERPRINT
        </button>
      </div>
    </div>
  );
}
