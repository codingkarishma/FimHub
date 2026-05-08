import { useDeferredValue, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
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
  getModelBindingSummary,
  getModelById,
  getModelMutations,
  getMutationById,
  getMutationCrossModelData,
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
  if (!value) {
    return 'N/A';
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function ExplorerPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allModels, setAllModels] = useState([]);
  const [mutationsByModel, setMutationsByModel] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    species: 'all',
    chainLength: 'all',
    status: 'all',
  });
  const [selectedResiduePosition, setSelectedResiduePosition] = useState(null);
  const [selectedMutationId, setSelectedMutationId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const deferredSearch = useDeferredValue(searchTerm).trim().toLowerCase();

  useEffect(() => {
    let cancelled = false;

    async function loadExplorerData() {
      setLoading(true);
      setError('');

      try {
        const models = await fetchAvailableModels();
        const mutationIndex = await fetchMutationIndex(models);

        if (cancelled) {
          return;
        }

        setAllModels(models);
        setMutationsByModel(mutationIndex);
      } catch (loadError) {
        if (cancelled) {
          return;
        }

        setError(
          loadError instanceof Error
            ? loadError.message
            : 'Failed to load explorer data',
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadExplorerData();

    return () => {
      cancelled = true;
    };
  }, []);

  const visibleModels = getVisibleModels(allModels);
  const publishedModels = getPublishedModels(allModels);
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
    const matchesStatus =
      filters.status === 'all' || model.status === filters.status;
    return matchesSpecies && matchesChainLength && matchesStatus;
  });

  const modelSummary = selectedModel
    ? getModelBindingSummary(selectedModel)
    : null;
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
  const crossModelRows = selectedMutation
    ? getMutationCrossModelData(
        allModels,
        mutationsByModel,
        selectedMutation.id,
      )
    : [];
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
    {
      label: 'Mutations',
      value: modelSummary?.testedMutationCount ?? mutationRecords.length,
    },
    {
      label: 'PDB',
      value: selectedModel?.pdbRef || 'N/A',
    },
  ];

  return (
    <div className="explorer-page">
      {error && (
        <div className="container-max py-4">
          <div className="text-sm text-rose-700">{error}</div>
        </div>
      )}

      <section className="relative overflow-hidden border-b border-[color:var(--fh-border)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--fh-mid)_72%,white_28%),var(--fh-bg))]">
        <div className="container-max relative py-10 md:py-12">
          <Reveal>
            <div className="max-w-xl">
              <h1 className="text-4xl font-light leading-[1.02] text-[color:var(--fh-text)] md:text-5xl">
                {explorerContent.hero.title}
              </h1>
              <p className="mt-4 max-w-lg text-base leading-8 text-[color:var(--fh-text-secondary)] md:text-lg">
                {explorerContent.hero.description}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-max py-10 md:py-12">
        <Reveal>
          <div className="overflow-hidden rounded-[1.5rem] border border-[color:var(--fh-border)] bg-[color:var(--fh-surface)]">
            <div className="px-5 py-5 md:px-6">
              <h2 className="text-2xl font-light text-[color:var(--fh-text)] md:text-3xl">
                {selectedModel?.displayName || 'No model selected'}
              </h2>
            </div>
            <dl className="grid gap-0 border-t border-[color:var(--fh-border)] md:grid-cols-4">
              {modelDetails.map((item) => (
                <div
                  key={item.label}
                  className="border-t border-[color:var(--fh-border)] px-5 py-4 first:border-t-0 md:border-l md:first:border-l-0 md:border-t-0 md:px-6"
                >
                  <dt className="text-sm text-[color:var(--fh-text-secondary)]">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-lg text-[color:var(--fh-text)]">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </section>

      <section className="pb-14 md:pb-16">
        <div className="container-max grid gap-5 xl:grid-cols-[15.5rem,minmax(0,1fr),18rem]">
          <Reveal className="xl:sticky xl:top-24 xl:h-fit">
            <ModelSelector
              models={filteredModels}
              selectedModelId={selectedModel?.id}
              onSelectModel={handleSelectModel}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </Reveal>

          <div className="space-y-5">
            <Reveal>
              <section className="surface-panel overflow-hidden rounded-[1.5rem] px-5 py-6 md:px-6">
                <div className="explorer-section-header border-b border-[color:var(--fh-border)] pb-5">
                  <div>
                    <h2 className="text-2xl font-light text-[color:var(--fh-text)]">
                      Selection
                    </h2>
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search site or substitution"
                    className="explorer-search-field"
                  />
                </div>

                <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,0.92fr),minmax(0,1.08fr)]">
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
                    <div className="mt-3 flex flex-wrap gap-2">
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
                                className={`h-2 w-2 rounded-full ${
                                  record.structureAvailable
                                    ? active
                                      ? 'bg-[color:var(--fh-accent)]'
                                      : 'bg-emerald-600'
                                    : active
                                      ? 'bg-[color:var(--fh-border-strong)]'
                                      : 'bg-slate-300'
                                }`}
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

            <Reveal delay={0.04}>
              <section className="surface-panel overflow-hidden rounded-[1.5rem] px-5 py-6 md:px-6">
                <div className="explorer-section-header border-b border-[color:var(--fh-border)] pb-5">
                  <div>
                    <h2 className="text-3xl font-light text-[color:var(--fh-text)]">
                      {selectedMutation?.id || 'No mutation selected'}
                    </h2>
                  </div>
                  {structureUrl && (
                    <a href={structureUrl} target="_blank" rel="noreferrer">
                      <Button variant="outline" size="sm">
                        Open PDB
                      </Button>
                    </a>
                  )}
                </div>

                <div className="mt-6">
                  <StructureViewport
                    mutationName={selectedMutation?.id}
                    mutationPosition={selectedMutation?.position}
                    structureUrl={structureUrl}
                    wildTypeResidue={selectedMutation?.wt}
                    mutantResidue={selectedMutation?.mut}
                  />
                </div>

                <dl className="explorer-metric-grid mt-6">
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
                    <dt>
                      {explorerContent.sections.structurePanel.deltaStabilityLabel}
                    </dt>
                    <dd>{formatSignedNumber(selectedMutation?.ddg_stability)}</dd>
                  </div>
                  <div>
                    <dt>{explorerContent.sections.structurePanel.crossModelLabel}</dt>
                    <dd>{crossModelRows.length}</dd>
                  </div>
                  <div>
                    <dt>Structure</dt>
                    <dd>{structureUrl ? 'Linked PDB' : 'Unavailable'}</dd>
                  </div>
                </dl>
              </section>
            </Reveal>
          </div>

          <Reveal className="space-y-5" delay={0.03}>
            <MutationDataPanelV2
              model={selectedModel}
              mutation={selectedMutation}
              crossModelCount={crossModelRows.length}
              onCompareAcrossModels={() => setModalOpen(true)}
            />

            <section className="surface-panel rounded-[1.5rem] px-5 py-5">
              <p className="text-sm text-[color:var(--fh-text-secondary)]">
                dAffinity &lt; 0 indicates stronger predicted binding.
              </p>
              <div className="mt-4">
                <Link to="/guide" className="data-link text-sm">
                  Guide
                </Link>
              </div>
            </section>
          </Reveal>
        </div>
      </section>

      <CrossModelModalV2
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        mutationId={selectedMutation?.id}
        entries={crossModelRows}
      />
    </div>
  );
}
