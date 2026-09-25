import React, { useState } from 'react';
import ComparisonMatrix from '../components/Comparison/ComparisonMatrix';
import { ArrowRightLeft } from 'lucide-react';

export default function Compare({ activeDNA, library = [], initialTargetDNA = null }) {
  const [specimenAId, setSpecimenAId] = useState(activeDNA?.id || library[0]?.id);
  const [specimenBId, setSpecimenBId] = useState(() => {
    if (initialTargetDNA) return initialTargetDNA.id;
    const second = library.find(item => item.id !== activeDNA?.id);
    return second ? second.id : (library[1]?.id || library[0]?.id);
  });

  const specimenA = library.find(i => i.id === specimenAId) || activeDNA;
  const specimenB = library.find(i => i.id === specimenBId) || library[1] || library[0];

  const handleSwap = () => {
    const temp = specimenAId;
    setSpecimenAId(specimenBId);
    setSpecimenBId(temp);
  };

  return (
    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      {/* Selector Toolbar */}
      <div
        style={{
          background: 'rgba(8, 12, 18, 0.85)',
          borderBottom: '1px solid var(--border-hairline)',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-cyan)', fontWeight: 700 }}>
            SPECIMEN A:
          </span>
          <select
            value={specimenAId}
            onChange={(e) => setSpecimenAId(e.target.value)}
            style={{
              background: 'rgba(18, 25, 38, 0.9)',
              border: '1px solid var(--border-subtle)',
              color: '#ffffff',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {library.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} ({item.id})
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSwap}
          className="btn-secondary"
          title="Swap specimens"
          style={{ padding: '6px 12px', height: '32px' }}
        >
          <ArrowRightLeft size={14} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-emerald)', fontWeight: 700 }}>
            SPECIMEN B:
          </span>
          <select
            value={specimenBId}
            onChange={(e) => setSpecimenBId(e.target.value)}
            style={{
              background: 'rgba(18, 25, 38, 0.9)',
              border: '1px solid var(--border-subtle)',
              color: '#ffffff',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {library.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} ({item.id})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Matrix */}
      <ComparisonMatrix
        dnaA={specimenA}
        dnaB={specimenB}
        library={library}
      />
    </div>
  );
}
