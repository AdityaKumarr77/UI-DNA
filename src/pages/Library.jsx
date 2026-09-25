import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MiniDNA from '../components/DNA/MiniDNA';
import { TRAIT_DEFINITIONS } from '../utils/dnaEngine';
import { 
  Search, 
  Trash2, 
  Copy, 
  GitCompare, 
  Clock, 
  Sparkles,
  Layers,
  ArrowUpDown
} from 'lucide-react';

export default function Library({
  library = [],
  activeDNA,
  onLoadDNA,
  onDeleteDNA,
  onDuplicateDNA,
  onCompareWithActive
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date'); // 'date' | 'version' | 'name'

  // Filter & Search
  const filtered = library.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.classification.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filterCategory === 'all') return true;
    if (filterCategory === 'presets') return item.isPreset;
    if (filterCategory === 'custom') return !item.isPreset;
    return true;
  });

  // Sort
  filtered.sort((a, b) => {
    if (sortBy === 'date') return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    if (sortBy === 'version') return (b.version || 1) - (a.version || 1);
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div
      style={{
        flex: 1,
        overflowY: 'auto',
        padding: '32px 24px',
        maxWidth: '1360px',
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}
    >
      {/* Library Banner Header */}
      <div
        style={{
          background: 'rgba(10, 15, 24, 0.7)',
          border: '1px solid var(--border-hairline)',
          borderRadius: '8px',
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--accent-cyan)',
              letterSpacing: '0.1em',
              fontWeight: 700
            }}
          >
            BIO-INFORMATICS ARCHIVE & SPECIMEN VAULT
          </div>
          <h1 style={{ fontSize: '24px', color: '#ffffff', fontWeight: 800, marginTop: '2px' }}>
            DNA Specimen Library
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Catalog of synthesized visual DNA profiles, evolutionary versions, and presets persisted in local storage.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
              STORED SPECIMENS
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '22px', fontWeight: 800, color: 'var(--accent-cyan)' }}>
              {library.length}
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
          background: 'rgba(12, 17, 26, 0.5)',
          padding: '12px 16px',
          borderRadius: '6px',
          border: '1px solid var(--border-hairline)'
        }}
      >
        {/* Search Input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(0, 0, 0, 0.4)',
            padding: '6px 12px',
            borderRadius: '4px',
            border: '1px solid var(--border-subtle)',
            minWidth: '260px'
          }}
        >
          <Search size={14} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search by ID, name, or classification..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              width: '100%'
            }}
          />
        </div>

        {/* Filter Category & Sort Toggles */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '4px', background: 'rgba(0, 0, 0, 0.3)', padding: '2px', borderRadius: '4px' }}>
            {['all', 'custom', 'presets'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                style={{
                  padding: '4px 10px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  border: 'none',
                  borderRadius: '3px',
                  background: filterCategory === cat ? 'rgba(0, 242, 254, 0.18)' : 'transparent',
                  color: filterCategory === cat ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ArrowUpDown size={12} color="var(--text-muted)" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid var(--border-subtle)',
                color: '#ffffff',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                padding: '4px 8px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              <option value="date">Sort by Timestamp</option>
              <option value="version">Sort by Version</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Library Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px'
        }}
      >
        {filtered.map((item) => {
          const isActive = activeDNA && activeDNA.id === item.id;

          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -3, borderColor: 'rgba(0, 242, 254, 0.4)' }}
              className="lab-panel tech-corners"
              style={{
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                background: isActive ? 'rgba(0, 242, 254, 0.04)' : 'var(--bg-panel)',
                borderColor: isActive ? 'var(--accent-cyan)' : 'var(--border-hairline)'
              }}
            >
              {/* Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        padding: '1px 6px',
                        borderRadius: '2px',
                        background: item.isPreset ? 'rgba(56, 239, 125, 0.15)' : 'rgba(0, 242, 254, 0.15)',
                        color: item.isPreset ? 'var(--accent-emerald)' : 'var(--accent-cyan)',
                        fontWeight: 700
                      }}
                    >
                      {item.isPreset ? 'DEMO PRESET' : 'CUSTOM SPECIMEN'}
                    </span>
                    {isActive && (
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '9.5px',
                          color: 'var(--accent-cyan)',
                          fontWeight: 700
                        }}
                      >
                        • ACTIVE IN LAB
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '16px', color: '#ffffff', fontWeight: 700, marginTop: '4px' }}>
                    {item.name}
                  </h3>
                </div>

                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                  {item.id}
                </span>
              </div>

              {/* Visual DNA & Summary */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  background: 'rgba(6, 9, 14, 0.5)',
                  padding: '12px',
                  borderRadius: '6px'
                }}
              >
                <MiniDNA traits={item.traits} size={64} />

                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
                    CLASSIFICATION:
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#ffffff', fontWeight: 600 }}>
                    {item.classification}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      marginTop: '4px'
                    }}
                  >
                    <Layers size={10} />
                    <span>GEN-V{item.version || 1}</span>
                    <span>•</span>
                    <Clock size={10} />
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Trait Summary Badges */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                {TRAIT_DEFINITIONS.slice(0, 4).map((t) => (
                  <div
                    key={t.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      padding: '4px 6px',
                      borderRadius: '3px',
                      textAlign: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px'
                    }}
                  >
                    <span style={{ color: 'var(--text-muted)' }}>{t.symbol} </span>
                    <span style={{ color: t.color, fontWeight: 700 }}>
                      {Math.round(item.traits[t.id] ?? 50)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Card Actions */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  paddingTop: '10px',
                  marginTop: 'auto'
                }}
              >
                <button
                  onClick={() => onLoadDNA(item)}
                  className="btn-primary"
                  style={{ padding: '6px 14px', fontSize: '11px' }}
                >
                  <Sparkles size={12} />
                  LOAD INTO LAB
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button
                    onClick={() => onCompareWithActive(item)}
                    title="Compare with active specimen"
                    className="btn-secondary"
                    style={{ padding: '6px', height: '28px', width: '28px' }}
                  >
                    <GitCompare size={12} />
                  </button>

                  <button
                    onClick={() => onDuplicateDNA(item)}
                    title="Duplicate specimen"
                    className="btn-secondary"
                    style={{ padding: '6px', height: '28px', width: '28px' }}
                  >
                    <Copy size={12} />
                  </button>

                  {!item.isPreset && (
                    <button
                      onClick={() => onDeleteDNA(item.id)}
                      title="Delete specimen"
                      className="btn-secondary"
                      style={{ padding: '6px', height: '28px', width: '28px', color: 'var(--accent-crimson)' }}
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
