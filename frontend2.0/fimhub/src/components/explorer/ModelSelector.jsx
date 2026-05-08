import { groupModelsBySpecies } from '../../lib/modelData';

export default function ModelSelector({
  models = [],
  selectedModelId,
  onSelectModel,
  filters,
  onFilterChange,
}) {
  const grouped = groupModelsBySpecies(models);

  return (
    <aside className="surface-panel overflow-hidden rounded-[1.5rem] p-5">
      <h2 className="text-2xl font-light text-[color:var(--fh-text)]">Models</h2>

      <div className="mt-5 grid gap-3">
        <label className="space-y-2">
          <span className="text-sm text-[color:var(--fh-text-secondary)]">
            Species
          </span>
          <select
            value={filters.species}
            onChange={(event) => onFilterChange('species', event.target.value)}
            className="w-full rounded-full border border-[color:var(--fh-border)] bg-[color:var(--fh-bg)] px-4 py-2.5 text-sm text-[color:var(--fh-text)]"
          >
            <option value="all">All species</option>
            <option value="human">Human</option>
            <option value="porcine">Porcine</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm text-[color:var(--fh-text-secondary)]">
            Glycan
          </span>
          <select
            value={filters.chainLength}
            onChange={(event) =>
              onFilterChange('chainLength', event.target.value)
            }
            className="w-full rounded-full border border-[color:var(--fh-border)] bg-[color:var(--fh-bg)] px-4 py-2.5 text-sm text-[color:var(--fh-text)]"
          >
            <option value="all">All glycans</option>
            <option value="om3">OM3</option>
            <option value="om6">OM6</option>
            <option value="om7plus">OM7+</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm text-[color:var(--fh-text-secondary)]">
            Status
          </span>
          <select
            value={filters.status}
            onChange={(event) => onFilterChange('status', event.target.value)}
            className="w-full rounded-full border border-[color:var(--fh-border)] bg-[color:var(--fh-bg)] px-4 py-2.5 text-sm text-[color:var(--fh-text)]"
          >
            <option value="all">All status</option>
            <option value="published">Published</option>
            <option value="coming-soon">Coming soon</option>
            <option value="beta">Beta</option>
          </select>
        </label>
      </div>

      <div className="mt-6 space-y-5">
        {Object.entries(grouped).map(([species, speciesModels]) => (
          <div key={species}>
            <p className="text-sm text-[color:var(--fh-text-secondary)]">
              {species}
            </p>
            <div className="mt-3 grid gap-2">
              {speciesModels.map((model) => {
                const disabled = model.status === 'coming-soon';
                const active = model.id === selectedModelId;

                return (
                  <button
                    key={model.id}
                    type="button"
                    disabled={disabled}
                    onClick={() => onSelectModel(model.id)}
                    className={`w-full rounded-[1rem] border px-4 py-4 text-left transition-colors ${
                      active
                        ? 'border-[color:var(--fh-accent)] bg-[color:var(--fh-accent-soft)]/70'
                        : 'border-[color:var(--fh-border)] bg-[color:var(--fh-bg)] hover:border-[color:var(--fh-border-strong)] hover:bg-[color:var(--fh-mid)]/70'
                    } ${disabled ? 'cursor-not-allowed opacity-70' : ''}`}
                  >
                    <div>
                      <p className="text-base font-semibold text-[color:var(--fh-text)]">
                        {model.displayName}
                      </p>
                      <p className="mt-1 text-sm text-[color:var(--fh-text-secondary)]">
                        {model.glycanType}
                      </p>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[color:var(--fh-text-secondary)]">
                      <span>{model.counts?.mutations ?? 0} mutations</span>
                      <span>{model.counts?.structures ?? 0} structures</span>
                      <span>{model.pdbRef || 'N/A'} reference</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
