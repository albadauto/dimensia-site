import React, { useEffect } from "react";

const paths = {
  cube: "m12 3 9 5v8l-9 5-9-5V8l9-5Zm0 0v9m9-4-9 4-9-4m9 4v9",
  upload: "M12 16V3m-5 5 5-5 5 5M4 15v5h16v-5",
  camera: "M4 7h3l1.5-2h7L17 7h3a1 1 0 0 1 1 1v11H3V8a1 1 0 0 1 1-1Zm8 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  rotate: "M3 11a9 9 0 1 1 3 8M3 4v7h7",
  target: "M12 3v3m0 12v3M3 12h3m12 0h3M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
  file: "M14 3H5v18h14V8l-5-5Zm0 0v6h5M8 13h8m-8 4h5",
  chevron: "m9 5 7 7-7 7",
  back: "m15 5-7 7 7 7",
  check: "m5 12 4 4L19 6",
  lock: "M6 10h12v11H6V10Zm3 0V6a3 3 0 0 1 6 0v4",
  trash: "M4 6h16M9 6V3h6v3M7 6l1 15h8l1-15M10 10v7m4-7v7",
  grid: "M3 3h18v18H3V3Zm6 0v18m6-18v18M3 9h18M3 15h18",
  photo: "M3 4h18v16H3V4Zm0 12 5-5 4 4 3-3 6 6M15 8h.01",
  info: "M12 10v7m0-10h.01M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z",
  home: "M3 11 12 3l9 8M5 9.5V21h5v-6h4v6h5V9.5",
  users: "M16 20v-1.5A3.5 3.5 0 0 0 12.5 15h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm10 9v-1.5a3.5 3.5 0 0 0-2.6-3.4M15 4.2a3.5 3.5 0 0 1 0 6.6",
  user: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2m7-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
  box: "M21 8 12 3 3 8m18 0v8l-9 5m9-13-9 5m0 8-9-5V8m9 13v-8M3 8l9 5M7.5 5.5l9 5",
  card: "M3 6h18v12H3V6Zm0 4h18M7 15h3",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.4-3a7.4 7.4 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2-1.2L14.5 3h-5L9 5.6a7 7 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6a7.4 7.4 0 0 0 0 2.4l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 2 1.2l.5 2.6h5l.5-2.6a7 7 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2Z",
  logout: "M15 4h4v16h-4M10 8l-4 4 4 4M6 12h11",
  menu: "M4 6h16M4 12h16M4 18h16",
  x: "M6 6l12 12M18 6 6 18",
  search: "m21 21-4.3-4.3M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z",
  edit: "M4 20h4L19 9l-4-4L4 16v4Zm9-13 4 4",
  sparkles: "M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3Zm7 11 .9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z",
  calendar: "M4 6h16v15H4V6Zm0 5h16M8 3v4m8-4v4",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z",
  mail: "M3 6h18v12H3V6Zm0 0 9 7 9-7",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  shield: "M12 3 4 6v6c0 5 3.4 8.5 8 9 4.6-.5 8-4 8-9V6l-8-3Zm-3 9 2 2 4-4",
  clock: "M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  face: "M12 3C7 3 5 6.5 5 11c0 5 3 10 7 10s7-5 7-10c0-4.5-2-8-7-8Zm-3 8h.01M15 11h.01M9.5 16c1.5 1 3.5 1 5 0",
  archive: "M3 4h18v4H3V4Zm2 4v12h14V8M10 12h4",
};

export function Icon({ name, className = "h-4 w-4", strokeWidth = 1.7 }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name] || paths.cube} />
    </svg>
  );
}

/** variant="light" para fundos escuros; "dark" para fundos claros. */
export function Logo({ variant = "dark", className = "h-9" }) {
  return <img src={`/brand/dimensia-${variant}.png`} alt="Dimensia" className={`block w-auto object-contain ${className}`} />;
}

export function Spinner({ className = "h-5 w-5" }) {
  return <span className={`inline-block animate-spin rounded-full border-2 border-current/25 border-t-current ${className}`} aria-hidden="true" />;
}

export function Notice({ notice, onClose }) {
  if (!notice) return null;
  return (
    <div role={notice.error ? "alert" : "status"}
      className={`mb-5 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${notice.error ? "border-rose-200 bg-rose-50 text-rose-800" : "border-mint-200 bg-mint-50 text-mint-800"}`}>
      <Icon name={notice.error ? "info" : "check"} className="mt-0.5 h-4 w-4 shrink-0" />
      <span className="flex-1">{notice.text}</span>
      {onClose && <button type="button" onClick={onClose} aria-label="Fechar aviso" className="opacity-60 hover:opacity-100"><Icon name="x" className="h-4 w-4" /></button>}
    </div>
  );
}

export function Field({ label, hint, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-medium text-slate-500">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-slate-400">{hint}</span>}
    </label>
  );
}

export function Modal({ title, subtitle, onClose, children, wide = false }) {
  useEffect(() => {
    const key = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm" onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}>
      <section role="dialog" aria-modal="true" className={`w-full ${wide ? "max-w-2xl" : "max-w-lg"} rounded-2xl bg-white p-6 shadow-2xl`}>
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">{title}</h2>
            {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
          </div>
          {onClose && <button type="button" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700" onClick={onClose} aria-label="Fechar"><Icon name="x" /></button>}
        </div>
        {children}
      </section>
    </div>
  );
}

export function PageHeader({ eyebrow, title, subtitle, actions }) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div className="min-w-0">
        {eyebrow && <p className="mb-1 text-[11px] font-semibold uppercase tracking-[.16em] text-mint-700">{eyebrow}</p>}
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-[28px]">{title}</h1>
        {subtitle && <p className="mt-1.5 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Empty({ icon = "info", title, text, action }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center">
      <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-mint-50 text-mint-600"><Icon name={icon} className="h-6 w-6" /></div>
      <p className="font-semibold text-slate-700">{title}</p>
      {text && <p className="mx-auto mt-1.5 max-w-sm text-sm text-slate-500">{text}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function initials(name = "") {
  return name.split(" ").filter(Boolean).slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}
