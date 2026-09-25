/**
 * UI DNA Genetic Engine
 * Handles deterministic DNA hashing, classification, trait definitions,
 * evolutionary mutation algorithms, and geometry calculation.
 */

export const TRAIT_DEFINITIONS = [
  {
    id: 'color',
    name: 'Color Genome',
    symbol: 'CLR',
    category: 'Chromatic Structure',
    description: 'Dictates chromatic temperature, tonal distribution, saturation depth, and spectral vibrancy across the interface.',
    subMetrics: [
      { name: 'Spectral Saturation', factor: 0.95 },
      { name: 'Chromatic Variance', factor: 0.8 },
      { name: 'Tonal Temperature', factor: 0.88 }
    ],
    color: '#00f2fe'
  },
  {
    id: 'typography',
    name: 'Typography Genome',
    symbol: 'TYP',
    category: 'Structural Type',
    description: 'Controls optical hierarchy scale, vertical rhythm, typographic weight distribution, and character tracking ratio.',
    subMetrics: [
      { name: 'Scale Multiplier', factor: 1.0 },
      { name: 'Weight Contrast', factor: 0.85 },
      { name: 'Optical Tracking', factor: 0.75 }
    ],
    color: '#4facfe'
  },
  {
    id: 'spacing',
    name: 'Spacing Genome',
    symbol: 'SPC',
    category: 'Spatial Geometry',
    description: 'Determines the respiratory spatial rhythm, interstitial margins, layout gutters, and macro component breathing room.',
    subMetrics: [
      { name: 'Interstitial Padding', factor: 0.9 },
      { name: 'Rhythm Scale Ratio', factor: 0.82 },
      { name: 'Negative Space Proportion', factor: 0.95 }
    ],
    color: '#38ef7d'
  },
  {
    id: 'radius',
    name: 'Radius Genome',
    symbol: 'RAD',
    category: 'Morphology',
    description: 'Governs boundary curvature, organic vs brutalist edge geometry, and corner continuity across all atomic elements.',
    subMetrics: [
      { name: 'Corner Curvature (px)', factor: 1.0 },
      { name: 'Organic Softness', factor: 0.9 },
      { name: 'Pill Morph Ratio', factor: 0.78 }
    ],
    color: '#11998e'
  },
  {
    id: 'shadow',
    name: 'Shadow Genome',
    symbol: 'SHD',
    category: 'Spatial Depth',
    description: 'Regulates Z-axis elevation, ambient occlusion diffusion, photonic spread, and multi-layered light simulation.',
    subMetrics: [
      { name: 'Z-Axis Elevation', factor: 0.92 },
      { name: 'Diffusion Radius', factor: 0.86 },
      { name: 'Ambient Luminescence', factor: 0.74 }
    ],
    color: '#9b51e0'
  },
  {
    id: 'contrast',
    name: 'Contrast Genome',
    symbol: 'CTR',
    category: 'Perceptual Salience',
    description: 'Establishes foreground-to-background luminance separation, edge boundary demarcation, and accessibility legibility ratios.',
    subMetrics: [
      { name: 'Luminance Delta', factor: 1.0 },
      { name: 'Demarcation Rigidity', factor: 0.85 },
      { name: 'Glyph Legibility', factor: 0.9 }
    ],
    color: '#ff6a00'
  },
  {
    id: 'density',
    name: 'Density Genome',
    symbol: 'DNS',
    category: 'Information Architecture',
    description: 'Encodes information packing efficiency, interactive target compacting, data velocity, and component compactness.',
    subMetrics: [
      { name: 'Information Packing', factor: 0.95 },
      { name: 'Target Compacting', factor: 0.88 },
      { name: 'Data Density Index', factor: 0.92 }
    ],
    color: '#f953c6'
  },
  {
    id: 'motion',
    name: 'Motion Genome',
    symbol: 'MOT',
    category: 'Kinetic Physics',
    description: 'Defines spring physics damping, micro-interaction responsiveness, transition velocity curves, and kinetic resonance.',
    subMetrics: [
      { name: 'Animation Intensity', factor: 0.98 },
      { name: 'Transition Velocity', factor: 0.84 },
      { name: 'Interaction Response', factor: 0.9 }
    ],
    color: '#00c6ff'
  },
  {
    id: 'layout',
    name: 'Layout Genome',
    symbol: 'LAY',
    category: 'Grid & Composition',
    description: 'Orchestrates column grid complexity, asymmetrical balance, viewport adaptability, and structural alignment tension.',
    subMetrics: [
      { name: 'Grid Multi-Track Ratio', factor: 0.86 },
      { name: 'Asymmetry Factor', factor: 0.72 },
      { name: 'Alignment Tension', factor: 0.88 }
    ],
    color: '#f7971e'
  },
  {
    id: 'component',
    name: 'Component Genome',
    symbol: 'CMP',
    category: 'Atomic Anatomy',
    description: 'Controls atomic nesting depth, micro-badge frequency, composite element richness, and structural modularity.',
    subMetrics: [
      { name: 'Hierarchy Nesting Depth', factor: 0.9 },
      { name: 'Adornment Frequency', factor: 0.8 },
      { name: 'State Granularity', factor: 0.85 }
    ],
    color: '#a8ff78'
  },
  {
    id: 'interaction',
    name: 'Interaction Genome',
    symbol: 'INT',
    category: 'Feedback Dynamics',
    description: 'Measures tactile hover elasticity, ripple refraction, focus aperture transitions, and sensory trigger feedback.',
    subMetrics: [
      { name: 'Hover Elasticity', factor: 0.94 },
      { name: 'Focus Aperture Spread', factor: 0.82 },
      { name: 'Tactile Resonance', factor: 0.88 }
    ],
    color: '#ea00d9'
  },
  {
    id: 'complexity',
    name: 'Complexity Genome',
    symbol: 'CPX',
    category: 'Atmospheric Texture',
    description: 'Encodes visual noise filtering, atmospheric scanline texturing, chromatic dispersion, and layered UI depth.',
    subMetrics: [
      { name: 'Visual Noise vs Clarity', factor: 0.85 },
      { name: 'Atmospheric Layering', factor: 0.92 },
      { name: 'Dispersion Entropy', factor: 0.78 }
    ],
    color: '#7158e2'
  }
];

