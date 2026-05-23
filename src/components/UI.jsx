export function Badge({ type = 'muted', children }) {
  const cls = {
    green: 'badge-green', yellow: 'badge-yellow',
    red: 'badge-red', muted: 'badge-muted',
  };
  return <span className={cls[type] || 'badge-muted'}>{children}</span>;
}

export function ProgressBar({ pct, color = '#e8ff3b' }) {
  return (
    <div className="prog-bar">
      <div className="prog-fill" style={{ width: `${Math.min(100, pct)}%`, background: color }} />
    </div>
  );
}

export function StatCard({ label, value, sub, color = '#e8ff3b', pct }) {
  return (
    <div className="card text-center mb-0">
      <div className="section-title">{label}</div>
      <div className="font-display text-3xl leading-none" style={{ color }}>{value}</div>
      {sub && <div className="text-[11px] text-muted mt-1">{sub}</div>}
      {pct !== undefined && <ProgressBar pct={pct} color={color} />}
    </div>
  );
}

export function Toggle({ on, onChange }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className="toggle"
      style={{ background: on ? '#e8ff3b' : '#222' }}
      aria-checked={on}
      role="switch"
    >
      <span
        className="absolute w-[18px] h-[18px] bg-white rounded-full top-[3px] transition-all"
        style={{ left: on ? '22px' : '3px' }}
      />
    </button>
  );
}

export function PageHeader({ title, sub }) {
  return (
    <div className="mb-5">
      <h1 className="font-display text-3xl tracking-[2px]">{title}</h1>
      {sub && <p className="text-[12px] text-muted mt-0.5">{sub}</p>}
    </div>
  );
}
