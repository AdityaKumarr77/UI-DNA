/**
 * Client-Side Image Analysis Engine for UI DNA
 * Performs client-side image processing via HTML5 Canvas.
 * Extracts: Dominant Colors, Color Diversity, Brightness, Contrast, Visual Edge Density.
 * Note: As per laboratory scientific standards, these are clearly labeled as "Estimated".
 */

export async function analyzeScreenshot(fileOrUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        // Normalize size for fast and deterministic local analysis
        const sampleSize = 160;
        canvas.width = sampleSize;
        canvas.height = sampleSize;

        ctx.drawImage(img, 0, 0, sampleSize, sampleSize);
        const imgData = ctx.getImageData(0, 0, sampleSize, sampleSize);
        const data = imgData.data;
        const totalPixels = sampleSize * sampleSize;

        let totalLuminance = 0;
        const luminances = new Float32Array(totalPixels);
        const colorBuckets = {};

        // 1. Process Pixels for Brightness & Color Distribution
        for (let i = 0; i < totalPixels; i++) {
          const r = data[i * 4];
          const g = data[i * 4 + 1];
          const b = data[i * 4 + 2];

          // Standard relative perceptual luminance
          const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          luminances[i] = lum;
          totalLuminance += lum;

          // Color quantization into 32-level buckets for diversity & dominant color extraction
          const qr = Math.floor(r / 32) * 32;
          const qg = Math.floor(g / 32) * 32;
          const qb = Math.floor(b / 32) * 32;
          const key = `${qr},${qg},${qb}`;
          colorBuckets[key] = (colorBuckets[key] || 0) + 1;
        }

        // Average Brightness (0 - 100)
        const avgLum = totalLuminance / totalPixels;
        const brightness = Math.round(avgLum * 100);

        // 2. RMS Contrast: Standard deviation of luminance
        let varianceSum = 0;
        for (let i = 0; i < totalPixels; i++) {
          const diff = luminances[i] - avgLum;
          varianceSum += diff * diff;
        }
        const rmsContrast = Math.sqrt(varianceSum / totalPixels);
        // Normalize typical contrast range (0.0 to 0.45) to 0 - 100
        const contrast = Math.min(100, Math.max(10, Math.round((rmsContrast / 0.45) * 100)));

        // 3. Color Diversity (Shannon Entropy of Color Buckets)
        const bucketKeys = Object.keys(colorBuckets);
        let entropy = 0;
        for (const k of bucketKeys) {
          const p = colorBuckets[k] / totalPixels;
          if (p > 0) {
            entropy -= p * Math.log2(p);
          }
        }
        // Normalize entropy (max ~6.5 bits for 32-step buckets)
        const colorDiversity = Math.min(100, Math.max(12, Math.round((entropy / 6.0) * 100)));

        // 4. Dominant Colors: Top vibrant/frequent buckets
        const sortedBuckets = bucketKeys.sort((a, b) => colorBuckets[b] - colorBuckets[a]);
        const dominantColors = sortedBuckets.slice(0, 4).map(k => {
          const [r, g, b] = k.split(',').map(Number);
          return rgbToHex(r, g, b);
        });

        // 5. Visual Density via Sobel Edge-Gradient approximation
        let edgeMagnitudeSum = 0;
        let edgeSamples = 0;
        for (let y = 1; y < sampleSize - 1; y += 2) {
          for (let x = 1; x < sampleSize - 1; x += 2) {
            const idx = y * sampleSize + x;
            const lumTop = luminances[idx - sampleSize];
            const lumBottom = luminances[idx + sampleSize];
            const lumLeft = luminances[idx - 1];
            const lumRight = luminances[idx + 1];

            const dx = lumRight - lumLeft;
            const dy = lumBottom - lumTop;
            const mag = Math.sqrt(dx * dx + dy * dy);
            edgeMagnitudeSum += mag;
            edgeSamples++;
          }
        }
        const avgEdge = edgeMagnitudeSum / (edgeSamples || 1);
        // Normalize edge frequency (typical range 0.05 to 0.3) to 0 - 100
        const visualDensity = Math.min(100, Math.max(15, Math.round((avgEdge / 0.32) * 100)));

        // Synthesize Estimated UI DNA traits
        const estimatedTraits = {
          color: Math.min(100, Math.max(20, Math.round(colorDiversity * 0.7 + (100 - brightness) * 0.3))),
          contrast: contrast,
          density: visualDensity,
          brightness: brightness,
          colorDiversity: colorDiversity,
          visualDensity: visualDensity,
          // Inferred secondary traits
          typography: Math.min(100, Math.max(30, Math.round(visualDensity * 0.6 + contrast * 0.4))),
          spacing: Math.min(100, Math.max(15, 100 - visualDensity)),
          radius: Math.min(100, Math.max(20, Math.round(45 + Math.sin(avgLum * 5) * 25))),
          shadow: Math.min(100, Math.max(20, Math.round(contrast * 0.65 + (100 - brightness) * 0.35))),
          motion: Math.min(100, Math.max(25, Math.round(colorDiversity * 0.5 + visualDensity * 0.4))),
          layout: Math.min(100, Math.max(30, Math.round(visualDensity * 0.8 + 15))),
          component: Math.min(100, Math.max(25, visualDensity)),
          interaction: Math.min(100, Math.max(30, Math.round(contrast * 0.5 + colorDiversity * 0.4))),
          complexity: Math.min(100, Math.max(20, Math.round(visualDensity * 0.5 + colorDiversity * 0.5))),
          primaryColor: dominantColors[0] || '#00f2fe',
          secondaryColor: dominantColors[1] || '#4facfe',
          accentColor: dominantColors[2] || '#38ef7d'
        };

        resolve({
          isEstimated: true,
          estimatedTraits,
          dominantColors,
          metrics: {
            brightness,
            contrast,
            colorDiversity,
            visualDensity
          }
        });
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image for visual genetic analysis.'));
    };

    if (typeof fileOrUrl === 'string') {
      img.src = fileOrUrl;
    } else {
      const reader = new FileReader();
      reader.onload = e => {
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Failed to read image file.'));
      reader.readAsDataURL(fileOrUrl);
    }
  });
}

function rgbToHex(r, g, b) {
  const toHex = c => Math.min(255, Math.max(0, c)).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
