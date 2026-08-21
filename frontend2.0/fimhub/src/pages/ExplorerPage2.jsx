import { useDeferredValue, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Reveal from '../components/site/Reveal';
import ModelSelector from '../components/explorer/ModelSelector';
import MutationDataPanelV2 from '../components/explorer/MutationDataPanelV2';
import CrossModelModalV2 from '../components/explorer/CrossModelModalV2';
import ResidueSelectionPanel from '../new-files/ResidueSelectionPanel';
import StructureSection from '../new-files/StructureSection';
import ProfileChart from '../new-files/ProfileChart';
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
      group.records.some((record) =>
        record.id.toLowerCase().includes(deferredSearch),
      )
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

  const { residuesLabel, mutationsLabel } =
    explorerContent.sections.residueWorkspace;
  const { crossModelLabel } = explorerContent.sections.structurePanel;

  return (
    <div style={{ background: colors.bg, minHeight: '100vh' }}>
      {error && (
        <div className="container-max py-4">
          <div
            style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              padding: '12px 16px',
              fontSize: '14px',
              color: '#991b1b',
            }}
          >
            {error}
          </div>
        </div>
      )}

      <main className="container-max py-8 md:py-10">
        <Reveal>
          <PageHeader selectedModel={selectedModel} />
        </Reveal>

        <section
          style={{
            display: 'grid',
            gridTemplateColumns: '280px 1fr 320px',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          <Reveal className="xl:sticky xl:top-24 xl:h-fit">
            <ModelSelector
              models={filteredModels}
              selectedModelId={selectedModel?.id}
              onSelectModel={handleSelectModel}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </Reveal>

          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            <Reveal>
              <ResidueSelectionPanel
                content={{ residuesLabel, mutationsLabel }}
                residueGroups={searchedResidueGroups}
                selectedResidueGroup={selectedResidueGroup}
                selectedMutation={selectedMutation}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onSelectResidue={handleSelectResidue}
                onSelectMutation={setSelectedMutationId}
              />
            </Reveal>

            <Reveal delay={0.02}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
                  gap: '24px',
                }}
              >
                <ProfileChart
                  eyebrowText="Binding Energetics"
                  title={
                    selectedResidueGroup
                      ? `${selectedResidueGroup.wt}${selectedResidueGroup.position} Affinity Profile`
                      : 'Affinity Profile'
                  }
                  data={comparisonData}
                  valueKey="affinity"
                  deltaKey="dAffinity"
                  valueLabel="Affinity"
                  deltaLabel="ΔAffinity"
                  deltaColor={colors.affinityDelta}
                />
                <ProfileChart
                  eyebrowText="Thermodynamic Stability"
                  title={
                    selectedResidueGroup
                      ? `${selectedResidueGroup.wt}${selectedResidueGroup.position} Stability Profile`
                      : 'Stability Profile'
                  }
                  data={comparisonData}
                  valueKey="stability"
                  deltaKey="dStability"
                  valueLabel="Stability"
                  deltaLabel="dStability"
                  deltaColor={colors.stabilityDelta}
                />
              </div>
            </Reveal>

            <Reveal delay={0.03}>
              <StructureSection
                selectedMutation={selectedMutation}
                structureUrl={structureUrl}
                crossModelLabel={crossModelLabel}
                crossModelCount={samePositionMutations.length}
              />
            </Reveal>
          </div>

          <Reveal delay={0.03}>
            <div
              style={{
                position: 'sticky',
                top: '96px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <MutationDataPanelV2
                model={selectedModel}
                mutation={selectedMutation}
                crossModelCount={samePositionMutations.length}
                onCompareAcrossModels={() => setModalOpen(true)}
              />
              <Link
                to="/guide"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px',
                  background: '#ffffff',
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px',
                  color: colors.muted,
                  fontSize: '14px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.borderStrong;
                  e.currentTarget.style.color = colors.body;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = colors.border;
                  e.currentTarget.style.color = colors.muted;
                }}
              >
                Guide
              </Link>
            </div>
          </Reveal>
        </section>
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
  const modelDetails = [
    { label: 'Host', value: formatSpeciesLabel(selectedModel?.species) },
    { label: 'Glycan', value: selectedModel?.glycanType || 'N/A' },
  ];

  return (
    <section
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: '32px',
        paddingBottom: '24px',
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <div>
        <p
          style={{
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: colors.muted,
            marginBottom: '8px',
          }}
        >
          Explorer
        </p>
        <h1
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: colors.ink,
            lineHeight: 1.2,
          }}
        >
          {explorerContent.hero.title}
        </h1>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          background: '#ffffff',
          padding: '16px 20px',
          borderRadius: '10px',
          border: `1px solid ${colors.border}`,
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}
      >
        <div>
          <span
            style={{
              display: 'block',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: colors.faint,
              marginBottom: '4px',
            }}
          >
            Active Model
          </span>
          <strong style={{ fontSize: '15px', color: colors.ink }}>
            {selectedModel?.displayName || 'No model selected'}
          </strong>
        </div>
        <dl style={{ display: 'flex', gap: '20px', margin: 0 }}>
          {modelDetails.map((item) => (
            <div key={item.label} style={{ margin: 0 }}>
              <dt
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  color: colors.faint,
                  letterSpacing: '0.05em',
                  marginBottom: '2px',
                }}
              >
                {item.label}
              </dt>
              <dd
                style={{
                  fontSize: '14px',
                  color: colors.body,
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
