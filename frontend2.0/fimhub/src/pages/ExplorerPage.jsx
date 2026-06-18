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
  if (!value) return 'N/A';
  return value.charAt(0).toUpperCase() + value.slice(1);
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

function AffinityTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const data = payload[0]?.payload;
  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.98)',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '12px 16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        fontSize: '13px',
        lineHeight: 1.5,
        color: '#1e293b',
        minWidth: '160px',
      }}
    >
      <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '8px', color: '#0f172a' }}>
        {label}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginBottom: '4px' }}>
        <span style={{ color: '#64748b' }}>Affinity:</span>
        <span style={{ fontWeight: 500, color: '#475569' }}>{formatNumber(data?.affinity)}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
        <span style={{ color: '#64748b' }}>ΔAffinity:</span>
        <span style={{ fontWeight: 500, color: '#0d9488' }}>{formatSignedNumber(data?.dAffinity)}</span>
      </div>
    </div>
  );
}

function StabilityTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const data = payload[0]?.payload;
  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.98)',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '12px 16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        fontSize: '13px',
        lineHeight: 1.5,
        color: '#1e293b',
        minWidth: '160px',
      }}
    >
      <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '8px', color: '#0f172a' }}>
        {label}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginBottom: '4px' }}>
        <span style={{ color: '#64748b' }}>Stability:</span>
        <span style={{ fontWeight: 500, color: '#475569' }}>{formatNumber(data?.stability)}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
        <span style={{ color: '#64748b' }}>ΔStability:</span>
        <span style={{ fontWeight: 500, color: '#6366f1' }}>{formatSignedNumber(data?.dStability)}</span>
      </div>
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
    <div className="explorer-page" style={{ background: '#f8fafc', minHeight: '100vh' }}>
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
          <section
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '32px',
              paddingBottom: '24px',
              borderBottom: '1px solid #e2e8f0',
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#64748b',
                  marginBottom: '8px',
                }}
              >
                Explorer
              </p>
              <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
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
                border: '1px solid #e2e8f0',
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
                    color: '#94a3b8',
                    marginBottom: '4px',
                  }}
                >
                  Active Model
                </span>
                <strong style={{ fontSize: '15px', color: '#0f172a' }}>
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
                        color: '#94a3b8',
                        letterSpacing: '0.05em',
                        marginBottom: '2px',
                      }}
                    >
                      {item.label}
                    </dt>
                    <dd style={{ fontSize: '14px', color: '#334155', margin: 0, fontWeight: 500 }}>
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        </Reveal>

        <section
          className="explorer-workspace"
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

          <div className="explorer-main-stack" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Selection Panel */}
            <Reveal>
              <section
                className="explorer-panel"
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  padding: '24px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: '#64748b',
                        marginBottom: '6px',
                      }}
                    >
                      Residue Selection
                    </p>
                    <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#0f172a' }}>
                      Choose Site and Substitution
                    </h2>
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search site or substitution..."
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      width: '240px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#94a3b8')}
                    onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                  />
                </div>

                <div
                  className="explorer-selection-grid"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '24px',
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: '#94a3b8',
                        marginBottom: '12px',
                      }}
                    >
                      {explorerContent.sections.residueWorkspace.residuesLabel}
                    </p>
                    <div
                      className="explorer-residue-grid"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(56px, 1fr))',
                        gap: '6px',
                      }}
                    >
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
                            style={{
                              padding: '8px 4px',
                              borderRadius: '6px',
                              border: active ? '1px solid #0d9488' : '1px solid #e2e8f0',
                              background: active ? '#f0fdfa' : '#ffffff',
                              color: active ? '#0f766e' : '#475569',
                              fontSize: '13px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              transition: 'all 0.15s',
                              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                            }}
                            onMouseEnter={(e) => {
                              if (!active) e.currentTarget.style.background = '#f8fafc';
                            }}
                            onMouseLeave={(e) => {
                              if (!active) e.currentTarget.style.background = '#ffffff';
                            }}
                          >
                            {group.wt}
                            {group.position}
                          </button>
                        );
                      })}
                    </div>
                    {searchedResidueGroups.length === 0 && (
                      <p style={{ marginTop: '12px', fontSize: '13px', color: '#94a3b8' }}>
                        No residues matched.
                      </p>
                    )}
                  </div>

                  <div>
                    <p
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: '#94a3b8',
                        marginBottom: '12px',
                      }}
                    >
                      {explorerContent.sections.residueWorkspace.mutationsLabel}
                    </p>
                    <div
                      className="explorer-mutation-grid"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                        gap: '6px',
                      }}
                    >
                      {selectedResidueGroup?.records.map((record) => {
                        const active = record.id === selectedMutation?.id;
                        return (
                          <button
                            key={record.id}
                            type="button"
                            onClick={() => setSelectedMutationId(record.id)}
                            style={{
                              padding: '8px 10px',
                              borderRadius: '6px',
                              border: active ? '1px solid #6366f1' : '1px solid #e2e8f0',
                              background: active ? '#eef2ff' : '#ffffff',
                              color: active ? '#4338ca' : '#475569',
                              fontSize: '13px',
                              fontWeight: 500,
                              cursor: 'pointer',
                              transition: 'all 0.15s',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '6px',
                              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                            }}
                            onMouseEnter={(e) => {
                              if (!active) e.currentTarget.style.background = '#f8fafc';
                            }}
                            onMouseLeave={(e) => {
                              if (!active) e.currentTarget.style.background = '#ffffff';
                            }}
                          >
                            <span>{record.id}</span>
                            <span
                              style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: record.structureAvailable
                                  ? active
                                    ? '#0d9488'
                                    : '#10b981'
                                  : active
                                    ? '#94a3b8'
                                    : '#cbd5e1',
                                flexShrink: 0,
                              }}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>
            </Reveal>

            {/* SIDE-BY-SIDE CHARTS */}
            <Reveal delay={0.02}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
                  gap: '24px',
                }}
              >
                {/* LEFT — Affinity + ΔAffinity */}
                <section
                  style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    padding: '24px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  }}
                >
                  <div style={{ marginBottom: '16px' }}>
                    <p
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: '#64748b',
                        marginBottom: '6px',
                      }}
                    >
                      Binding Energetics
                    </p>
                    <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#0f172a' }}>
                      {selectedResidueGroup
                        ? `${selectedResidueGroup.wt}${selectedResidueGroup.position} Affinity Profile`
                        : 'Affinity Profile'}
                    </h2>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      gap: '16px',
                      fontSize: '12px',
                      marginBottom: '16px',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#475569' }} />
                      Affinity
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#0d9488' }} />
                      ΔAffinity
                    </span>
                  </div>

                  <div style={{ height: '340px', width: '100%' }}>
                    {comparisonData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={comparisonData}
                          margin={{ top: 12, right: 8, bottom: 24, left: 44 }}
                          barGap={2}
                        >
                          <CartesianGrid stroke="rgba(148, 163, 184, 0.12)" vertical={false} />
                          <XAxis
                            dataKey="id"
                            tickLine={false}
                            axisLine={{ stroke: 'rgba(148, 163, 184, 0.3)' }}
                            interval={0}
                            tick={{ fill: '#475569', fontSize: 11 }}
                            label={{
                              value: 'Substitution',
                              position: 'bottom',
                              offset: 8,
                              fill: '#64748b',
                              fontSize: 11,
                            }}
                          />
                          <YAxis
                            tickLine={false}
                            axisLine={{ stroke: 'rgba(148, 163, 184, 0.3)' }}
                            tick={{ fill: '#475569', fontSize: 11 }}
                            label={{
                              value: 'kcal/mol',
                              angle: -90,
                              position: 'insideLeft',
                              style: { fill: '#64748b', fontSize: 11 },
                            }}
                          />
                          <Tooltip content={<AffinityTooltip />} cursor={{ fill: 'rgba(241, 245, 249, 0.6)' }} />
                          <Bar dataKey="affinity" name="Affinity" fill="#475569" radius={[3, 3, 0, 0]} maxBarSize={22} />
                          <Bar dataKey="dAffinity" name="ΔAffinity" fill="#0d9488" radius={[3, 3, 0, 0]} maxBarSize={22} />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <p style={{ textAlign: 'center', color: '#94a3b8', paddingTop: '120px', fontSize: '14px' }}>
                        No data available.
                      </p>
                    )}
                  </div>
                </section>

                {/* RIGHT — Stability + ΔStability */}
                <section
                  style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    padding: '24px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  }}
                >
                  <div style={{ marginBottom: '16px' }}>
                    <p
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: '#64748b',
                        marginBottom: '6px',
                      }}
                    >
                      Thermodynamic Stability
                    </p>
                    <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#0f172a' }}>
                      {selectedResidueGroup
                        ? `${selectedResidueGroup.wt}${selectedResidueGroup.position} Stability Profile`
                        : 'Stability Profile'}
                    </h2>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      gap: '16px',
                      fontSize: '12px',
                      marginBottom: '16px',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#475569' }} />
                      Stability
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#6366f1' }} />
                      ΔStability
                    </span>
                  </div>

                  <div style={{ height: '340px', width: '100%' }}>
                    {comparisonData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={comparisonData}
                          margin={{ top: 12, right: 8, bottom: 24, left: 44 }}
                          barGap={2}
                        >
                          <CartesianGrid stroke="rgba(148, 163, 184, 0.12)" vertical={false} />
                          <XAxis
                            dataKey="id"
                            tickLine={false}
                            axisLine={{ stroke: 'rgba(148, 163, 184, 0.3)' }}
                            interval={0}
                            tick={{ fill: '#475569', fontSize: 11 }}
                            label={{
                              value: 'Substitution',
                              position: 'bottom',
                              offset: 8,
                              fill: '#64748b',
                              fontSize: 11,
                            }}
                          />
                          <YAxis
                            tickLine={false}
                            axisLine={{ stroke: 'rgba(148, 163, 184, 0.3)' }}
                            tick={{ fill: '#475569', fontSize: 11 }}
                            label={{
                              value: 'kcal/mol',
                              angle: -90,
                              position: 'insideLeft',
                              style: { fill: '#64748b', fontSize: 11 },
                            }}
                          />
                          <Tooltip content={<StabilityTooltip />} cursor={{ fill: 'rgba(241, 245, 249, 0.6)' }} />
                          <Bar dataKey="stability" name="Stability" fill="#475569" radius={[3, 3, 0, 0]} maxBarSize={22} />
                          <Bar dataKey="dStability" name="ΔStability" fill="#6366f1" radius={[3, 3, 0, 0]} maxBarSize={22} />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <p style={{ textAlign: 'center', color: '#94a3b8', paddingTop: '120px', fontSize: '14px' }}>
                        No data available.
                      </p>
                    )}
                  </div>
                </section>
              </div>
            </Reveal>

            {/* Structure Viewer & Metrics */}
            <Reveal delay={0.03}>
              <section
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  padding: '24px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: '#64748b',
                        marginBottom: '6px',
                      }}
                    >
                      Structure Viewer
                    </p>
                    <h2
                      style={{
                        fontSize: '20px',
                        fontWeight: 600,
                        color: '#0f172a',
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                      }}
                    >
                      {selectedMutation?.id || 'No mutation selected'}
                    </h2>
                  </div>
                  {structureUrl && (
                    <a href={structureUrl} download style={{ textDecoration: 'none' }}>
                      <Button
                        variant="outline"
                        size="sm"
                        style={{
                          borderRadius: '8px',
                          borderColor: '#cbd5e1',
                          color: '#475569',
                          fontWeight: 500,
                        }}
                      >
                        Download Structure
                      </Button>
                    </a>
                  )}
                </div>

                <div
                  style={{
                    background: '#f8fafc',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                    overflow: 'hidden',
                    marginBottom: '20px',
                  }}
                >
                  <StructureViewport
                    mutationName={selectedMutation?.id}
                    mutationPosition={selectedMutation?.position}
                    structureUrl={structureUrl}
                    wildTypeResidue={selectedMutation?.wt}
                    mutantResidue={selectedMutation?.mut}
                  />
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: '16px',
                  }}
                >
                  {[
                    {
                      label: explorerContent.sections.structurePanel.affinityLabel,
                      value: formatNumber(selectedMutation?.affinity),
                      color: '#0f172a',
                    },
                    {
                      label: explorerContent.sections.structurePanel.deltaAffinityLabel,
                      value: formatSignedNumber(selectedMutation?.ddg_binding),
                      color: '#0f172a',
                    },
                    {
                      label: explorerContent.sections.structurePanel.stabilityLabel,
                      value: formatNumber(selectedMutation?.stability),
                      color: '#0f172a',
                    },
                    {
                      label: explorerContent.sections.structurePanel.deltaStabilityLabel,
                      value: formatSignedNumber(selectedMutation?.ddg_stability),
                      color: '#0f172a',
                    },
                    {
                      label: explorerContent.sections.structurePanel.crossModelLabel,
                      value: samePositionMutations.length,
                      color: '#0f172a',
                    },
                  ].map((metric) => (
                    <div
                      key={metric.label}
                      style={{
                        background: '#f8fafc',
                        borderRadius: '8px',
                        padding: '14px 16px',
                        border: '1px solid #e2e8f0',
                      }}
                    >
                      <dt
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: '#94a3b8',
                          marginBottom: '6px',
                        }}
                      >
                        {metric.label}
                      </dt>
                      <dd
                        style={{
                          fontSize: '18px',
                          fontWeight: 700,
                          color: metric.color,
                          margin: 0,
                          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                        }}
                      >
                        {metric.value ?? '—'}
                      </dd>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>
          </div>

          <Reveal className="explorer-side-stack" delay={0.03}>
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
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  color: '#64748b',
                  fontSize: '14px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#cbd5e1';
                  e.currentTarget.style.color = '#475569';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.color = '#64748b';
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
        entries={getMutationCrossModelData(allModels, mutationsByModel, selectedMutation?.id)}
      />
    </div>
  );
}