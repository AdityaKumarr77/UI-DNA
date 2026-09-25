import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Cpu, 
  Dna, 
  Zap, 
  Radio, 
  RefreshCw 
} from 'lucide-react';

export default function LiveUIPreview({ traits = {}, dnaId = 'UD-SPECIMEN', classification = '' }) {
  const [activeTab, setActiveTab] = useState('synthesizer');
  const [metricCount, setMetricCount] = useState(1420);
  const [syncState, setSyncState] = useState(true);

  // Derive dynamic CSS tokens from the DNA traits
  const radius = Math.round((traits.radius / 100) * 28);
  const spacing = Math.round(10 + (traits.spacing / 100) * 22);
  const gap = Math.round(8 + (traits.spacing / 100) * 16);
  // Higher density -> tighter padding and compact components
  const paddingY = Math.max(4, Math.round(16 - (traits.density / 100) * 10));
  const paddingX = Math.max(8, Math.round(20 - (traits.density / 100) * 10));
  
  // Typography scale
  const headingSize = Math.round(15 + (traits.typography / 100) * 14);
  const bodySize = Math.round(12 + (traits.typography / 100) * 3);
  const tracking = (traits.typography / 100) * 0.06;

  // Shadow intensity & depth
  const shadowSpread = Math.round((traits.shadow / 100) * 28);
  const shadowAlpha = 0.2 + (traits.shadow / 100) * 0.65;
  const shadowElevation = `0 ${Math.round((traits.shadow / 100) * 16)}px ${shadowSpread}px rgba(0, 0, 0, ${shadowAlpha})`;

  // Contrast & borders
  const borderAlpha = 0.08 + (traits.contrast / 100) * 0.55;
  const cardBorder = `1px solid rgba(255, 255, 255, ${borderAlpha})`;
  const cardBg = traits.contrast > 70 
    ? 'rgba(7, 10, 16, 0.95)' 
    : 'rgba(18, 25, 38, 0.65)';

  // Motion physics
  const springDuration = Math.max(0.12, 0.7 - (traits.motion / 100) * 0.5);
  const hoverScale = 1 + (traits.motion / 100) * 0.05;

  // Reactive Colors
  const primaryColor = traits.primaryColor || '#00f2fe';
  const secondaryColor = traits.secondaryColor || '#4facfe';
  const accentColor = traits.accentColor || '#38ef7d';

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: `${spacing}px`,
        overflowY: 'auto',
        transition: `all ${springDuration}s cubic-bezier(0.16, 1, 0.3, 1)`
      }}
    >
      {/* Living Organism Simulated Container */}
      <div
        style={{
          background: cardBg,
          border: cardBorder,
          borderRadius: `${radius}px`,
          boxShadow: shadowElevation,
          padding: `${spacing}px`,
          display: 'flex',
          flexDirection: 'column',
          gap: `${gap}px`,
          position: 'relative',
          transition: `all ${springDuration}s ease-out`
        }}
      >
        {/* Simulated Window Title Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid rgba(255, 255, 255, ${borderAlpha * 0.6})`,
            paddingBottom: `${paddingY + 2}px`
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: accentColor,
                boxShadow: `0 0 10px ${accentColor}`
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: `${headingSize * 0.85}px`,
                fontWeight: 700,
                letterSpacing: `${tracking}em`,
                color: '#ffffff'
              }}
            >
              SYNTHETIC UI ORGANISM
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                background: 'rgba(255, 255, 255, 0.08)',
                padding: '2px 6px',
                borderRadius: `${Math.min(radius, 4)}px`,
                color: primaryColor
              }}
            >
              {dnaId}
            </span>
          </div>

          {/* Interactive Mode Pills */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {['synthesizer', 'telemetry'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: `${paddingY * 0.7}px ${paddingX * 0.8}px`,
                  borderRadius: `${Math.min(radius, 6)}px`,
                  fontSize: `${bodySize * 0.85}px`,
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  border: activeTab === tab ? `1px solid ${primaryColor}` : '1px solid transparent',
                  background: activeTab === tab ? `${primaryColor}22` : 'rgba(255, 255, 255, 0.04)',
                  color: activeTab === tab ? '#ffffff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: `all ${springDuration}s ease`
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Metric Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: traits.density > 60 ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
            gap: `${gap}px`
          }}
        >
          {/* Card 1: Kinetic Velocity */}
          <motion.div
            whileHover={{ scale: hoverScale }}
            transition={{ duration: springDuration }}
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: cardBorder,
              borderRadius: `${Math.max(2, radius - 4)}px`,
              padding: `${paddingY + 4}px ${paddingX}px`,
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: `${bodySize * 0.85}px`, color: 'var(--text-secondary)' }}>
                Kinetic Energy
              </span>
              <Activity size={14} color={primaryColor} />
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: `${headingSize}px`,
                fontWeight: 700,
                color: primaryColor
              }}
            >
              {Math.round(traits.motion * 1.4)} rad/s
            </div>
            <div
              style={{
                width: '100%',
                height: 4,
                borderRadius: 2,
                background: 'rgba(255, 255, 255, 0.1)',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: `${traits.motion}%`,
                  height: '100%',
                  background: primaryColor,
                  borderRadius: 2
                }}
              />
            </div>
          </motion.div>

          {/* Card 2: Chromatic Salience */}
          <motion.div
            whileHover={{ scale: hoverScale }}
            transition={{ duration: springDuration }}
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: cardBorder,
              borderRadius: `${Math.max(2, radius - 4)}px`,
              padding: `${paddingY + 4}px ${paddingX}px`,
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: `${bodySize * 0.85}px`, color: 'var(--text-secondary)' }}>
                Spatial Density
              </span>
              <Cpu size={14} color={secondaryColor} />
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: `${headingSize}px`,
                fontWeight: 700,
                color: secondaryColor
              }}
            >
              {traits.density}% Flux
            </div>
            <div
              style={{
                width: '100%',
                height: 4,
                borderRadius: 2,
                background: 'rgba(255, 255, 255, 0.1)',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: `${traits.density}%`,
                  height: '100%',
                  background: secondaryColor,
                  borderRadius: 2
                }}
              />
            </div>
          </motion.div>

          {/* Card 3 (if high density) */}
          {traits.density > 60 && (
            <motion.div
              whileHover={{ scale: hoverScale }}
              transition={{ duration: springDuration }}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: cardBorder,
                borderRadius: `${Math.max(2, radius - 4)}px`,
                padding: `${paddingY + 4}px ${paddingX}px`,
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: `${bodySize * 0.85}px`, color: 'var(--text-secondary)' }}>
                  Optical Curvature
                </span>
                <Dna size={14} color={accentColor} />
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: `${headingSize}px`,
                  fontWeight: 700,
                  color: accentColor
                }}
              >
                {radius}px Arc
              </div>
              <div
                style={{
                  width: '100%',
                  height: 4,
                  borderRadius: 2,
                  background: 'rgba(255, 255, 255, 0.1)',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    width: `${traits.radius}%`,
                    height: '100%',
                    background: accentColor,
                    borderRadius: 2
                  }}
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Interactive Action Command Bar */}
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.25)',
            border: cardBorder,
            borderRadius: `${Math.max(2, radius - 4)}px`,
            padding: `${paddingY}px ${paddingX}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: hoverScale }}
              onClick={() => {
                setMetricCount(c => c + 15);
                setSyncState(!syncState);
              }}
              style={{
                background: `linear-gradient(135deg, ${primaryColor}dd, ${secondaryColor}dd)`,
                color: '#06080d',
                border: 'none',
                borderRadius: `${Math.min(radius, 6)}px`,
                padding: `${paddingY}px ${paddingX}px`,
                fontSize: `${bodySize}px`,
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                boxShadow: `0 0 14px ${primaryColor}55`,
                transition: `all ${springDuration}s ease`
              }}
            >
              <Zap size={14} />
              DISCHARGE FLUX
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: hoverScale }}
              onClick={() => setMetricCount(1420)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                border: cardBorder,
                borderRadius: `${Math.min(radius, 6)}px`,
                padding: `${paddingY}px ${paddingX}px`,
                fontSize: `${bodySize}px`,
                fontFamily: 'var(--font-mono)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                transition: `all ${springDuration}s ease`
              }}
            >
              <RefreshCw size={13} />
              CALIBRATE
            </motion.button>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: `${bodySize * 0.9}px`,
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Radio size={12} color={syncState ? accentColor : primaryColor} />
            SYNC: {metricCount} Q-PULSES
          </div>
        </div>

        {/* Biological Telemetry Feed */}
        <div
          style={{
            fontSize: `${bodySize * 0.9}px`,
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-secondary)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '4px'
          }}
        >
          <span>MORPHOLOGY: {classification}</span>
          <span style={{ color: accentColor }}>RADIUS: {radius}px • SPACING: {spacing}px</span>
        </div>
      </div>
    </div>
  );
}
