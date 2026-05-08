import { formatSignedNumber } from '../../lib/modelData';

function tone(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) return 'bg-[color:var(--fh-mid)] text-[color:var(--fh-text-secondary)]';
  if (value <= -1) return 'bg-emerald-100 text-emerald-800';
  if (value < 0) return 'bg-emerald-50 text-emerald-700';
  if (value >= 1) return 'bg-rose-100 text-rose-800';
  if (value > 0) return 'bg-rose-50 text-rose-700';
  return 'bg-[color:var(--fh-mid)] text-[color:var(--fh-text)]';
}

export default function GlycanHeatmapV2({ rows = [] }) {
  if (!rows.length) {
    return (
      <div className="border border-[color:var(--fh-border)] bg-[color:var(--fh-mid)] p-4 text-sm text-[color:var(--fh-text-secondary)]">
        No cross-model values available for this mutation.
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-[color:var(--fh-border)] bg-[color:var(--fh-surface)]">
      <div className="grid grid-cols-[1.1fr,0.8fr,0.8fr] border-b border-[color:var(--fh-border)] bg-[color:var(--fh-mid)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--fh-text-secondary)]">
        <p>Model</p>
        <p>dAffinity</p>
        <p>dStability</p>
      </div>
      <div className="divide-y divide-[color:var(--fh-border)]">
        {rows.map((row) => (
          <div key={row.modelId} className="grid grid-cols-[1.1fr,0.8fr,0.8fr] items-center gap-3 px-4 py-3 text-sm">
            <div>
              <p className="font-medium text-[color:var(--fh-text)]">{row.displayName}</p>
              <p className="mt-1 text-xs text-[color:var(--fh-text-secondary)]">{row.glycanType}</p>
            </div>
            <span className={`px-2 py-2 text-center font-semibold ${tone(row.ddg_binding)}`}>
              {formatSignedNumber(row.ddg_binding)}
            </span>
            <span className={`px-2 py-2 text-center font-semibold ${tone(row.ddg_stability)}`}>
              {formatSignedNumber(row.ddg_stability)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
