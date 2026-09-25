import React, { useRef, useEffect } from 'react';

export default function DNAHelixHero({ interactive = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = 360);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 360;
    };

    window.addEventListener('resize', handleResize);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetSpeed = 0.024;
    let rotationSpeed = 0.024;

    const onMouseMove = (e) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      targetSpeed = 0.012 + (mouseX / width) * 0.035;
    };

    canvas.addEventListener('mousemove', onMouseMove);

    // Particle nodes for ambient biological suspension
    const particles = Array.from({ length: 32 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? '#00f2fe' : '#38ef7d',
      alpha: Math.random() * 0.4 + 0.1
    }));

    let angle = 0;
    const numPairs = 28;
    const spacing = 28;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      rotationSpeed += (targetSpeed - rotationSpeed) * 0.05;
      angle += rotationSpeed;

      const dynamicRadius = 55 + ((mouseY / height) - 0.5) * 15;

      // Draw background ambient particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Calculate 3D projected coordinates for both strands
      const totalWidth = numPairs * spacing;
      const startX = (width - totalWidth) / 2;
      const centerY = height / 2;

      const nodes = [];

      for (let i = 0; i < numPairs; i++) {
        const x = startX + i * spacing;
        const currentAngle = angle + i * 0.28;

        // Strand 1
        const y1 = centerY + Math.sin(currentAngle) * dynamicRadius;
        const z1 = Math.cos(currentAngle); // -1 to 1 depth

        // Strand 2 (opposite phase)
        const y2 = centerY + Math.sin(currentAngle + Math.PI) * dynamicRadius;
        const z2 = Math.cos(currentAngle + Math.PI);

        nodes.push({ i, x, y1, z1, y2, z2, currentAngle });
      }

      // Sort elements by average depth (Z-buffer)
      nodes.sort((a, b) => Math.min(a.z1, a.z2) - Math.min(b.z1, b.z2));

      // Draw Base Pair Rungs & Nodes
      nodes.forEach((pair) => {
        const { x, y1, z1, y2, z2 } = pair;

        // Depth scale & luminance
        const scale1 = 0.75 + (z1 + 1) * 0.25;
        const scale2 = 0.75 + (z2 + 1) * 0.25;
        const alpha1 = 0.35 + (z1 + 1) * 0.32;
        const alpha2 = 0.35 + (z2 + 1) * 0.32;

        // Base pair hydrogen connector rung
        const rungAlpha = 0.15 + ((z1 + z2 + 2) / 4) * 0.4;
        const gradient = ctx.createLinearGradient(x, y1, x, y2);
        gradient.addColorStop(0, `rgba(0, 242, 254, ${alpha1})`);
        gradient.addColorStop(0.5, `rgba(155, 81, 224, ${rungAlpha * 0.8})`);
        gradient.addColorStop(1, `rgba(56, 239, 125, ${alpha2})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(x, y1);
        ctx.lineTo(x, y2);
        ctx.stroke();

        // Node 1 (Strand Alpha - Cyan Glow)
        ctx.save();
        ctx.shadowColor = '#00f2fe';
        ctx.shadowBlur = z1 > 0 ? 12 : 4;
        ctx.fillStyle = '#00f2fe';
        ctx.globalAlpha = Math.max(0.2, alpha1);
        ctx.beginPath();
        ctx.arc(x, y1, 4 * scale1, 0, Math.PI * 2);
        ctx.fill();

        // White core highlight
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = Math.max(0.4, alpha1);
        ctx.beginPath();
        ctx.arc(x, y1, 1.8 * scale1, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Node 2 (Strand Beta - Emerald/Pink Glow)
        ctx.save();
        ctx.shadowColor = '#38ef7d';
        ctx.shadowBlur = z2 > 0 ? 12 : 4;
        ctx.fillStyle = '#38ef7d';
        ctx.globalAlpha = Math.max(0.2, alpha2);
        ctx.beginPath();
        ctx.arc(x, y2, 4 * scale2, 0, Math.PI * 2);
        ctx.fill();

        // White core highlight
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = Math.max(0.4, alpha2);
        ctx.beginPath();
        ctx.arc(x, y2, 1.8 * scale2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Ambient Horizon Coordinate Grid lines
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.08)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onMouseMove);
    };
  }, [interactive]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '360px', overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          cursor: interactive ? 'crosshair' : 'default'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 12,
          right: 20,
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: 'var(--text-muted)',
          letterSpacing: '0.08em',
          pointerEvents: 'none'
        }}
      >
        LIVING HELIX PROTOCOL • 3D ROTATION [24 FPS]
      </div>
    </div>
  );
}
