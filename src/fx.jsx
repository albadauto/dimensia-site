import React, { useEffect, useRef, useState } from "react";

const reduced = () =>
  typeof matchMedia !== "undefined" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Ajusta um canvas ao tamanho do elemento pai, respeitando o DPR. */
function fitCanvas(c, ctx) {
  const dpr = Math.min(devicePixelRatio || 1, 1.75);
  const { width, height } = c.getBoundingClientRect();
  c.width = Math.max(1, width * dpr);
  c.height = Math.max(1, height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { w: width, h: height };
}

/* ───────────── Rede neural de fundo (fixa, página inteira) ───────────── */
export function NeuralField() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    let size = fitCanvas(c, ctx);
    let raf = 0;
    const mouse = { x: -999, y: -999 };
    const make = () => {
      const n = Math.min(90, Math.round((size.w * size.h) / 17000));
      return Array.from({ length: n }, () => ({
        x: Math.random() * size.w,
        y: Math.random() * size.h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.6,
      }));
    };
    let pts = make();
    const draw = () => {
      ctx.clearRect(0, 0, size.w, size.h);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > size.w) p.vx *= -1;
        if (p.y < 0 || p.y > size.h) p.vy *= -1;
      }
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 140) {
            ctx.strokeStyle = `rgba(94,234,192,${(1 - d / 140) * 0.16})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < 200) {
          ctx.strokeStyle = `rgba(99,225,232,${(1 - dm / 200) * 0.45})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
        ctx.fillStyle = "rgba(140,245,214,.55)";
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };
    const onResize = () => {
      size = fitCanvas(c, ctx);
      pts = make();
      if (reduced()) draw();
    };
    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduced()) loop();
    };
    addEventListener("resize", onResize);
    addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    reduced() ? draw() : loop();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", onResize);
      removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);
  return <canvas ref={ref} className="neural-field" aria-hidden="true" />;
}

/* ───────────── Rosto 3D em nuvem de pontos com feixe de escaneamento ───────────── */
const gauss = (x, y, cx, cy, sx, sy) =>
  Math.exp(-(((x - cx) / sx) ** 2 + ((y - cy) / sy) ** 2));

function halfWidth(y) {
  return y >= 0
    ? 0.74 * Math.sqrt(Math.max(0, 1 - 0.78 * y * y))
    : 0.74 * (1 - 0.56 * Math.pow(-y, 1.9));
}
function depth(x, y) {
  const w = halfWidth(y);
  const nx = w ? x / w : 0;
  let z = 0.5 * Math.sqrt(Math.max(0, 1 - nx * nx)) * (0.8 + 0.2 * (1 - y * y));
  z += 0.2 * gauss(x, y, 0, -0.1, 0.07, 0.3); // dorso do nariz
  z += 0.16 * gauss(x, y, 0, -0.3, 0.11, 0.09); // ponta do nariz
  z -= 0.11 * gauss(x, y, 0.29, 0.12, 0.13, 0.08); // órbitas
  z -= 0.11 * gauss(x, y, -0.29, 0.12, 0.13, 0.08);
  z += 0.06 * gauss(x, y, 0.29, 0.27, 0.2, 0.06); // sobrancelhas
  z += 0.06 * gauss(x, y, -0.29, 0.27, 0.2, 0.06);
  z += 0.07 * gauss(x, y, 0.42, -0.16, 0.15, 0.15); // malares
  z += 0.07 * gauss(x, y, -0.42, -0.16, 0.15, 0.15);
  z += 0.07 * gauss(x, y, 0, -0.55, 0.17, 0.05); // lábios
  z -= 0.03 * gauss(x, y, 0, -0.68, 0.14, 0.04);
  z += 0.06 * gauss(x, y, 0, -0.86, 0.15, 0.08); // mento
  return z;
}
const LANDMARKS = [
  [0, 0.55, "Fronte"],
  [-0.29, 0.13, "Órbita E"],
  [0.29, 0.13, "Órbita D"],
  [0, -0.31, "Nasal"],
  [-0.44, -0.2, "Malar E"],
  [0.44, -0.2, "Malar D"],
  [0, -0.55, "Labial"],
  [0, -0.87, "Mento"],
];

