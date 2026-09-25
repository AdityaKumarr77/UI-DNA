import { generateDNAId, classifyDNA } from './dnaEngine';

export const DEMO_PRESETS = [
  {
    name: 'Minimal Core',
    tagline: 'Stripped architectural purity with zero superfluous momentum',
    traits: {
      color: 35,
      typography: 52,
      spacing: 68,
      radius: 12,
      shadow: 20,
      contrast: 62,
      density: 22,
      motion: 18,
      layout: 45,
      component: 38,
      interaction: 40,
      complexity: 18,
      primaryColor: '#708090',
      secondaryColor: '#2f3542',
      accentColor: '#00f2fe'
    }
  },
  {
    name: 'Neon Pulse',
    tagline: 'High kinetic velocity with hyper-saturated photonic luminance',
    traits: {
      color: 94,
      typography: 78,
      spacing: 52,
      radius: 58,
      shadow: 88,
      contrast: 92,
      density: 65,
      motion: 95,
      layout: 72,
      component: 82,
      interaction: 94,
      complexity: 84,
      primaryColor: '#00f2fe',
      secondaryColor: '#f953c6',
      accentColor: '#38ef7d'
    }
  },
  {
    name: 'Editorial',
    tagline: 'Monospaced optical prestige with generous typographic cadence',
    traits: {
      color: 54,
      typography: 92,
      spacing: 86,
      radius: 6,
      shadow: 32,
      contrast: 82,
      density: 40,
      motion: 24,
      layout: 78,
      component: 64,
      interaction: 48,
      complexity: 42,
      primaryColor: '#e0e0e0',
      secondaryColor: '#888888',
      accentColor: '#ff6a00'
    }
  },
  {
    name: 'Organic',
    tagline: 'Cellular curvature with diffused ambient luminescence and breathing rhythms',
    traits: {
      color: 74,
      typography: 64,
      spacing: 78,
      radius: 94,
      shadow: 82,
      contrast: 50,
      density: 48,
      motion: 62,
      layout: 58,
      component: 60,
      interaction: 74,
      complexity: 56,
      primaryColor: '#38ef7d',
      secondaryColor: '#11998e',
      accentColor: '#a8ff78'
    }
  }
];

export function getHydratedPresets() {
  return DEMO_PRESETS.map((preset, index) => {
    const id = generateDNAId(preset.traits);
    const classification = classifyDNA(preset.traits);
    return {
      id,
      name: preset.name,
      tagline: preset.tagline,
      version: 1,
      createdAt: new Date(Date.now() - (index + 1) * 3600000 * 24).toISOString(),
      traits: { ...preset.traits },
      classification,
      isPreset: true,
      history: [
        {
          version: 1,
          id,
          name: `${preset.name} Genesis`,
          timestamp: 'Archive 0.1',
          traits: { ...preset.traits }
        }
      ]
    };
  });
}
