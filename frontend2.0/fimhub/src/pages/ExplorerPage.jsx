import { useDeferredValue, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Reveal from '../components/site/Reveal';
import Button from '../components/ui/Button';
import StructureViewport from '../components/StructureViewport';
import CrossModelModalV2 from '../components/explorer/CrossModelModalV2';
import ModelSelector from '../components/explorer/ModelSelector';
import MutationDataPanelV2 from '../components/explorer/MutationDataPanelV2';
import { explorerContent } from '../content/platformContentV2';
import {
  fetchAvailableModels,
  fetchMutationIndex,
  formatNumber,
  formatSignedNumber,
  getModelById,
  getModelMutations,
  getMutationById,
  getPublishedModels,
  getResidueGroups,
  getVisibleModels,
  resolveStructureUrl,
} from '../lib/modelData';

function getDefaultModelId(models = []) {
  return (
    getPublishedModels(models)[0]?.id || getVisibleModels(models)[0]?.id || null
  );
}

function getPreferredMutation(records = []) {
  return (
    records.find((record) => record.structureAvailable) || records[0] || null
  );
}

function formatSpeciesLabel(value = '') {
  if (!value) return 'N/A';
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getDotColor(record, active) {
  if (record.structureAvailable) {
    return active ? 'bg-[color:var(--fh-accent)]' : 'bg-emerald-600';
  }
  return active ? 'bg-[color:var(--fh-border-strong)]' : 'bg-slate-300';
}

function buildComparisonData(records = []) {
  return records.map((record) => ({
    id: record.id,
    affinity: Number.isFinite(record.affinity) ? record.affinity : null,
    dAffinity: Number.isFinite(record.ddg_binding) ? record.ddg_binding : null,
    stability: Number.isFinite(record.stability) ? record.stability : null,
    dStability: Number.isFinite(record.ddg_stability)
      ? record.ddg_stability
      : null,
    structureAvailable: record.structureAvailable,
  }));
}

function ComparisonTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  const item = payload[0]?.payload;
  return (
    <div className="explorer-chart-tooltip">
      <strong>{label}</strong>
      <span>dAffinity: {formatSignedNumber(item?.dAffinity)}</span>
      <span>dStability: {formatSignedNumber(item?.dStability)}</span>
      <span>Affinity: {formatNumber(item?.affinity)}</span>
    </div>
  );
}

export default function ExplorerPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allModels, setAllModels] = useState([]);
  const [mutationsByModel, setMutationsByModel] = useState({});
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    species: 'all',
    chainLength: 'all',
  });
  const [selectedResiduePosition, setSelectedResiduePosition] = useState(null);
  const [selectedMutationId, setSelectedMutationId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const deferredSearch = useDeferredValue(searchTerm).trim().toLowerCase();

  useEffect(() => {
    let cancelled = false;

    async function loadExplorerData() {
      setError('');
      try {
        const models = await fetchAvailableModels();
        const mutationIndex = await fetchMutationIndex(models);
        if (cancelled) return;
        setAllModels(models);
        setMutationsByModel(mutationIndex);
      } catch (loadError) {
        if (cancelled) return;
        setError(
          loadError instanceof Error
            ? loadError.message
            : 'Failed to load explorer data',
        );
      }
    }

    loadExplorerData();
    return () => {
      cancelled = true;
    };
  }, []);

  const visibleModels = getVisibleModels(allModels);
  const defaultModelId = getDefaultModelId(allModels);
  const selectedModelId = searchParams.get('model') || defaultModelId;
  const selectedModel =
    getModelById(allModels, selectedModelId) ||
    getModelById(allModels, defaultModelId);

  const filteredModels = visibleModels.filter((model) => {
    const matchesSpecies =
      filters.species === 'all' || model.species === filters.species;
    const matchesChainLength =
      filters.chainLength === 'all' ||
      model.id.endsWith(filters.chainLength) ||
      (filters.chainLength === 'om7plus' &&
        ['om7', 'om8', 'om9'].some((item) => model.id.endsWith(item)));
    return matchesSpecies && matchesChainLength;
  });

  const mutationRecords = selectedModel
    ? getModelMutations(mutationsByModel, selectedModel.id)
    : [];
  const residueGroups = getResidueGroups(mutationRecords);
  const searchedResidueGroups = residueGroups.filter((group) => {
    if (!deferredSearch) return true;
    const residueId = `${group.wt}${group.position}`.toLowerCase();
    return (
      residueId.includes(deferredSearch) ||
      group.records.some((record) =>
        record.id.toLowerCase().includes(deferredSearch),
      )
    );
  });
  const selectedResidueGroup =
    searchedResidueGroups.find(
      (group) => group.position === selectedResiduePosition,
    ) ||
    residueGroups.find((group) => group.position === selectedResiduePosition) ||
    residueGroups[0] ||
    null;
  const selectedMutation =
    getMutationById(selectedResidueGroup?.records || [], selectedMutationId) ||
    getPreferredMutation(selectedResidueGroup?.records || []);

  const samePositionMutations = selectedResidueGroup?.records || [];
  const comparisonData = buildComparisonData(samePositionMutations);

  const structureUrl =
    selectedModel && selectedMutation
      ? resolveStructureUrl(selectedModel, selectedMutation)
      : null;

  useEffect(() => {
    if (!selectedModel && defaultModelId) {
      setSearchParams({ model: defaultModelId }, { replace: true });
    }
  }, [defaultModelId, selectedModel, setSearchParams]);

  useEffect(() => {
    if (!selectedResidueGroup && residueGroups[0]) {
      setSelectedResiduePosition(residueGroups[0].position);
      setSelectedMutationId(
        getPreferredMutation(residueGroups[0].records)?.id || '',
      );
      return;
    }

    if (
      selectedResidueGroup &&
      !selectedResidueGroup.records.some(
        (record) => record.id === selectedMutationId,
      )
    ) {
      setSelectedMutationId(
        getPreferredMutation(selectedResidueGroup.records)?.id || '',
      );
    }
  }, [residueGroups, selectedResidueGroup, selectedMutationId]);

  const handleSelectModel = (modelId) => {
    setSearchParams({ model: modelId }, { replace: false });
    setSelectedResiduePosition(null);
    setSelectedMutationId('');
    setSearchTerm('');
  };

  const handleFilterChange = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const modelDetails = [
    {
      label: 'Host',
      value: formatSpeciesLabel(selectedModel?.species),
    },
    {
      label: 'Glycan',
      value: selectedModel?.glycanType || 'N/A',
    },
  ];

  return (
    <div className="explorer-page">
      {error && (
        <div className="container-max py-4">
          <div className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        </div>
      )}

      <main className="container-max py-8 md:py-10">
        <Reveal>
          <section className="explorer-commandbar">
            <div>
              <p className="explorer-list-label">Explorer</p>
              <h1>{explorerContent.hero.title}</h1>
            </div>
            <div className="explorer-model-summary">
              <div>
                <span>Active model</span>
                <strong>{selectedModel?.displayName || 'No model selected'}</strong>
              </div>
              <dl>
                {modelDetails.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        </Reveal>

        <section className="explorer-workspace">
          <Reveal className="xl:sticky xl:top-24 xl:h-fit">
            <ModelSelector
              models={filteredModels}
              selectedModelId={selectedModel?.id}
              onSelectModel={handleSelectModel}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </Reveal>

          <div className="explorer-main-stack">
            <Reveal>
              <section className="explorer-panel">
                <div className="explorer-section-header">
                  <div>
                    <p className="explorer-list-label">Residue selection</p>
                    <h2>Choose site and substitution</h2>
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search site or substitution"
                    className="explorer-search-field"
                  />
                </div>

                <div className="explorer-selection-grid">
                  <div>
                    <p className="explorer-list-label">
                      {explorerContent.sections.residueWorkspace.residuesLabel}
                    </p>
                    <div className="explorer-residue-grid">
                      {searchedResidueGroups.map((group) => {
                        const active =
                          group.position === selectedResidueGroup?.position;
                        return (
                          <button
                            key={group.position}
                            type="button"
                            onClick={() => {
                              setSelectedResiduePosition(group.position);
                              setSelectedMutationId(
                                getPreferredMutation(group.records)?.id || '',
                              );
                            }}
                            className={`explorer-token ${active ? 'is-active' : ''}`}
                          >
                            <span className="font-mono font-semibold">
                              {group.wt}
                              {group.position}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {searchedResidueGroups.length === 0 && (
                      <p className="mt-3 text-sm text-[color:var(--fh-text-secondary)]">
                        No residues matched.
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="explorer-list-label">
                      {explorerContent.sections.residueWorkspace.mutationsLabel}
                    </p>
                    <div className="explorer-mutation-grid">
                      {selectedResidueGroup?.records.map((record) => {
                        const active = record.id === selectedMutation?.id;
                        return (
                          <button
                            key={record.id}
                            type="button"
                            onClick={() => setSelectedMutationId(record.id)}
                            className={`explorer-token ${active ? 'is-active' : ''}`}
                          >
                            <span className="inline-flex items-center gap-2">
                              <span className="font-mono font-semibold">
                                {record.id}
                              </span>
                              <span
                                className={`h-2 w-2 rounded-full ${getDotColor(record, active)}`}
                              />
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>
            </Reveal>

            <Reveal delay={0.02}>
              <section className="explorer-panel explorer-chart-panel">
                <div className="explorer-section-header">
                  <div>
                    <p className="explorer-list-label">Residue comparison</p>
                    <h2>
                      {selectedResidueGroup
                        ? `${selectedResidueGroup.wt}${selectedResidueGroup.position} substitutions`
                        : 'Substitution comparison'}
                    </h2>
                  </div>
                  <div className="explorer-chart-legend">
                    <span className="is-better">Stronger binding</span>
                    <span className="is-weaker">Weaker binding</span>
                  </div>
                </div>

                <div className="explorer-chart-frame">
                  {comparisonData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={comparisonData}
                        margin={{ top: 12, right: 8, bottom: 0, left: -18 }}
                      >
                        <CartesianGrid stroke="rgba(155, 166, 175, 0.28)" vertical={false} />
                        <XAxis
                          dataKey="id"
                          tickLine={false}
                          axisLine={false}
                          interval={0}
                          tick={{ fill: '#4f5a64', fontSize: 12 }}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tick={{ fill: '#4f5a64', fontSize: 12 }}
                        />
                        <Tooltip content={<ComparisonTooltip />} cursor={{ fill: 'rgba(226, 241, 239, 0.42)' }} />
                        <Bar dataKey="dAffinity" radius={[5, 5, 0, 0]}>
                          {comparisonData.map((entry) => (
                            <Cell
                              key={entry.id}
                              fill={entry.dAffinity <= 0 ? '#0b686f' : '#d18a21'}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="explorer-empty-copy">No comparison data available.</p>
                  )}
                </div>
              </section>
            </Reveal>

            <Reveal delay={0.04}>
              <section className="explorer-panel explorer-viewer-panel">
                <div className="explorer-section-header">
                  <div>
                    <p className="explorer-list-label">Structure viewer</p>
                    <h2 className="font-mono">
                      {selectedMutation?.id || 'No mutation selected'}
                    </h2>
                  </div>
                  {structureUrl && (
                    <a
                      href={structureUrl}
                      download
                      className="inline-flex items-center"
                    >
                      <Button variant="outline" size="sm" className="rounded-lg">
                        Download Structure
                      </Button>
                    </a>
                  )}
                </div>

                <div className="explorer-viewer-frame">
                  <StructureViewport
                    mutationName={selectedMutation?.id}
                    mutationPosition={selectedMutation?.position}
                    structureUrl={structureUrl}
                    wildTypeResidue={selectedMutation?.wt}
                    mutantResidue={selectedMutation?.mut}
                  />
                </div>

                <dl className="explorer-metric-grid">
                  <div>
                    <dt>{explorerContent.sections.structurePanel.affinityLabel}</dt>
                    <dd>{formatNumber(selectedMutation?.affinity)}</dd>
                  </div>
                  <div>
                    <dt>
                      {explorerContent.sections.structurePanel.deltaAffinityLabel}
                    </dt>
                    <dd>{formatSignedNumber(selectedMutation?.ddg_binding)}</dd>
                  </div>
                  <div>
                    <dt>{explorerContent.sections.structurePanel.stabilityLabel}</dt>
                    <dd>{formatNumber(selectedMutation?.stability)}</dd>
                  </div>
                  <div>
                    <dt>dStability</dt>
                    <dd>{formatSignedNumber(selectedMutation?.ddg_stability)}</dd>
                  </div>
                  <div>
                    <dt>{explorerContent.sections.structurePanel.crossModelLabel}</dt>
                    <dd>{samePositionMutations.length}</dd>
                  </div>
                </dl>
              </section>
            </Reveal>
          </div>

          <Reveal className="explorer-side-stack" delay={0.03}>
            <MutationDataPanelV2
              model={selectedModel}
              mutation={selectedMutation}
              crossModelCount={samePositionMutations.length}
              onCompareAcrossModels={() => setModalOpen(true)}
            />

            <Link to="/guide" className="explorer-guide-link">
              Guide
            </Link>
          </Reveal>
        </section>
      </main>

      <CrossModelModalV2
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        mutationId={selectedMutation?.id}
        entries={samePositionMutations}
      />
    </div>
  );
}
