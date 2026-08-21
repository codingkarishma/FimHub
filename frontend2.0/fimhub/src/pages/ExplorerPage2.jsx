import { useDeferredValue, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Reveal from '../components/site/Reveal';
import ModelSelector from '../components/explorer/ModelSelector';
import MutationDataPanelV2 from '../components/explorer/MutationDataPanelV2';
import CrossModelModalV2 from '../components/explorer/CrossModelModalV2';
import ResidueSelectionPanel from '../new-files/ResidueSelectionPanel';
import StructureSection from '../new-files/StructureSection';
import { explorerContent } from '../content/platformContentV2';
import { colors } from '../lib/explorerStyles';
import {
  getDefaultModelId,
  getPreferredMutation,
  formatSpeciesLabel,
  buildComparisonData,
} from '../lib/explorerSelectors';
import {
  fetchAvailableModels,
  fetchMutationIndex,
  getModelById,
  getModelMutations,
  getMutationById,
  getMutationCrossModelData,
  getResidueGroups,
  getVisibleModels,
  resolveStructureUrl,
} from '../lib/modelData';

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
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : 'Failed to load explorer data',
          );
        }
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
        ['om7', 'om8', 'om9'].some((s) => model.id.endsWith(s)));
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
      group.records.some((r) => r.id.toLowerCase().includes(deferredSearch))
    );
  });
  const selectedResidueGroup =
    searchedResidueGroups.find((g) => g.position === selectedResiduePosition) ||
    residueGroups.find((g) => g.position === selectedResiduePosition) ||
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
      !selectedResidueGroup.records.some((r) => r.id === selectedMutationId)
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

  const handleSelectResidue = (group) => {
    setSelectedResiduePosition(group.position);
    setSelectedMutationId(getPreferredMutation(group.records)?.id || '');
  };

  const handleFilterChange = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {error && (
        <div className="container-max py-4">
          <div
            style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '12px',
              padding: '12px 20px',
              fontSize: '14px',
              color: '#991b1b',
            }}
          >
            {error}
          </div>
        </div>
      )}

      <main className="container-max py-8">
        <Reveal>
          <PageHeader selectedModel={selectedModel} />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <Reveal delay={0.01}>
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                <ModelSelector
                  models={filteredModels}
                  selectedModelId={selectedModel?.id}
                  onSelectModel={handleSelectModel}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                />
              </div>
            </Reveal>

            <Reveal delay={0.02}>
              <div className="sticky top-6">
                <MutationDataPanelV2
                  model={selectedModel}
                  mutation={selectedMutation}
                  crossModelCount={samePositionMutations.length}
                  onCompareAcrossModels={() => setModalOpen(true)}
                />
              </div>
            </Reveal>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Reveal delay={0.02}>
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="p-4 flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-slate-600 truncate">
                        {selectedModel?.displayName || ''}
                      </span>
                    </div>
                  </div>
                </div>
                <StructureSection
                  selectedMutation={selectedMutation}
                  structureUrl={structureUrl}
                  crossModelLabel=""
                  crossModelCount={samePositionMutations.length}
                />
              </div>
            </Reveal>

            <Reveal delay={0.03}>
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                <ResidueSelectionPanel
                  content={{
                    residuesLabel: 'Residues',
                    mutationsLabel: 'Mutations',
                  }}
                  residueGroups={searchedResidueGroups}
                  selectedResidueGroup={selectedResidueGroup}
                  selectedMutation={selectedMutation}
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  onSelectResidue={handleSelectResidue}
                  onSelectMutation={setSelectedMutationId}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </main>

      <CrossModelModalV2
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        mutationId={selectedMutation?.id}
        entries={getMutationCrossModelData(
          allModels,
          mutationsByModel,
          selectedMutation?.id,
        )}
      />
    </div>
  );
}

function PageHeader({ selectedModel }) {
  return (
    <div className="mb-8 pb-6 border-b border-slate-200/80">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            {explorerContent.hero.title}
          </h1>
          <p className="mt-1 text-sm text-slate-500 max-w-xl">
            Browse mutation models across species and glycan types. Inspect
            binding energetics and structural data.
          </p>
        </div>

        {selectedModel && (
          <div className="flex items-center gap-4 px-4 py-2 bg-white rounded-lg border border-slate-200/80 shadow-sm shrink-0">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Model
              </div>
              <div className="text-sm font-semibold text-slate-900">
                {selectedModel.displayName}
              </div>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Host
              </div>
              <div className="text-sm text-slate-700">
                {formatSpeciesLabel(selectedModel.species)}
              </div>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Glycan
              </div>
              <div className="text-sm text-slate-700">
                {selectedModel.glycanType || 'N/A'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}