export function FaceScan({ className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    let size = fitCanvas(c, ctx);
    const rows = [];
    const step = 0.036;
    for (let y = 1; y >= -1; y -= step) {
      const w = halfWidth(y);
      const row = [];
      for (let x = -w; x <= w + 1e-6; x += step) {
        row.push([x, y, depth(x, y) + (Math.random() - 0.5) * 0.008]);
      }
      if (row.length) rows.push(row);
    }
    const marks = LANDMARKS.map(([x, y, l]) => [x, y, depth(x, y), l]);
    let raf = 0;
    const t0 = performance.now();

    const frame = (now) => {
      const t = (now - t0) / 1000;
      const { w, h } = size;
      ctx.clearRect(0, 0, w, h);
      const S = Math.min(w, h) * 0.4;
      const cx = w / 2;
      const cy = h / 2 + h * 0.02;
      const ang = reduced() ? 0.35 : Math.sin(t * 0.45) * 0.62;
      const tilt = reduced() ? 0 : Math.sin(t * 0.31) * 0.08;
      const ca = Math.cos(ang), sa = Math.sin(ang);
      const ct = Math.cos(tilt), st = Math.sin(tilt);
      const proj = (x, y, z) => {
        const X = x * ca - z * sa;
        let Z = x * sa + z * ca;
        const Y = y * ct - Z * st;
        Z = y * st + Z * ct;
        const f = 3.2 / (3.2 - Z);
        return [cx + X * f * S, cy - Y * f * S, Z];
      };
      const scan = reduced() ? 0.1 : Math.sin(t * 0.85) * 1.05;

      // feixe de escaneamento
      const sy = cy - scan * S;
      const lg = ctx.createLinearGradient(cx - S * 1.3, 0, cx + S * 1.3, 0);
      lg.addColorStop(0, "rgba(99,225,232,0)");
      lg.addColorStop(0.5, "rgba(140,250,240,.9)");
      lg.addColorStop(1, "rgba(99,225,232,0)");
      ctx.strokeStyle = lg;
      ctx.lineWidth = 1.4;
      ctx.shadowColor = "#63e1e8";
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.moveTo(cx - S * 1.3, sy);
      ctx.lineTo(cx + S * 1.3, sy);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // malha (linhas horizontais) + pontos
      for (let r = 0; r < rows.length; r++) {
        const row = rows[r];
        const P = row.map(([x, y, z]) => proj(x, y, z));
        const near = Math.abs(row[0][1] - scan) < 0.05;
        ctx.strokeStyle = near ? "rgba(140,250,240,.75)" : "rgba(94,234,192,.2)";
        ctx.lineWidth = near ? 1.1 : 0.6;
        ctx.beginPath();
        P.forEach(([px, py], i) => (i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)));
        ctx.stroke();
        for (let i = 0; i < P.length; i++) {
          const [px, py, pz] = P[i];
          const dy = Math.abs(row[i][1] - scan);
          const hot = dy < 0.07;
          const a = Math.max(0.08, Math.min(1, 0.3 + pz * 0.9));
          ctx.fillStyle = hot
            ? `rgba(180,255,245,${0.95 - dy * 6})`
            : `rgba(120,240,205,${a})`;
          const s = hot ? 2.2 : 1.4;
          ctx.fillRect(px - s / 2, py - s / 2, s, s);
        }
      }

      // marcos faciais
      ctx.font = "600 10px 'JetBrains Mono', monospace";
      marks.forEach(([x, y, z, label], i) => {
        const [px, py, pz] = proj(x, y, z + 0.01);
        if (pz < -0.05) return;
        const pulse = reduced() ? 0.5 : (Math.sin(t * 2.2 + i) + 1) / 2;
        ctx.strokeStyle = `rgba(99,225,232,${0.35 + pulse * 0.4})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(px, py, 6 + pulse * 5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "#b4fff5";
        ctx.beginPath();
        ctx.arc(px, py, 2.6, 0, Math.PI * 2);
        ctx.fill();
        const side = x < 0 || (x === 0 && i % 2) ? -1 : 1;
        const lx = px + side * 34;
        const ly = py - 14;
        ctx.strokeStyle = "rgba(99,225,232,.45)";
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px + side * 12, ly);
        ctx.lineTo(lx, ly);
        ctx.stroke();
        ctx.fillStyle = "rgba(200,255,245,.85)";
        ctx.textAlign = side < 0 ? "right" : "left";
        ctx.fillText(
          `P${String(i + 1).padStart(2, "0")} ${label}`,
          lx + side * 4,
          ly + 3,
        );
      });
      if (!reduced()) raf = requestAnimationFrame(frame);
    };
    const ro = new ResizeObserver(() => {
      size = fitCanvas(c, ctx);
      if (reduced()) frame(performance.now());
    });
    ro.observe(c);
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(frame);
    };
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);
  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

/* ───────────── Texto que "decodifica" ───────────── */
const GLYPHS = "!<>-_\\/[]{}=+*^?#01ΔΣΩ";
export function Scramble({ text, delay = 0, speed = 28 }) {
  const [out, setOut] = useState(() => (reduced() ? text : ""));
  useEffect(() => {
    if (reduced()) return setOut(text);
    let frame = 0;
    let id;
    const start = setTimeout(() => {
      id = setInterval(() => {
        frame++;
        const done = Math.floor(frame / 2);
        let s = "";
        for (let i = 0; i < text.length; i++) {
          if (i < done || text[i] === " ") s += text[i];
          else if (i < done + 8) s += GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
        setOut(s);
        if (done >= text.length) clearInterval(id);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [text, delay, speed]);
  return (
    <span aria-label={text}>
      <span aria-hidden="true">{out || " "}</span>
    </span>
  );
}

/* ───────────── Terminal de processamento de IA ───────────── */
const LOG = [
  ["$", "dimensia scan --paciente demo", "cmd"],
  ["›", "verificando enquadramento", "OK"],
  ["›", "nitidez e iluminação", "OK"],
  ["›", "detectando referências faciais", "OK"],
  ["›", "estimando geometria 3D", "OK"],
  ["›", "combinando ângulos de captura", "OK"],
  ["›", "gerando superfície navegável", "100%"],
  ["✓", "modelo pronto para planejamento", "done"],
];
export function Terminal() {
  const [n, setN] = useState(reduced() ? LOG.length : 0);
  useEffect(() => {
    if (reduced()) return;
    const id = setInterval(
      () => setN((v) => (v >= LOG.length + 4 ? 0 : v + 1)),
      650,
    );
    return () => clearInterval(id);
  }, []);
  return (
    <div className="terminal">
      <div className="terminal-bar">
        <span />
        <span />
        <span />
        <em>dimensia://pipeline</em>
      </div>
      <div className="terminal-body">
        {LOG.slice(0, Math.min(n, LOG.length)).map(([p, t, s], i) => (
          <div key={i} className={`terminal-line ${s === "cmd" ? "is-cmd" : ""} ${s === "done" ? "is-done" : ""}`}>
            <span className="terminal-prompt">{p}</span>
            <span className="terminal-text">{t}</span>
            {s !== "cmd" && s !== "done" && <span className="terminal-status">{s}</span>}
          </div>
        ))}
        {n < LOG.length && <span className="terminal-caret" />}
        <div className="terminal-progress">
          <i style={{ width: `${(Math.min(n, LOG.length) / LOG.length) * 100}%` }} />
        </div>
      </div>
    </div>
  );
}

/* ───────────── Efeitos globais: reveal, spotlight e brilho do cursor ───────────── */
export function useGlobalFx(dep) {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
  useEffect(() => {
    const glow = document.getElementById("cursor-glow");
    const onMove = (e) => {
      if (glow) glow.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
      const card = e.target.closest?.(".spot");
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
    };
    addEventListener("pointermove", onMove, { passive: true });
    return () => removeEventListener("pointermove", onMove);
  }, []);
}