/**
 * Deterministic hash function (FNV-1a 32-bit variant)
 */
function hashString(str) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0;
}

/**
 * Generates deterministic DNA Identifier (e.g., UD-7F4A-91C2)
 */
export function generateDNAId(traits) {
  if (!traits) return 'UD-0000-0000';
  const orderedValues = TRAIT_DEFINITIONS.map(t => Math.round(traits[t.id] ?? 50)).join(':');
  const h1 = hashString(orderedValues);
  const h2 = hashString(orderedValues.split('').reverse().join(''));

  const hex1 = (h1 & 0xffff).toString(16).toUpperCase().padStart(4, '0');
  const hex2 = (h2 & 0xffff).toString(16).toUpperCase().padStart(4, '0');
  return `UD-${hex1}-${hex2}`;
}

/**
 * Generates descriptive, non-judgmental classification based on traits
 */
export function classifyDNA(traits) {
  if (!traits) return 'Standard / Balanced / Static';

  const density = traits.density ?? 50;
  const motion = traits.motion ?? 50;
  const contrast = traits.contrast ?? 50;
  const radius = traits.radius ?? 50;
  const complexity = traits.complexity ?? 50;
  const interaction = traits.interaction ?? 50;

  // Segment 1: Spatial/Density descriptor
  let seg1 = 'Balanced';
  if (density < 30) seg1 = 'Minimal';
  else if (density < 50) seg1 = 'Structured';
  else if (density > 75) seg1 = 'Dense-Information';
  else seg1 = 'Integrated';

  // Segment 2: Kinetic & Perceptual descriptor
  let seg2 = 'Fluid';
  if (motion > 75 && contrast > 70) seg2 = 'Dynamic-Vivid';
  else if (motion > 75) seg2 = 'Hyper-Kinetic';
  else if (motion < 25) seg2 = 'Quiet-Monolithic';
  else if (contrast > 75) seg2 = 'High-Contrast';
  else if (contrast < 30) seg2 = 'Subtle-Muted';
  else if (interaction > 70) seg2 = 'Interactive';

  // Segment 3: Morphology & Texture descriptor
  let seg3 = 'Geometric';
  if (radius > 75) seg3 = 'Organic-Soft';
  else if (radius < 20) seg3 = 'Rigid-Brutalist';
  else if (complexity > 70) seg3 = 'Experimental-Lattice';
  else if (complexity < 30) seg3 = 'Clean-Atomic';
  else seg3 = 'Adaptive';

  return `${seg1} / ${seg2} / ${seg3}`;
}

