// Hero backdrop: the glowing rim of a giant cinema screen arching across the top,
// projector dust drifting in the dark, light streaks leaking from the rim, film grain.
// Everything is drawn here; nothing is loaded.
(function () {
  const cv = document.getElementById('hero-sky'); if (!cv) return;
  const g = cv.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W = 0, H = 0, dpr = 1, run = false, t0 = performance.now();
  let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const dust = Array.from({ length: 260 }, () => ({ x: rnd(), y: rnd(), r: 0.4 + rnd() * 1.4, s: 0.2 + rnd() * 0.8, p: rnd() * 6.28, d: rnd() * 0.6 - 0.3 }));
  const rays = Array.from({ length: 22 }, () => ({ u: rnd(), sp: 0.12 + rnd() * 0.18, off: rnd(), len: 0.18 + rnd() * 0.3, w: 0.6 + rnd() * 1.6 }));
  const grain = document.createElement('canvas'); grain.width = grain.height = 180;
  { const gg = grain.getContext('2d'), im = gg.createImageData(180, 180);
    for (let i = 0; i < im.data.length; i += 4) { const v = rnd() * 255; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 18; }
    gg.putImageData(im, 0, 0); }

  function size() {
    dpr = Math.min(1.5, devicePixelRatio || 1);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
  }
  // the rim: bottom edge of a huge ellipse whose centre sits above the screen
  function rim(w, h) {
    const phone = w < 900; h = Math.min(h, window.innerHeight || h); // measure against the screen, not the tall hero
    const rx = phone ? w * 1.15 : w * 0.8, ry = phone ? h * 0.2 : h * 0.5;
    const cy = (phone ? h * 0.2 : h * 0.29) - ry;
    return { cx: w / 2, cy, rx, ry };
  }
  function draw(now) {
    const t = reduce ? 2 : (now - t0) / 1000;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.fillStyle = '#000'; g.fillRect(0, 0, W, H);
    const R = rim(W, H);
    const pulse = 0.82 + 0.18 * Math.sin(t * 1.7) * Math.sin(t * 0.63 + 1);

    // dust in the projector light
    for (const d of dust) {
      const y = ((d.y - t * 0.006 * d.s) % 1 + 1) % 1, x = ((d.x + Math.sin(t * 0.2 + d.p) * 0.004 + d.d * t * 0.002) % 1 + 1) % 1;
      const tw = 0.35 + 0.65 * Math.abs(Math.sin(t * d.s + d.p));
      g.fillStyle = `rgba(255,236,214,${0.18 + 0.5 * tw * (1 - y * 0.6)})`;
      g.beginPath(); g.arc(x * W, y * H, d.r, 0, 6.283); g.fill();
    }

    // the screen behind the rim: barely lit, with faint scan lines
    g.save(); g.beginPath(); g.ellipse(R.cx, R.cy, R.rx, R.ry, 0, 0, 6.283); g.clip();
    let gr = g.createRadialGradient(R.cx, R.cy + R.ry, 0, R.cx, R.cy + R.ry, R.rx * 0.9);
    gr.addColorStop(0, `rgba(120,30,18,${0.55 * pulse})`); gr.addColorStop(0.35, 'rgba(40,8,6,0.6)'); gr.addColorStop(1, 'rgba(0,0,0,1)');
    g.fillStyle = gr; g.fillRect(0, 0, W, R.cy + R.ry + 2);
    g.fillStyle = 'rgba(255,255,255,0.025)'; for (let y = 0; y < R.cy + R.ry; y += 4) g.fillRect(0, y, W, 1);
    g.restore();

    // glow layers along the rim, brightest in the middle, rippling
    const N = 220;
    const pt = i => { const a = Math.PI * (i / N); return [R.cx + Math.cos(Math.PI - a) * R.rx, R.cy + Math.sin(a) * R.ry]; };
    g.globalCompositeOperation = 'lighter';
    const layers = [[46, 0.05, '255,70,40'], [22, 0.10, '255,90,50'], [9, 0.22, '255,150,90'], [3.2, 0.7, '255,214,170'], [1.2, 0.95, '255,248,236']];
    for (const [lw, al, c] of layers) {
      for (let i = 0; i < N; i++) {
        const u = i / N, mid = Math.pow(Math.sin(Math.PI * u), 1.6);
        const ripple = 0.75 + 0.25 * Math.sin(u * 40 - t * 3.2) * Math.sin(u * 13 + t * 1.3);
        const [x1, y1] = pt(i), [x2, y2] = pt(i + 1);
        g.strokeStyle = `rgba(${c},${al * mid * pulse * ripple})`; g.lineWidth = lw * (0.6 + 0.4 * mid);
        g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke();
      }
    }
    // light streaks racing outward from the rim
    for (const r of rays) {
      const ph = ((t * r.sp + r.off) % 1), a = Math.PI * (0.08 + 0.84 * r.u);
      const x = R.cx + Math.cos(Math.PI - a) * R.rx, y = R.cy + Math.sin(a) * R.ry;
      const nx = Math.cos(Math.PI - a) / R.rx, ny = Math.sin(a) / R.ry, nl = Math.hypot(nx, ny);
      const dx = nx / nl, dy = ny / nl, L = r.len * Math.min(W, H) * 0.9;
      const s0 = ph * L * 1.4, s1 = s0 + L * 0.35, fade = Math.sin(Math.PI * ph) * Math.pow(Math.sin(Math.PI * r.u), 1.2);
      const lg = g.createLinearGradient(x + dx * s0, y + dy * s0, x + dx * s1, y + dy * s1);
      lg.addColorStop(0, 'rgba(255,170,110,0)'); lg.addColorStop(0.6, `rgba(255,190,140,${0.55 * fade})`); lg.addColorStop(1, 'rgba(255,240,220,0)');
      g.strokeStyle = lg; g.lineWidth = r.w; g.beginPath(); g.moveTo(x + dx * s0, y + dy * s0); g.lineTo(x + dx * s1, y + dy * s1); g.stroke();
    }
    // bloom under the brightest part of the rim
    gr = g.createRadialGradient(R.cx, R.cy + R.ry, 0, R.cx, R.cy + R.ry, Math.min(W, H) * 0.55);
    gr.addColorStop(0, `rgba(255,110,60,${0.16 * pulse})`); gr.addColorStop(1, 'rgba(255,60,30,0)');
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    g.globalCompositeOperation = 'source-over';

    // film grain and the odd scratch, like a print running through a projector
    if (!reduce) {
      g.globalAlpha = 0.9; const ox = (Math.floor(t * 24) * 53) % 180, oy = (Math.floor(t * 24) * 97) % 180;
      g.fillStyle = g.createPattern(grain, 'repeat'); g.save(); g.translate(-ox, -oy); g.fillRect(ox, oy, W, H); g.restore(); g.globalAlpha = 1;
      if (Math.sin(t * 7.3) > 0.93) { const sx = (Math.sin(t * 3.1) * 0.5 + 0.5) * W; g.fillStyle = 'rgba(255,240,220,0.08)'; g.fillRect(sx, 0, 1, H); }
    }
  }
  function loop(now) { if (!run) return; draw(now); requestAnimationFrame(loop); }
  size(); draw(performance.now());
  new ResizeObserver(() => { size(); draw(performance.now()); }).observe(cv);
  if (!reduce) new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting && !run) { run = true; requestAnimationFrame(loop); } else if (!e.isIntersecting) run = false;
  })).observe(cv);
})();
