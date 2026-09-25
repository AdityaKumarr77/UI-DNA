import React from 'react';
import { calculateDNAVisualGeometry } from '../../utils/dnaEngine';

export default function MiniDNA({ traits, size = 80, pulse = false }) {
  const geometry = calculateDNAVisualGeometry(traits || {}, size);
  const { center, nodes, outerPath, coreRadius } = geometry;

  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        style={{ overflow: 'visible' }}
      >
        <circle
          cx={center}
          cy={center}
          r={size * 0.44}
          fill="none"
          stroke="rgba(0, 242, 254, 0.12)"
          strokeWidth="1"
          strokeDasharray="2 3"
        />

        {/* Outer loop path */}
        <path
          d={outerPath}
          fill="rgba(0, 242, 254, 0.05)"
          stroke="rgba(0, 242, 254, 0.7)"
          strokeWidth="1.2"
        />

        {/* Core */}
        <circle
          cx={center}
          cy={center}
          r={Math.max(4, coreRadius * 0.35)}
          fill="#00f2fe"
          fillOpacity={pulse ? 0.9 : 0.6}
        />

        {/* Genome nodes */}
        {nodes.map((node) => (
          <circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={Math.max(2, node.nodeSize * 0.4)}
            fill={node.color}
            stroke="#ffffff"
            strokeWidth="0.5"
          />
        ))}
      </svg>
    </div>
  );
}