/**
 * Generates sub-metrics for a specific trait
 */
export function getTraitSubCharacteristics(traitKey, value = 50) {
  const trait = TRAIT_DEFINITIONS.find(t => t.id === traitKey);
  if (!trait) return [];

  return trait.subMetrics.map((sm, index) => {
    // Deterministic minor variance per sub-metric based on trait value
    const variance = Math.sin((value + index * 37) * 0.1) * 8;
    const computedVal = Math.min(100, Math.max(0, Math.round(value * sm.factor + variance)));
    return {
      name: sm.name,
      value: computedVal,
      bars: Math.round(computedVal / 10)
    };
  });
}

/**
 * Creates default DNA structure
 */
export function createDefaultDNA(overrides = {}) {
  const defaultTraits = {
    color: 68,
    typography: 72,
    spacing: 58,
    radius: 46,
    shadow: 52,
    contrast: 78,
    density: 54,
    motion: 64,
    layout: 60,
    component: 66,
    interaction: 70,
    complexity: 48,
    primaryColor: '#00f2fe',
    secondaryColor: '#4facfe',
    accentColor: '#38ef7d',
    ...overrides
  };

  const id = generateDNAId(defaultTraits);
  const classification = classifyDNA(defaultTraits);

  return {
    id,
    name: overrides.name || 'Core Specimen',
    version: overrides.version || 1,
    createdAt: overrides.createdAt || new Date().toISOString(),
    traits: defaultTraits,
    classification,
    history: overrides.history || [
      {
        version: 1,
        id,
        name: 'Initial Profile Genesis',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        traits: { ...defaultTraits }
      }
    ]
  };
}

/**
 * Mutation Engine: Generates 3 distinct evolutionary variations
 */
