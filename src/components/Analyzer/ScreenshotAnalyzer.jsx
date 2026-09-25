import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { analyzeScreenshot } from '../../utils/imageAnalysis';
import { 
  Upload, 
  AlertCircle, 
  CheckCircle, 
  Sparkles, 
  Loader2,
  Palette
} from 'lucide-react';

export default function ScreenshotAnalyzer({ onApplyEstimatedTraits }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);
    setAnalysisResult(null);

    // Create object URL for preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    setAnalyzing(true);
    try {
      const result = await analyzeScreenshot(file);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
      setErrorMessage('Could not process image pixels. Please upload a PNG or JPEG screenshot.');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleApply = () => {
    if (!analysisResult) return;
    onApplyEstimatedTraits(analysisResult.estimatedTraits);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Scientific Disclaimer Banner */}
      <div
        style={{
          background: 'rgba(247, 151, 30, 0.06)',
          border: '1px solid rgba(247, 151, 30, 0.25)',
          borderRadius: '6px',
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <AlertCircle size={18} color="var(--accent-amber)" />
        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          <strong style={{ color: '#ffffff' }}>SCIENTIFIC OBSERVATION PROTOCOL:</strong> Browser pixel extraction estimates optical luminance, Shannon color entropy, and Sobel edge density. Screenshot-derived values are classified as{' '}
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              padding: '1px 6px',
              background: 'rgba(247, 151, 30, 0.2)',
              color: 'var(--accent-amber)',
              borderRadius: '3px',
              fontWeight: 700
            }}
          >
            ESTIMATED
          </span>{' '}
          and should be calibrated in the laboratory workspace.
        </div>
      </div>

      {/* Upload Zone & Interactive Preview */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: imagePreview ? '1fr 1fr' : '1fr',
          gap: '24px'
        }}
      >
        {/* Dropzone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: '2px dashed rgba(0, 242, 254, 0.25)',
            borderRadius: '8px',
            background: 'rgba(10, 15, 24, 0.6)',
            padding: '40px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent-cyan)';
            e.currentTarget.style.background = 'rgba(14, 22, 36, 0.8)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0, 242, 254, 0.25)';
            e.currentTarget.style.background = 'rgba(10, 15, 24, 0.6)';
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              background: 'rgba(0, 242, 254, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-cyan)'
            }}
          >
            {analyzing ? <Loader2 className="animate-spin" size={24} /> : <Upload size={24} />}
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>
              {imagePreview ? 'REPLACE SCREENSHOT SPECIMEN' : 'UPLOAD UI SCREENSHOT SPECIMEN'}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Drop an interface screenshot (PNG, JPG, WebP) for client-side pixel extraction
            </div>
            {errorMessage && (
              <div style={{ color: 'var(--accent-crimson)', fontFamily: 'var(--font-mono)', fontSize: '11px', marginTop: '8px' }}>
                {errorMessage}
              </div>
            )}
          </div>
        </div>

        {/* Uploaded Image Specimen Preview */}
        {imagePreview && (
          <div
            className="lab-panel tech-corners"
            style={{
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              maxHeight: '340px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-cyan)' }}>
                SPECIMEN RASTER SCAN
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
                LOCAL CANVAS BUFFER
              </span>
            </div>
            <div
              style={{
                flex: 1,
                overflow: 'hidden',
                borderRadius: '4px',
                background: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                src={imagePreview}
                alt="UI Specimen"
                style={{ maxWidth: '100%', maxHeight: '240px', objectFit: 'contain' }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Analysis Results Display */}
      {analysisResult && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="lab-panel"
          style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--accent-emerald)',
                  letterSpacing: '0.08em',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <CheckCircle size={14} />
                PIXEL EXTRACTION COMPLETE
              </div>
              <h3 style={{ fontSize: '16px', color: '#ffffff', fontWeight: 700, marginTop: '2px' }}>
                Estimated Genomic Characteristics
              </h3>
            </div>

            <button
              onClick={handleApply}
              className="btn-primary"
              style={{ padding: '10px 20px', fontSize: '12px' }}
            >
              <Sparkles size={14} />
              SYNTHESIZE INTO ACTIVE DNA PROFILE
            </button>
          </div>

          {/* Extracted Dominant Chromatic Palettes */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-muted)',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Palette size={13} />
              EXTRACTED DOMINANT CHROMATIC SEEDS [ESTIMATED]
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {analysisResult.dominantColors.map((col, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 12px',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid var(--border-hairline)',
                    borderRadius: '4px'
                  }}
                >
                  <div style={{ width: 14, height: 14, borderRadius: '3px', background: col }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#ffffff' }}>
                    {col}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Metric Meters */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px'
            }}
          >
            {[
              { label: 'Color Diversity', val: analysisResult.metrics.colorDiversity, desc: 'Shannon color bucket entropy' },
              { label: 'RMS Contrast', val: analysisResult.metrics.contrast, desc: 'Luminance standard deviation' },
              { label: 'Mean Brightness', val: analysisResult.metrics.brightness, desc: 'Optical surface reflectance' },
              { label: 'Visual Density', val: analysisResult.metrics.visualDensity, desc: 'High-frequency Sobel gradient flux' }
            ].map((m, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(14, 20, 30, 0.5)',
                  border: '1px solid var(--border-hairline)',
                  borderRadius: '6px',
                  padding: '12px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)' }}>
                    {m.label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      background: 'rgba(247, 151, 30, 0.15)',
                      color: 'var(--accent-amber)',
                      padding: '1px 6px',
                      borderRadius: '2px',
                      fontWeight: 700
                    }}
                  >
                    ESTIMATED
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                  {m.val}%
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {m.desc}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
