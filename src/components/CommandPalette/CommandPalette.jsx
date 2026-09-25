import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Dna, 
  Sliders, 
  Zap, 
  GitCompare, 
  History, 
  Download, 
  Upload, 
  Eye, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

export default function CommandPalette({
  isOpen,
  onClose,
  onExecuteCommand
}) {
  const [search, setSearch] = useState('');

  const commands = [
    { id: 'create-dna', label: 'Create New DNA Specimen', category: 'Genesis', icon: Dna, shortcut: 'N' },
    { id: 'analyze-ui', label: 'Open Analysis Lab', category: 'Analysis', icon: Sliders, shortcut: 'A' },
    { id: 'mutate-dna', label: 'Mutate Active DNA (Open Mutation Lab)', category: 'Evolution', icon: Zap, shortcut: 'M' },
    { id: 'compare-dna', label: 'Compare Specimen Profiles', category: 'Comparative', icon: GitCompare, shortcut: 'C' },
    { id: 'toggle-preview', label: 'Toggle Live Interface Preview', category: 'Simulation', icon: Eye, shortcut: 'P' },
    { id: 'evolution-history', label: 'Open Evolution History Timeline', category: 'Archive', icon: History, shortcut: 'H' },
    { id: 'export-dna', label: 'Export DNA Profile (JSON & Share Card)', category: 'Dissemination', icon: Download, shortcut: 'E' },
    { id: 'import-dna', label: 'Import DNA Profile from JSON', category: 'Dissemination', icon: Upload, shortcut: 'I' },
    { id: 'load-minimal', label: 'Load Preset: Minimal Core', category: 'Presets', icon: Sparkles },
    { id: 'load-neon', label: 'Load Preset: Neon Pulse', category: 'Presets', icon: Sparkles },
    { id: 'load-editorial', label: 'Load Preset: Editorial', category: 'Presets', icon: Sparkles },
    { id: 'load-organic', label: 'Load Preset: Organic', category: 'Presets', icon: Sparkles },
    { id: 'reset-workspace', label: 'Reset Laboratory Workspace', category: 'System', icon: RotateCcw }
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose(prev => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        onClose(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="lab-modal-overlay" onClick={() => onClose(false)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -15 }}
        transition={{ duration: 0.16 }}
        className="lab-modal-card"
        style={{ maxWidth: '620px', background: 'rgba(10, 14, 22, 0.96)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 20px',
            borderBottom: '1px solid var(--border-hairline)'
          }}
        >
          <Search size={18} color="var(--accent-cyan)" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or genetic protocol..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontFamily: 'var(--font-mono)',
              fontSize: '14px'
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              padding: '2px 6px',
              background: 'rgba(255, 255, 255, 0.08)',
              color: 'var(--text-muted)',
              borderRadius: '3px'
            }}
          >
            ESC
          </span>
        </div>

        {/* Command List */}
        <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '10px' }}>
          {filteredCommands.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
              No matching genomic commands found.
            </div>
          ) : (
            filteredCommands.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <div
                  key={cmd.id}
                  onClick={() => {
                    onExecuteCommand(cmd.id);
                    onClose(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 242, 254, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '4px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-cyan)'
                      }}
                    >
                      <Icon size={14} />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', color: '#ffffff', fontWeight: 500 }}>
                        {cmd.label}
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
                        {cmd.category}
                      </div>
                    </div>
                  </div>

                  {cmd.shortcut && (
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--text-muted)',
                        background: 'rgba(255, 255, 255, 0.04)',
                        padding: '2px 8px',
                        borderRadius: '3px'
                      }}
                    >
                      {cmd.shortcut}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </motion.div>
    </div>
  );
}
