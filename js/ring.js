// Hero object: a glossy strip of film twisted into a ring, turning slowly.
// One full twist: the record goes in, and comes back round the other way up.
import * as THREE from '../vendor/three.module.min.js';

const cv = document.getElementById('hero-gl');
const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
let R;
try { R = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true, powerPreference: 'high-performance' }); } catch (e) { R = null; }

if (R) {
  R.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  R.outputColorSpace = THREE.SRGBColorSpace;
  R.toneMapping = THREE.ACESFilmicToneMapping;
  R.toneMappingExposure = 1.1;
  R.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  cam.position.set(0, 0, 13.5);

  // studio reflections: a dark room with one big soft light, a cool rim and a faint floor bounce
  const envScene = new THREE.Scene();
  envScene.add(new THREE.Mesh(new THREE.BoxGeometry(40, 40, 40), new THREE.MeshBasicMaterial({ color: 0x05070c, side: THREE.BackSide })));
  const panel = (w, h, color, x, y, z, ry = 0, rx = 0) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.rotation.set(rx, ry, 0); envScene.add(m);
  };
  panel(14, 8, 0xfff6e8, -8, 9, 6, 0.6, 0.9);
  panel(4, 18, 0x7fd6cf, 14, 0, -2, -1.4);
  panel(30, 4, 0x2a3a58, 0, -14, 0, 0, -1.5);
  panel(6, 6, 0xffffff, 6, 6, 14, -0.4);
  const pm = new THREE.PMREMGenerator(R);
  scene.environment = pm.fromScene(envScene, 0.03).texture;

  // film texture: base, sprocket holes along both edges, frames in between
  const tx = document.createElement('canvas'); tx.width = 2048; tx.height = 256;
  const g = tx.getContext('2d');
  g.fillStyle = '#0c1322'; g.fillRect(0, 0, 2048, 256);
  for (let i = 0; i < 8; i++) {
    const x = i * 256 + 18, w = 220;
    const grd = g.createLinearGradient(x, 56, x + w, 200);
    grd.addColorStop(0, i % 2 ? '#2f6f6a' : '#3b4c6e'); grd.addColorStop(0.55, i % 2 ? '#7fbdb5' : '#8b9ab8'); grd.addColorStop(1, i % 2 ? '#d7e8e2' : '#e6dfcf');
    g.fillStyle = grd; g.fillRect(x, 58, w, 140);
    g.strokeStyle = 'rgba(236,229,214,.18)'; g.lineWidth = 2; g.strokeRect(x, 58, w, 140);
  }
  g.fillStyle = '#d9e6e3';
  for (let x = 6; x < 2048; x += 32) {
    for (const y of [16, 214]) { g.beginPath(); g.roundRect ? g.roundRect(x, y, 18, 26, 4) : g.rect(x, y, 18, 26); g.fill(); }
  }
  const filmTex = new THREE.CanvasTexture(tx);
  filmTex.colorSpace = THREE.SRGBColorSpace; filmTex.wrapS = THREE.RepeatWrapping; filmTex.repeat.set(3, 1); filmTex.anisotropy = 8;

  // geometry: a band of width W and thickness T around radius R0 with one full twist
  function band(R0 = 2.15, W = 0.95, T = 0.07, N = 420) {
    const faces = [[1, 1, -1, 1], [-1, -1, 1, -1], [1, -1, 1, 1], [-1, 1, -1, -1]]; // [w0,t0,w1,t1] corner pairs
    const pos = [], uv = [], idx = [], groups = [];
    faces.forEach((f, fi) => {
      const start = pos.length / 3, istart = idx.length;
      for (let i = 0; i <= N; i++) {
        const u = i / N * Math.PI * 2, a = u;
        const c = new THREE.Vector3(R0 * Math.cos(u), 0, R0 * Math.sin(u));
        const r = new THREE.Vector3(Math.cos(u), 0, Math.sin(u)), y = new THREE.Vector3(0, 1, 0);
        const Wd = y.clone().multiplyScalar(Math.cos(a)).add(r.clone().multiplyScalar(Math.sin(a)));
        const Td = y.clone().multiplyScalar(-Math.sin(a)).add(r.clone().multiplyScalar(Math.cos(a)));
        for (const k of [0, 1]) {
          const w = f[k * 2] * W / 2, t = f[k * 2 + 1] * T / 2;
          const p = c.clone().add(Wd.clone().multiplyScalar(w)).add(Td.clone().multiplyScalar(t));
          pos.push(p.x, p.y, p.z); uv.push(i / N, k);
        }
      }
      for (let i = 0; i < N; i++) { const a = start + i * 2; idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); }
      groups.push([istart, idx.length - istart, fi < 2 ? 0 : 1]);
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    geo.setIndex(idx); groups.forEach(([s, c, m]) => geo.addGroup(s, c, m));
    geo.computeVertexNormals();
    return geo;
  }
  const filmMat = new THREE.MeshPhysicalMaterial({ map: filmTex, color: 0xffffff, metalness: 0.45, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.08, side: THREE.DoubleSide, envMapIntensity: 1.3 });
  const edgeMat = new THREE.MeshPhysicalMaterial({ color: 0xbfe3df, metalness: 1, roughness: 0.16, clearcoat: 1, envMapIntensity: 1.6 });
  const ring = new THREE.Mesh(band(), [filmMat, edgeMat]);

  const core = new THREE.Mesh(new THREE.SphereGeometry(0.62, 64, 48), new THREE.MeshPhysicalMaterial({ color: 0x3f9c95, metalness: 0.1, roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity: 1.2, sheen: 0.3 }));

  const rig = new THREE.Group(); rig.add(ring); rig.add(core); scene.add(rig);
  const key = new THREE.DirectionalLight(0xffffff, 1.2); key.position.set(-4, 6, 8); scene.add(key);
  const rim = new THREE.PointLight(0x6fd0c8, 30, 30); rim.position.set(5, -2, 3); scene.add(rim);
  const inner = new THREE.PointLight(0x5fc8bf, 6, 4); scene.add(inner);

  let W = 0, H = 0;
  function size() {
    const w = cv.clientWidth, h = cv.clientHeight; if (!w || !h) return;
    if (w !== W || h !== H) { W = w; H = h; R.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); }
    const phone = w < 900;
    rig.position.set(phone ? 0 : 1.7, phone ? -1.9 : 0.15, 0);
    rig.scale.setScalar(phone ? 0.5 : 1);
  }
  let mx = 0, my = 0, tmx = 0, tmy = 0;
  addEventListener('pointermove', e => { tmx = e.clientX / innerWidth - 0.5; tmy = e.clientY / innerHeight - 0.5; }, { passive: true });
  let vis = true, t0 = performance.now();
  new IntersectionObserver(es => es.forEach(e => { vis = e.isIntersecting; if (vis) loop(); })).observe(cv);
  function draw(now) {
    size();
    const t = (now - t0) / 1000;
    mx += (tmx - mx) * 0.05; my += (tmy - my) * 0.05;
    ring.rotation.set(1.05 + Math.sin(t * 0.3) * 0.08 + my * 0.3, REDUCE ? 0.6 : t * 0.32, 0.38 + mx * 0.25);
    core.position.set(Math.sin(t * 0.5) * 0.08, Math.cos(t * 0.4) * 0.08, 0);
    rig.rotation.y = mx * 0.35;
    R.render(scene, cam);
  }
  let raf = 0;
  function loop() { if (raf) return; const step = now => { raf = 0; if (!vis) return; draw(now); if (!REDUCE) raf = requestAnimationFrame(step); }; raf = requestAnimationFrame(step); }
  addEventListener('resize', () => draw(performance.now()));
  loop();
}