export function generateMutations(currentDNA, targetTraitKey = null) {
  const currentTraits = { ...currentDNA.traits };

  // Helper to clamp between 0-100
  const clamp = v => Math.min(100, Math.max(5, Math.round(v)));

  // Variation A: Evolutionary Drift (focused local mutation with small harmonic shifts)
  const traitsA = { ...currentTraits };
  const targetA = targetTraitKey || 'motion';
  const deltaA = Math.random() > 0.4 ? 24 : -22;
  traitsA[targetA] = clamp(traitsA[targetA] + deltaA);
  // secondary harmonic adjustment
  const neighborA = targetA === 'motion' ? 'interaction' : (targetA === 'radius' ? 'shadow' : 'spacing');
  traitsA[neighborA] = clamp(traitsA[neighborA] + (deltaA * 0.45));

  const idA = generateDNAId(traitsA);
  const classA = classifyDNA(traitsA);

  // Variation B: Divergent Branch (radical shift / inversion of target or polar axes)
  const traitsB = { ...currentTraits };
  const targetB = targetTraitKey || 'density';
  // Dramatic inversion or jump
  traitsB[targetB] = clamp(currentTraits[targetB] > 50 ? currentTraits[targetB] - 44 : currentTraits[targetB] + 44);
  const neighborB = targetB === 'density' ? 'spacing' : 'contrast';
  traitsB[neighborB] = clamp(100 - currentTraits[neighborB]);
  traitsB.complexity = clamp(currentTraits.complexity + 20);

  const idB = generateDNAId(traitsB);
  const classB = classifyDNA(traitsB);

  // Variation C: Quantum Adaptation (balanced multi-genome resonance shift)
  const traitsC = { ...currentTraits };
  const targetC = targetTraitKey || 'radius';
  traitsC[targetC] = clamp(currentTraits[targetC] > 50 ? 88 : 16);
  traitsC.contrast = clamp(currentTraits.contrast > 50 ? 92 : 45);
  traitsC.motion = clamp(currentTraits.motion > 50 ? 84 : 32);
  traitsC.typography = clamp(currentTraits.typography + 14);

  const idC = generateDNAId(traitsC);
  const classC = classifyDNA(traitsC);

  return [
    {
      code: 'A',
      title: 'Evolutionary Drift',
      branch: 'Branch Alpha-9',
      hypothesis: `Targeted drift in ${targetA.toUpperCase()} (${currentTraits[targetA]} → ${traitsA[targetA]}). Preserves core layout equilibrium while elevating focal sensitivity.`,
      targetTrait: targetA,
      oldValue: currentTraits[targetA],
      newValue: traitsA[targetA],
      traits: traitsA,
      id: idA,
      classification: classA,
      divergence: calculateDivergence(currentTraits, traitsA)
    },
    {
      code: 'B',
      title: 'Divergent Branch',
      branch: 'Branch Beta-X',
      hypothesis: `Radical morphological branch in ${targetB.toUpperCase()} (${currentTraits[targetB]} → ${traitsB[targetB]}). Explores extreme spatial density and inverted depth topology.`,
      targetTrait: targetB,
      oldValue: currentTraits[targetB],
      newValue: traitsB[targetB],
      traits: traitsB,
      id: idB,
      classification: classB,
      divergence: calculateDivergence(currentTraits, traitsB)
    },
    {
      code: 'C',
      title: 'Quantum Adaptation',
      branch: 'Branch Gamma-Q',
      hypothesis: `Harmonic multi-genome equilibrium shift across ${targetC.toUpperCase()} and visual resonance axes. Re-tunes optical weights for elevated sensory hierarchy.`,
      targetTrait: targetC,
      oldValue: currentTraits[targetC],
      newValue: traitsC[targetC],
      traits: traitsC,
      id: idC,
      classification: classC,
      divergence: calculateDivergence(currentTraits, traitsC)
    }
  ];
}

/**
 * Calculates neutral scientific divergence between two DNA trait sets
 */
export function calculateDivergence(traitsA, traitsB) {
  if (!traitsA || !traitsB) return { averageDelta: 0, maxDeltaTrait: 'none', traitDeltas: {} };

  let totalDiff = 0;
  let maxDiff = -1;
  let maxTrait = TRAIT_DEFINITIONS[0].id;
  const traitDeltas = {};

  TRAIT_DEFINITIONS.forEach(def => {
    const valA = traitsA[def.id] ?? 50;
    const valB = traitsB[def.id] ?? 50;
    const delta = valB - valA;
    const absDelta = Math.abs(delta);
    traitDeltas[def.id] = {
      valA,
      valB,
      delta,
      absDelta,
      name: def.name,
      symbol: def.symbol,
      color: def.color
    };
    totalDiff += absDelta;
    if (absDelta > maxDiff) {
      maxDiff = absDelta;
      maxTrait = def.name;
    }
  });

  const averageDelta = Math.round(totalDiff / TRAIT_DEFINITIONS.length);
  const divergencePercentage = Math.min(100, Math.round((totalDiff / (TRAIT_DEFINITIONS.length * 100)) * 100));

  return {
    averageDelta,
    divergencePercentage,
    maxDeltaTrait: maxTrait,
    maxDeltaValue: maxDiff,
    traitDeltas
  };
}

