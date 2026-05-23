export default function ModelSelector({
  models = [],
  selectedModelId,
  onSelectModel,
  filters,
  onFilterChange,
}) {
  const selectedModelVisible = models.some((model) => model.id === selectedModelId);

  return (
    <aside className="explorer-panel explorer-model-panel">
      <div className="explorer-panel-heading">
        <p className="explorer-list-label">Models</p>
        <h2>Filter system</h2>
      </div>

      <div className="explorer-filter-stack">
        <label className="space-y-2">
          <span>Species</span>
          <select
            value={filters.species}
            onChange={(event) => onFilterChange('species', event.target.value)}
            className="explorer-select"
          >
            <option value="all">All species</option>
            <option value="human">Human</option>
            <option value="porcine">Porcine</option>
          </select>
        </label>

        <label className="space-y-2">
          <span>Glycan</span>
          <select
            value={filters.chainLength}
            onChange={(event) =>
              onFilterChange('chainLength', event.target.value)
            }
            className="explorer-select"
          >
            <option value="all">All glycans</option>
            <option value="om3">OM3</option>
            <option value="om6">OM6</option>
            <option value="om7plus">OM7+</option>
          </select>
        </label>

        <label className="space-y-2">
          <span>Model</span>
          <select
            value={selectedModelVisible ? selectedModelId : ''}
            onChange={(event) => onSelectModel(event.target.value)}
            className="explorer-select"
            disabled={models.length === 0}
          >
            {!selectedModelVisible && (
              <option value="">Choose a model</option>
            )}
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.displayName}
              </option>
            ))}
          </select>
        </label>
      </div>

      {models.length === 0 && (
        <p className="explorer-empty-copy">
          No models match the selected filters.
        </p>
      )}
    </aside>
  );
}
