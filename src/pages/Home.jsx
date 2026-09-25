import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DNAHelixHero from '../components/DNA/DNAHelixHero';
import DNAVisualizer from '../components/DNA/DNAVisualizer';
import MiniDNA from '../components/DNA/MiniDNA';
import { DEMO_PRESETS } from '../utils/presets';
import { 
  Dna, 
  Zap, 
  Compass,
  ChevronRight
} from 'lucide-react';

export default function Home({ onNavigate, onLoadPreset }) {
  // Quick-interactive mini trait experiment on landing page
  const [demoMotion, setDemoMotion] = useState(65);
  const [demoRadius, setDemoRadius] = useState(42);

  const demoTraits = {
    color: 72,
    typography: 78,
    spacing: 60,
    radius: demoRadius,
    shadow: 55,
    contrast: 80,
    density: 50,
    motion: demoMotion,
    layout: 65,
    component: 60,
    interaction: 75,
    complexity: 50
  };

  return (
    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <section
        style={{
          padding: '60px 24px 30px',
          maxWidth: '1240px',
          margin: '0 auto',
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          position: 'relative'
        }}
      >
        {/* Laboratory Status Chip */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 14px',
            background: 'rgba(0, 242, 254, 0.08)',
            border: '1px solid rgba(0, 242, 254, 0.25)',
            borderRadius: '20px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--accent-cyan)'
          }}
        >
          <span className="active-pulse-dot" />
          <span>UI MORPHOLOGY ENGINE • BIOLOGICAL INTERFACE PROTOCOL</span>
        </motion.div>

        {/* Hero Title & Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ maxWidth: '840px' }}
        >
          <h1
            style={{
              fontSize: 'clamp(42px, 6.5vw, 68px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              marginBottom: '16px'
            }}
          >
            UI DNA
          </h1>

          <h2
            className="text-gradient-cyan"
            style={{
              fontSize: 'clamp(24px, 3.8vw, 36px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              marginBottom: '14px'
            }}
          >
            “Every interface has a genetic signature.”
          </h2>

          <p
            style={{
              fontSize: 'clamp(15px, 2vw, 19px)',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            Analyze. Visualize. Mutate. Evolve.
          </p>
        </motion.div>

        {/* Primary & Secondary Call-to-Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <button
            onClick={() => onNavigate('lab')}
            className="btn-primary"
            style={{ padding: '14px 34px', fontSize: '14px' }}
          >
            <Dna size={16} />
            CREATE DNA
          </button>

          <button
            onClick={() => onNavigate('lab')}
            className="btn-secondary"
            style={{ padding: '14px 30px', fontSize: '14px' }}
          >
            <Compass size={16} />
            EXPLORE DEMO
          </button>
        </motion.div>

        {/* Living Animated 3D DNA Double Helix Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            width: '100%',
            maxWidth: '1000px',
            marginTop: '20px',
            background: 'rgba(8, 12, 18, 0.75)',
            border: '1px solid var(--border-hairline)',
            borderRadius: '10px',
            position: 'relative',
            boxShadow: '0 0 50px rgba(0, 242, 254, 0.08)',
            overflow: 'hidden'
          }}
          className="tech-corners"
        >
          <div
            style={{
              padding: '12px 18px',
              borderBottom: '1px solid var(--border-hairline)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(12, 18, 28, 0.5)'
            }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-cyan)' }}>
              LIVE SPECIMEN SYNTHESIS • INTERACTIVE DOUBLE HELIX
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
              MOVE CURSOR TO ALTER ROTATIONAL VELOCITY
            </span>
          </div>

          <DNAHelixHero interactive={true} />
        </motion.div>
      </section>

      {/* Immediate Interactive 10-Second Evolution Experiment */}
      <section
        style={{
          padding: '40px 24px',
          maxWidth: '1140px',
          margin: '0 auto',
          width: '100%'
        }}
      >
        <div
          className="lab-panel tech-corners"
          style={{
            padding: 'clamp(18px, 4vw, 32px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '24px',
            alignItems: 'center',
            background: 'linear-gradient(135deg, rgba(14, 20, 32, 0.8) 0%, rgba(8, 12, 18, 0.95) 100%)'
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-pink)', fontWeight: 700, letterSpacing: '0.08em' }}>
              INSTANT KINETIC PHENOTYPE DEMO
            </div>
            <h3 style={{ fontSize: '24px', color: '#ffffff', fontWeight: 800, marginTop: '4px' }}>
              Observe Real-Time Genome Morphing
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: 1.6 }}>
              Adjust the Motion and Radius genomes below. The biological DNA lattice and orbital nodes physically recalibrate and morph in real-time.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
              <div className="trait-control-item">
                <div className="trait-control-top">
                  <span className="trait-name-badge">MOTION GENOME</span>
                  <span className="trait-val-indicator" style={{ color: 'var(--accent-cyan)' }}>{demoMotion}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="98"
                  value={demoMotion}
                  onChange={(e) => setDemoMotion(Number(e.target.value))}
                  className="tech-slider"
                />
              </div>

              <div className="trait-control-item">
                <div className="trait-control-top">
                  <span className="trait-name-badge">RADIUS GENOME</span>
                  <span className="trait-val-indicator" style={{ color: 'var(--accent-emerald)' }}>{demoRadius}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={demoRadius}
                  onChange={(e) => setDemoRadius(Number(e.target.value))}
                  className="tech-slider"
                />
              </div>

              <button
                onClick={() => onNavigate('lab')}
                className="btn-mutate"
                style={{ alignSelf: 'flex-start', padding: '10px 20px', marginTop: '8px' }}
              >
                <Zap size={14} />
                ENTER MUTATION LAB →
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <DNAVisualizer
              traits={demoTraits}
              dnaId="UD-LIVE-DEMO"
              classification="Dynamic / Responsive / Adaptive"
              size={360}
              interactive={true}
              showLabels={true}
            />
          </div>
        </div>
      </section>

      {/* Preset Specimen Profiles */}
      <section
        style={{
          padding: '40px 24px 80px',
          maxWidth: '1240px',
          margin: '0 auto',
          width: '100%'
        }}
      >
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-cyan)', letterSpacing: '0.1em', fontWeight: 700 }}>
            GENETIC ARCHETYPES
          </div>
          <h2 style={{ fontSize: '28px', color: '#ffffff', fontWeight: 800, marginTop: '4px' }}>
            Pre-Loaded DNA Profiles
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Select an archetype specimen to import and begin mutating in the laboratory.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '20px'
          }}
        >
          {DEMO_PRESETS.map((preset) => (
            <div
              key={preset.name}
              className="lab-panel tech-corners"
              style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
              onClick={() => onLoadPreset(preset)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                  ARCHETYPE
                </span>
                <ChevronRight size={14} color="var(--text-muted)" />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <MiniDNA traits={preset.traits} size={64} />
                <div>
                  <h3 style={{ fontSize: '17px', color: '#ffffff', fontWeight: 700 }}>
                    {preset.name}
                  </h3>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.4 }}>
                    {preset.tagline}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  paddingTop: '10px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px'
                }}
              >
                <span style={{ color: 'var(--text-muted)' }}>Motion: {preset.traits.motion}</span>
                <span style={{ color: 'var(--text-muted)' }}>Radius: {preset.traits.radius}</span>
                <span style={{ color: 'var(--text-muted)' }}>Contrast: {preset.traits.contrast}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Laboratory Scientific Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border-hairline)',
          background: 'rgba(8, 12, 18, 0.95)',
          padding: '24px',
          textAlign: 'center',
          marginTop: 'auto'
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--text-secondary)',
            letterSpacing: '0.04em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap'
          }}
        >
          <span>Copyright © 2026 UI DNA</span>
          <span style={{ color: 'var(--accent-cyan)' }}>•</span>
          <span style={{ color: '#ffffff', fontWeight: 600 }}>
            Developed by:- Aditya Kumar Jha
          </span>
          <span style={{ color: 'var(--accent-cyan)' }}>•</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
            Visual DNA Laboratory Protocol
          </span>
        </div>
      </footer>
    </div>
  );
}
