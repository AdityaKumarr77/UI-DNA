import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateDNAVisualGeometry } from '../../utils/dnaEngine';

export default function DNAVisualizer({
  traits,
  dnaId,
  classification,
  selectedTraitId,
  onSelectTrait,
  size = 540,
  interactive = true,
  showLabels = true
}) {
  const [hoveredTrait, setHoveredTrait] = useState(null);
  const filterId = useId();

  const geometry = calculateDNAVisualGeometry(traits || {}, size);
  const { center, nodes, rungs, outerPath, innerPath, coreRadius } = geometry;

  const activeTrait = hoveredTrait || nodes.find(n => n.id === selectedTraitId) || null;

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        maxWidth: '100%',
        maxHeight: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none'
      }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        style={{ overflow: 'visible', filter: 'drop-shadow(0 0 30px rgba(0, 242, 254, 0.12))' }}
      >
        <defs>
          <filter id={`dna-glow-${filterId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id={`core-glow-${filterId}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <radialGradient id={`core-grad-${filterId}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#111a2e" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#06080d" stopOpacity="0.95" />
          </radialGradient>

          <linearGradient id={`outer-stroke-${filterId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#9b51e0" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#38ef7d" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Ambient Technical Coordinate Rings */}
        <circle
          cx={center}
          cy={center}
          r={size * 0.46}
          fill="none"
          stroke="rgba(0, 242, 254, 0.05)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <circle
          cx={center}
          cy={center}
          r={size * 0.34}
          fill="none"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="1"
        />
        <circle
          cx={center}
          cy={center}
          r={size * 0.22}
          fill="none"
          stroke="rgba(0, 242, 254, 0.08)"
          strokeWidth="1"
          strokeDasharray="2 4"
        />

        {/* Helical Codon Cross-Bridge Rungs */}
        <g className="codon-rungs">
          {rungs.map((rung) => {
            const isSelected = activeTrait && (rung.id.includes(activeTrait.id) || rung.color === activeTrait.color);
            return (
              <motion.line
                key={rung.id}
                x1={rung.x1}
                y1={rung.y1}
                x2={rung.x2}
                y2={rung.y2}
                stroke={isSelected ? '#00f2fe' : rung.color}
                strokeWidth={isSelected ? rung.weight + 1.5 : rung.weight}
                strokeOpacity={isSelected ? 0.9 : rung.opacity}
                initial={false}
                animate={{
                  x1: rung.x1,
                  y1: rung.y1,
                  x2: rung.x2,
                  y2: rung.y2,
                  strokeOpacity: isSelected ? 0.95 : rung.opacity
                }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              />
            );
          })}
        </g>

        {/* Inner Helical Strand Path */}
        <motion.path
          d={innerPath}
          fill="rgba(0, 242, 254, 0.02)"
          stroke="rgba(79, 172, 254, 0.35)"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          initial={false}
          animate={{ d: innerPath }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />

        {/* Outer Perimeter Strand Path */}
        <motion.path
          d={outerPath}
          fill="none"
          stroke={`url(#outer-stroke-${filterId})`}
          strokeWidth="2"
          filter={`url(#dna-glow-${filterId})`}
          initial={false}
          animate={{ d: outerPath }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />

        {/* Central Genetic Core / Nucleus */}
        <g className="core-nucleus">
          <circle
            cx={center}
            cy={center}
            r={coreRadius + 14}
            fill="none"
            stroke="rgba(0, 242, 254, 0.15)"
            strokeWidth="1"
            strokeDasharray="6 4"
            className="animate-spin"
            style={{ transformOrigin: `${center}px ${center}px`, animationDuration: '24s' }}
          />
          <circle
            cx={center}
            cy={center}
            r={coreRadius}
            fill={`url(#core-grad-${filterId})`}
            stroke="rgba(0, 242, 254, 0.5)"
            strokeWidth="1.5"
            filter={`url(#core-glow-${filterId})`}
          />

          {/* Central Holographic DNA Identity Text */}
          <text
            x={center}
            y={center - 10}
            textAnchor="middle"
            fill="#ffffff"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em'
            }}
          >
            {dnaId || 'UD-SPECIMEN'}
          </text>
          <text
            x={center}
            y={center + 12}
            textAnchor="middle"
            fill="var(--accent-cyan)"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '8px',
              fontWeight: 600,
              letterSpacing: '0.06em',
              opacity: 0.9
            }}
          >
            {activeTrait ? `${activeTrait.symbol} • ${activeTrait.value}%` : (classification || 'GENOME ACTIVE')}
          </text>
        </g>

        {/* 12 Major Genome Nodes */}
        <g className="genome-nodes">
          {nodes.map((node) => {
            const isSelected = selectedTraitId === node.id;
            const isHovered = hoveredTrait?.id === node.id;
            const isTarget = isSelected || isHovered;

            return (
              <g
                key={node.id}
                style={{ cursor: interactive ? 'pointer' : 'default' }}
                onMouseEnter={() => interactive && setHoveredTrait(node)}
                onMouseLeave={() => interactive && setHoveredTrait(null)}
                onClick={() => interactive && onSelectTrait?.(node.id)}
              >
                {/* Node Target Halo when selected or hovered */}
                {isTarget && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.nodeSize + 10}
                    fill="none"
                    stroke={node.color}
                    strokeWidth="1"
                    strokeDasharray="2 3"
                    className="animate-spin"
                    style={{ transformOrigin: `${node.x}px ${node.y}px`, animationDuration: '6s' }}
                  />
                )}

                {/* Outer Glow Halo */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isTarget ? node.nodeSize + 6 : node.nodeSize + 2}
                  fill={node.color}
                  fillOpacity={isTarget ? 0.35 : 0.15}
                  filter={`url(#dna-glow-${filterId})`}
                />

                {/* Primary Node Body */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={isTarget ? node.nodeSize + 2 : node.nodeSize}
                  fill={node.color}
                  stroke="#ffffff"
                  strokeWidth={isTarget ? 2 : 1}
                  initial={false}
                  animate={{
                    cx: node.x,
                    cy: node.y,
                    r: isTarget ? node.nodeSize + 2 : node.nodeSize
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />

                {/* Inner companion node */}
                <circle
                  cx={node.innerX}
                  cy={node.innerY}
                  r="3.5"
                  fill="#ffffff"
                  fillOpacity="0.75"
                />

                {/* Node Trait Label (Symbol & Value) */}
                {showLabels && (
                  <text
                    x={node.x + (node.x > center ? 14 : -14)}
                    y={node.y + 4}
                    textAnchor={node.x > center ? 'start' : 'end'}
                    fill={isTarget ? '#ffffff' : 'rgba(255, 255, 255, 0.65)'}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: isTarget ? '11px' : '9.5px',
                      fontWeight: isTarget ? 700 : 500,
                      pointerEvents: 'none',
                      textShadow: isTarget ? '0 0 8px rgba(0, 242, 254, 0.8)' : 'none'
                    }}
                  >
                    {node.symbol} {Math.round(node.value)}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Floating Active Trait Telemetry Card on Hover */}
      <AnimatePresence>
        {activeTrait && interactive && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'absolute',
              bottom: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(10, 15, 24, 0.92)',
              border: `1px solid ${activeTrait.color}`,
              boxShadow: `0 0 20px ${activeTrait.color}40`,
              borderRadius: 6,
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              backdropFilter: 'blur(10px)',
              pointerEvents: 'none',
              zIndex: 30
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: activeTrait.color,
                boxShadow: `0 0 10px ${activeTrait.color}`
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: '#fff' }}>
                  {activeTrait.name}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: activeTrait.color, fontWeight: 700 }}>
                  [{activeTrait.value}/100]
                </span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                {activeTrait.category} • Click to inspect & mutate
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
