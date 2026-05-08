import Button from '../ui/Button';
import { formatNumber, formatSignedNumber } from '../../lib/modelData';

export default function CrossModelModalV2({ open, onClose, mutationId, entries = [] }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#1c1c2e]/30 px-4">
      <div className="max-h-[85vh] w-full max-w-4xl overflow-y-auto border border-[color:var(--fh-border)] bg-[color:var(--fh-surface)] p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow text-[color:var(--fh-accent)]">Cross-model comparison</p>
            <h3 className="mt-3 text-3xl text-[color:var(--fh-text)]">{mutationId}</h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--fh-text-secondary)]">
              Quantitative comparison of the selected substitution across every curated model where it is present.
            </p>
          </div>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {entries.map((entry) => (
            <div key={entry.modelId} className="border border-[color:var(--fh-border)] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--fh-text-secondary)]">{entry.species}</p>
              <h4 className="mt-2 text-2xl text-[color:var(--fh-text)]">{entry.displayName}</h4>
              <p className="mt-2 text-sm text-[color:var(--fh-text-secondary)]">{entry.glycanType}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[color:var(--fh-text-secondary)]">
                {entry.structureAvailable ? 'Linked structure file' : 'No linked structure file'}
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="border-t border-[color:var(--fh-border)] pt-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--fh-text-secondary)]">Affinity</p>
                  <p className="mt-3 text-2xl font-bold text-[color:var(--fh-text)]">
                    {formatNumber(entry.affinity)}
                  </p>
                </div>
                <div className="border-t border-[color:var(--fh-border)] pt-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--fh-text-secondary)]">dAffinity</p>
                  <p className="mt-3 text-2xl font-bold text-[color:var(--fh-text)]">
                    {formatSignedNumber(entry.ddg_binding)}
                  </p>
                </div>
                <div className="border-t border-[color:var(--fh-border)] pt-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--fh-text-secondary)]">Stability</p>
                  <p className="mt-3 text-2xl font-bold text-[color:var(--fh-text)]">
                    {formatNumber(entry.stability)}
                  </p>
                </div>
                <div className="border-t border-[color:var(--fh-border)] pt-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--fh-text-secondary)]">dStability</p>
                  <p className="mt-3 text-2xl font-bold text-[color:var(--fh-text)]">
                    {formatSignedNumber(entry.ddg_stability)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
