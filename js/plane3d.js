// The 16 scored films in 3D: D across, L going back, RPDI up.
// RPDI = 0.6D + 0.4L, so every film sits on one tilted plane. The floor diagonal is D = L (Gap = 0).
import { fig, fontsReady, THREE } from '../vendor/fig3d.js';
const INK = 0x1c2541, TEAL = 0x3a7d7b, GREY = 0x8a90a3, PALE = 0x9cc3be;
await fontsReady();

const cv = document.querySelector('#plane-gl');
const F = cv && fig(cv, { dist: 21, distSmall: 25, target: [0, 1.4, 0], yaw: -0.62, pitch: 0.38, sway: 0.28 });
if (F) {
  const { plot, line, tag, ease } = F;
  const films = (window.RPDI_FILMS || []).map(f => [f.title, f.d, f.l, f.rpdi, f.gapClass]);
  const kind = c => /Extreme Gaslighting/.test(c) ? 'x' : /Sanitized/.test(c) ? 's' : /Honest/.test(c) ? 'h' : 'g';
  const X = d => d * 8 - 4, Z = l => 4 - l * 8, Y = v => v * 5;
  for (let i = 0; i <= 4; i++) { const v = i / 4; line([[X(v), 0, Z(0)], [X(v), 0, Z(1)]], 0.16); line([[X(0), 0, Z(v)], [X(1), 0, Z(v)]], 0.16); }
  line([[X(0), 0, Z(0)], [X(1), 0, Z(1)]], 0.8, TEAL);
  line([[X(0), 0, Z(1)], [X(0), Y(1), Z(1)]], 0.8);
  for (const v of [0.25, 0.5, 0.75, 1]) line([[X(0), Y(v), Z(1)], [X(1), Y(v), Z(1)]], 0.1);
  const plane = [];
  for (let i = 0; i <= 8; i++) { const a = i / 8;
    plane.push(line([[X(a), Y(0.6 * a), Z(0)], [X(a), Y(0.6 * a + 0.4), Z(1)]], 0.16));
    plane.push(line([[X(0), Y(0.4 * a), Z(a)], [X(1), Y(0.6 + 0.4 * a), Z(a)]], 0.16)); }
  const col = { x: INK, s: PALE, g: GREY, h: TEAL };
  const geo = new THREE.SphereGeometry(0.15, 18, 12);
  const dots = films.map(f => { const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: col[kind(f[4])], roughness: 0.4, emissive: 0x000000 })); plot.add(m); return m; });
  const drops = films.map(f => line([[X(f[1]), 0, Z(f[2])], [X(f[1]), 0, Z(f[2])]], 0.45, col[kind(f[4])]));
  const shadows = films.map(f => { const m = new THREE.Mesh(new THREE.CircleGeometry(0.09, 16), new THREE.MeshBasicMaterial({ color: col[kind(f[4])], transparent: true, opacity: 0.4 })); m.rotation.x = -Math.PI / 2; m.position.set(X(f[1]), 0.01, Z(f[2])); plot.add(m); return m; });
  tag('D  factual distortion →', [X(0.5), -0.55, Z(0) + 0.7], { size: 30 });
  tag('L  portrayal →', [X(1) + 1.3, -0.4, Z(0.5)], { size: 30 });
  tag('RPDI', [X(0), Y(1) + 0.45, Z(1)], { size: 30, weight: 600 });
  for (const v of [0.5, 1]) tag(v.toFixed(1), [X(0) - 0.45, Y(v), Z(1)], { size: 28 });
  tag('D = L  (no gap)', [X(0.93), 0.3, Z(0.93)], { size: 26, color: '#3a7d7b' });
  const named = { RRR: [0, .5], "All the President's Men": [0, -.45], 'The Kashmir Files': [0, .45], 'Mohenjo Daro': [-.2, .45], 'Saving Private Ryan': [0, -.5], 'Gandhi': [0, .42] };
  films.forEach(f => { if (named[f[0]]) { const [dx, dy] = named[f[0]]; tag(f[0] === 'Saving Private Ryan' ? 'Saving Private Ryan · U-571' : f[0], [X(f[1]) + dx, Y(f[3]) + dy, Z(f[2])], { size: 26, serif: true, italic: true, weight: 500, scale: 0.34, depthTest: false }); } });
  F.st.onFrame = t => {
    films.forEach((f, i) => {
      const k = ease((t - 0.15 - i * 0.05) / 1.1), y = Y(f[3]) * k;
      dots[i].position.set(X(f[1]), y, Z(f[2]));
      const p = drops[i].geometry.attributes.position; p.setY(1, y); p.needsUpdate = true;
      shadows[i].scale.setScalar(0.3 + 0.7 * k);
    });
    const pk = ease((t - 1.2) / 1); plane.forEach(l => l.material.opacity = 0.16 * pk);
  };
}