/**
 * Calculates deterministic visual geometry for the DNA fingerprint.
 * Generates orbital rings, codon rungs, chromosome arcs, and particle nodes.
 */
export function calculateDNAVisualGeometry(traits, size = 600) {
  const center = size / 2;
  const traitsList = TRAIT_DEFINITIONS.map(def => ({
    ...def,
    value: traits[def.id] ?? 50
  }));

  const numNodes = traitsList.length;
  const baseRadius = size * 0.34;

  // Node positions along a harmonic dual-spiral / orbital ring
  const nodes = traitsList.map((trait, index) => {
    const angle = (index / numNodes) * Math.PI * 2 - Math.PI / 2;
    // Trait value modifies orbital radius deterministically
    const radiusOffset = ((trait.value - 50) / 50) * (size * 0.1);
    const r = baseRadius + radiusOffset;
    const x = center + Math.cos(angle) * r;
    const y = center + Math.sin(angle) * r;

    // Inner companion node for helical codon ladder
    const innerRadius = r * 0.48;
    const innerX = center + Math.cos(angle + 0.18) * innerRadius;
    const innerY = center + Math.sin(angle + 0.18) * innerRadius;

    return {
      ...trait,
      index,
      angle,
      r,
      x,
      y,
      innerX,
      innerY,
      glowRadius: 4 + (trait.value / 100) * 8,
      nodeSize: 5 + (trait.value / 100) * 7
    };
  });

  // Codon rungs (cross-connections across the helical lattice)
  const rungs = [];
  for (let i = 0; i < nodes.length; i++) {
    const nodeA = nodes[i];
    const oppositeNode = nodes[(i + 6) % nodes.length];

    // Radial codon connector
    rungs.push({
      id: `rung-radial-${i}`,
      x1: nodeA.innerX,
      y1: nodeA.innerY,
      x2: nodeA.x,
      y2: nodeA.y,
      weight: 1 + (nodeA.value / 100) * 1.5,
      color: nodeA.color,
      opacity: 0.35 + (nodeA.value / 100) * 0.45
    });

    // Cross helical bridge
    if (i < 6) {
      rungs.push({
        id: `rung-cross-${i}`,
        x1: nodeA.innerX,
        y1: nodeA.innerY,
        x2: oppositeNode.innerX,
        y2: oppositeNode.innerY,
        weight: 1,
        color: '#4facfe',
        opacity: 0.2 + ((nodeA.value + oppositeNode.value) / 200) * 0.3
      });
    }
  }

  // Outer perimeter path
  let outerPath = `M ${nodes[0].x} ${nodes[0].y}`;
  for (let i = 0; i < nodes.length; i++) {
    const current = nodes[i];
    const next = nodes[(i + 1) % nodes.length];
    const midAngle = (current.angle + next.angle) / 2;
    const curvatureRadius = ((current.r + next.r) / 2) * 1.05;
    const cx = center + Math.cos(midAngle) * curvatureRadius;
    const cy = center + Math.sin(midAngle) * curvatureRadius;
    outerPath += ` Q ${cx} ${cy}, ${next.x} ${next.y}`;
  }

  // Inner chromosome path
  let innerPath = `M ${nodes[0].innerX} ${nodes[0].innerY}`;
  for (let i = 0; i < nodes.length; i++) {
    const next = nodes[(i + 1) % nodes.length];
    innerPath += ` L ${next.innerX} ${next.innerY}`;
  }
  innerPath += ' Z';

  return {
    center,
    size,
    nodes,
    rungs,
    outerPath,
    innerPath,
    coreRadius: size * 0.12 + ((traits.complexity ?? 50) / 100) * 12
  };
}
