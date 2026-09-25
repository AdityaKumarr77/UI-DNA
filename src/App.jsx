import React, { useState, useEffect } from 'react';
import Header from './components/UI/Header';
import Home from './pages/Home';
import Lab from './pages/Lab';
import Analyzer from './pages/Analyzer';
import Compare from './pages/Compare';
import Library from './pages/Library';
import MutationModal from './components/MutationLab/MutationModal';
import ExportModal from './components/Export/ExportModal';
import CommandPalette from './components/CommandPalette/CommandPalette';
import { useLocalStorage } from './hooks/useLocalStorage';
import { 
  createDefaultDNA, 
  generateDNAId, 
  classifyDNA 
} from './utils/dnaEngine';
import { getHydratedPresets } from './utils/presets';
import './styles/laboratory.css';

export default function App() {
  const [library, setLibrary] = useLocalStorage('ui_dna_library_v2', getHydratedPresets());
  const [activeDNA, setActiveDNA] = useLocalStorage('ui_dna_active_v2', () => library[0] || createDefaultDNA());

  const [activePage, setActivePage] = useState('home'); // 'home' | 'lab' | 'analyzer' | 'compare' | 'library'
  const [compareTargetDNA, setCompareTargetDNA] = useState(null);
  const [isMutationOpen, setIsMutationOpen] = useState(false);
  const [mutationTargetTrait, setMutationTargetTrait] = useState('motion');
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts if user is typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      } else if (e.key === 'm' || e.key === 'M') {
        setIsMutationOpen(true);
      } else if (e.key === 'e' || e.key === 'E') {
        setIsExportOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update a single trait value on the active DNA
  const handleChangeTrait = (traitId, value) => {
    setActiveDNA(prev => {
      const updatedTraits = {
        ...prev.traits,
        [traitId]: value
      };
      const id = generateDNAId(updatedTraits);
      const classification = classifyDNA(updatedTraits);

      const updated = {
        ...prev,
        id,
        traits: updatedTraits,
        classification
      };

      // Also sync back to library if it exists there
      setLibrary(lib => lib.map(item => item.id === prev.id ? updated : item));
      return updated;
    });
  };

  // Adopt an evolutionary mutation from Mutation Lab
  const handleAdoptMutation = (variant) => {
    setActiveDNA(prev => {
      const newVersion = (prev.version || 1) + 1;
      const newId = variant.id;
      const newTraits = { ...variant.traits };
      const newClassification = variant.classification;

      const newHistoryEntry = {
        version: newVersion,
        id: newId,
        name: `Gen-${newVersion}: ${variant.title}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        traits: newTraits
      };

      const evolvedDNA = {
        ...prev,
        id: newId,
        version: newVersion,
        traits: newTraits,
        classification: newClassification,
        history: [...(prev.history || []), newHistoryEntry]
      };

      // Add to or update library
      setLibrary(lib => {
        const exists = lib.some(item => item.id === evolvedDNA.id);
        if (exists) {
          return lib.map(item => item.id === evolvedDNA.id ? evolvedDNA : item);
        }
        return [evolvedDNA, ...lib];
      });

      return evolvedDNA;
    });
  };

  // Restore previous version from the Evolution History timeline
  const handleSelectVersion = (versionObj) => {
    setActiveDNA(prev => {
      const restoredTraits = { ...versionObj.traits };
      const id = generateDNAId(restoredTraits);
      const classification = classifyDNA(restoredTraits);

      return {
        ...prev,
        id,
        version: versionObj.version,
        traits: restoredTraits,
        classification
      };
    });
  };

  // Manually snapshot current workspace as milestone
  const handleSnapshotVersion = () => {
    setActiveDNA(prev => {
      const newVer = (prev.version || 1) + 1;
      const snapshotEntry = {
        version: newVer,
        id: prev.id,
        name: `Manual Branch Milestone`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        traits: { ...prev.traits }
      };

      const updated = {
        ...prev,
        version: newVer,
        history: [...(prev.history || []), snapshotEntry]
      };

      setLibrary(lib => lib.map(item => item.id === prev.id ? updated : item));
      return updated;
    });
  };

  // Reset active DNA to Genesis default
  const handleResetDNA = () => {
    const genesis = createDefaultDNA({ name: 'Calibrated Genesis' });
    setActiveDNA(genesis);
    setLibrary(lib => [genesis, ...lib.filter(i => i.id !== genesis.id)]);
  };

  // Apply traits synthesized from Analysis Lab
  const handleApplySynthesizedDNA = (traits) => {
    const id = generateDNAId(traits);
    const classification = classifyDNA(traits);
    const newDNA = {
      id,
      name: `Synthesized UI Specimen`,
      version: 1,
      createdAt: new Date().toISOString(),
      traits,
      classification,
      history: [
        {
          version: 1,
          id,
          name: 'Laboratory Synthesis Genesis',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          traits
        }
      ]
    };

    setActiveDNA(newDNA);
    setLibrary(lib => [newDNA, ...lib]);
  };

  // Load preset from homepage or presets menu
  const handleLoadPreset = (preset) => {
    const id = generateDNAId(preset.traits);
    const classification = classifyDNA(preset.traits);
    const specimen = {
      id,
      name: preset.name,
      tagline: preset.tagline,
      version: 1,
      createdAt: new Date().toISOString(),
      traits: { ...preset.traits },
      classification,
      isPreset: true,
      history: [
        {
          version: 1,
          id,
          name: `${preset.name} Genesis`,
          timestamp: 'Archive Seed',
          traits: { ...preset.traits }
        }
      ]
    };

    setActiveDNA(specimen);
    setActivePage('lab');
  };

  // Library actions
  const handleDeleteDNA = (id) => {
    setLibrary(lib => lib.filter(i => i.id !== id));
  };

  const handleDuplicateDNA = (item) => {
    const duplicated = {
      ...item,
      id: generateDNAId({ ...item.traits, motion: Math.min(100, (item.traits.motion || 50) + 1) }),
      name: `${item.name} (Clone)`,
      createdAt: new Date().toISOString(),
      isPreset: false
    };
    setLibrary(lib => [duplicated, ...lib]);
  };

  const handleCompareWithActive = (targetDNA) => {
    setCompareTargetDNA(targetDNA);
    setActivePage('compare');
  };

  // Command Palette dispatch
  const handleExecuteCommand = (cmdId) => {
    switch (cmdId) {
      case 'create-dna':
        handleResetDNA();
        setActivePage('lab');
        break;
      case 'analyze-ui':
        setActivePage('analyzer');
        break;
      case 'mutate-dna':
        setIsMutationOpen(true);
        break;
      case 'compare-dna':
        setActivePage('compare');
        break;
      case 'toggle-preview':
        setActivePage('lab');
        break;
      case 'evolution-history':
        setActivePage('lab');
        break;
      case 'export-dna':
        setIsExportOpen(true);
        break;
      case 'import-dna':
        setIsExportOpen(true);
        break;
      case 'load-minimal':
        handleLoadPreset(library.find(i => i.name === 'Minimal Core') || library[0]);
        break;
      case 'load-neon':
        handleLoadPreset(library.find(i => i.name === 'Neon Pulse') || library[1] || library[0]);
        break;
      case 'load-editorial':
        handleLoadPreset(library.find(i => i.name === 'Editorial') || library[2] || library[0]);
        break;
      case 'load-organic':
        handleLoadPreset(library.find(i => i.name === 'Organic') || library[3] || library[0]);
        break;
      case 'reset-workspace':
        handleResetDNA();
        break;
      default:
        break;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      {/* Top Laboratory Navigation Bar */}
      <Header
        activePage={activePage}
        onNavigate={setActivePage}
        activeDNA={activeDNA}
        onOpenMutate={() => {
          setMutationTargetTrait('motion');
          setIsMutationOpen(true);
        }}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Routed Page Views */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {activePage === 'home' && (
          <Home
            onNavigate={setActivePage}
            onLoadPreset={handleLoadPreset}
          />
        )}

        {activePage === 'lab' && (
          <Lab
            currentDNA={activeDNA}
            onChangeTrait={handleChangeTrait}
            onOpenMutationLab={(traitId) => {
              setMutationTargetTrait(traitId);
              setIsMutationOpen(true);
            }}
            onSelectVersion={handleSelectVersion}
            onSnapshotVersion={handleSnapshotVersion}
            onResetDNA={handleResetDNA}
          />
        )}

        {activePage === 'analyzer' && (
          <Analyzer
            currentTraits={activeDNA.traits}
            onApplySynthesizedDNA={handleApplySynthesizedDNA}
            onNavigate={setActivePage}
          />
        )}

        {activePage === 'compare' && (
          <Compare
            activeDNA={activeDNA}
            library={library}
            initialTargetDNA={compareTargetDNA}
          />
        )}

        {activePage === 'library' && (
          <Library
            library={library}
            activeDNA={activeDNA}
            onLoadDNA={(dna) => {
              setActiveDNA(dna);
              setActivePage('lab');
            }}
            onDeleteDNA={handleDeleteDNA}
            onDuplicateDNA={handleDuplicateDNA}
            onCompareWithActive={handleCompareWithActive}
          />
        )}
      </main>

      {/* Mutation Lab Modal */}
      <MutationModal
        isOpen={isMutationOpen}
        onClose={() => setIsMutationOpen(false)}
        currentDNA={activeDNA}
        targetTraitId={mutationTargetTrait}
        onAdoptMutation={handleAdoptMutation}
      />

      {/* Export / Share / Import Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        dnaProfile={activeDNA}
        onImportDNA={(imported) => {
          setActiveDNA(imported);
          setLibrary(lib => [imported, ...lib]);
          setActivePage('lab');
        }}
      />

      {/* Command Palette (Ctrl + K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={setIsCommandPaletteOpen}
        onExecuteCommand={handleExecuteCommand}
      />
    </div>
  );
}
