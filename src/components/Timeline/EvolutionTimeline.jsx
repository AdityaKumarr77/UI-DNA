import React from 'react';
import { motion } from 'framer-motion';
import { Clock, History, Plus, ChevronRight } from 'lucide-react';
import MiniDNA from '../DNA/MiniDNA';

export default function EvolutionTimeline({
  history = [],
  currentVersion = 1,
  onSelectVersion,
  onSnapshot
}) {
  return (
    <div className="lab-bottom-timeline">
      {/* Timeline Meta Header */}
      <div className="timeline-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <History size={12} color="var(--accent-cyan)" />
          <span style={{ fontWeight: 700, color: '#ffffff' }}>EVOLUTION TIMELINE</span>
          <span>•</span>
          <span>{history.length} REGISTERED GENERATIONS</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span>CURRENT: GEN-V{currentVersion}</span>
          <button
            onClick={onSnapshot}
            className="btn-secondary"
            style={{
              padding: '3px 8px',
              fontSize: '10px',
              height: '20px',
              gap: '4px'
            }}
          >
            <Plus size={10} />
            Snapshot Branch
          </button>
        </div>
      </div>

      {/* Horizontal Version Track */}
      <div className="timeline-track">
        {history.map((ver, index) => {
          const isActive = ver.version === currentVersion;
          const uniqueKey = `${ver.id || 'gen'}-v${ver.version}-${index}`;

          return (
            <React.Fragment key={uniqueKey}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectVersion(ver)}
                className={`version-node-pill ${isActive ? 'active' : ''}`}
                style={{
                  position: 'relative'
                }}
              >
                {/* Mini Visual DNA Specimen */}
                <MiniDNA traits={ver.traits} size={28} />

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        fontWeight: 800,
                        color: isActive ? 'var(--accent-cyan)' : '#ffffff'
                      }}
                    >
                      V{ver.version}
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        color: isActive ? '#ffffff' : 'var(--text-secondary)',
                        fontWeight: 600,
                        maxWidth: '160px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {ver.name}
                    </span>
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9.5px',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Clock size={9} />
                    {ver.timestamp || 'GENESIS'}
                  </div>
                </div>

                {isActive && (
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: 'var(--accent-cyan)',
                      boxShadow: '0 0 8px var(--accent-cyan)'
                    }}
                  />
                )}
              </motion.div>

              {index < history.length - 1 && (
                <div style={{ color: 'var(--border-subtle)', display: 'flex', alignItems: 'center' }}>
                  <ChevronRight size={14} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
