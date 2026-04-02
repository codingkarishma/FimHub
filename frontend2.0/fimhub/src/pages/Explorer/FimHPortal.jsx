import { useDeferredValue, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import PageHero from '../../components/site/PageHero';
import SectionIntro from '../../components/site/SectionIntro';
import StructureViewport from '../../components/StructureViewport';
import { getMutations } from '../../services/api';
import {
  buildDatasetSummary,
  formatCompactNumber,
  formatNumber,
  formatSignedNumber,
  getDefaultMutationForResidue,
  getDatasetMeta,
  getInducedMutations,
  getImpactRanking,
  getLandscapePoints,
  getMutantResidue,
  getMutationName,
  getMutationPosition,
  getResidueGroups,
  getWildTypeResidue,
  isWildTypeReference,
  resolveStructureUrl,
} from '../../lib/fimhPortal';
import fimhArchitectureImage from '../../assets/rpec/fimh-domain-architecture.png';
const speciesOptions = [
  { value: 'human', label: 'Human' },
  { value: 'porcine', label: 'Porcine' },
];
const glycanOptions = ['om3', 'om6'];

function toneClass(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) return 'text-slate-500';
  return value < 0 ? 'text-emerald-600' : 'text-rose-600';
}

function barColor(value) {
  return value < 0 ? '#059669' : '#dc2626';
}

function getBindingSignal(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return {
      label: 'Binding signal unavailable',
      tone: 'border-slate-200 bg-slate-100 text-slate-700',
    };
  }

  if (value < -1) {
    return {
      label: 'Binding strengthened',
      tone: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    };
  }

  if (value < 0) {
    return {
      label: 'Binding slightly strengthened',
      tone: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    };
  }

  if (value > 1) {
    return {
      label: 'Binding weakened',
      tone: 'border-rose-200 bg-rose-50 text-rose-700',
    };
  }

  if (value > 0) {
    return {
      label: 'Binding slightly weakened',
      tone: 'border-rose-200 bg-rose-50 text-rose-700',
    };
  }

  return {
    label: 'Binding close to reference',
    tone: 'border-slate-200 bg-slate-100 text-slate-700',
  };
}

function getStabilitySignal(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return {
      label: 'Stability signal unavailable',
      tone: 'border-slate-200 bg-slate-100 text-slate-700',
    };
  }

  if (Math.abs(value) <= 1) {
    return {
      label: 'Low structural cost',
      tone: 'border-sky-200 bg-sky-50 text-sky-700',
    };
  }

  if (Math.abs(value) <= 2) {
    return {
      label: 'Moderate structural cost',
      tone: 'border-amber-200 bg-amber-50 text-amber-700',
    };
  }

  return {
    label: 'High structural cost',
    tone: 'border-rose-200 bg-rose-50 text-rose-700',
  };
}

export default function FimHPortal() {
  const location = useLocation();
  const [species, setSpecies] = useState('human');
  const [glycan, setGlycan] = useState('om3');
  const [mutations, setMutations] = useState([]);
  const [selectedResiduePosition, setSelectedResiduePosition] = useState(null);
  const [selectedMutationName, setSelectedMutationName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const deferredSearch = useDeferredValue(searchTerm).trim().toLowerCase();

  useEffect(() => {
    if (species === 'porcine' && glycan === 'om3') setGlycan('om6');
  }, [glycan, species]);

  useEffect(() => {
    let cancelled = false;

    async function loadDataset() {
      try {
        setLoading(true);
        setError(null);
        const response = await getMutations(species, glycan);
        const nextMutations = Array.isArray(response?.data) ? response.data : [];
        if (cancelled) return;
        setMutations(nextMutations);
        const nextGroups = getResidueGroups(nextMutations);
        const fallbackGroup = nextGroups[0] || null;
        const nextPosition =
          nextGroups.find((group) => group.position === selectedResiduePosition)?.position ??
          fallbackGroup?.position ??
          null;
        const nextGroup =
          nextGroups.find((group) => group.position === nextPosition) || fallbackGroup;
        const nextMutation =
          nextGroup?.records.find((record) => getMutationName(record) === selectedMutationName) ||
          getDefaultMutationForResidue(nextGroup);

        setSelectedResiduePosition(nextPosition);
        setSelectedMutationName(nextMutation ? getMutationName(nextMutation) : '');
      } catch (requestError) {
        if (!cancelled) {
          setMutations([]);
          setSelectedResiduePosition(null);
          setSelectedMutationName('');
          setError(requestError.message || 'Failed to load dataset.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadDataset();
    return () => {
      cancelled = true;
    };
  }, [glycan, species]);

  useEffect(() => {
    if (!location.hash) return;
    const target = document.getElementById(location.hash.slice(1));
    if (target) window.requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }, [location.hash]);

  const residueGroups = getResidueGroups(mutations).filter(
    (group) => getInducedMutations(group.records).length > 0
  );
  const filteredResidueGroups = residueGroups.filter((group) => {
    if (!deferredSearch) {
      return true;
    }

    const residueLabel = `${group.wildType}${group.position}`.toLowerCase();
    return (
      residueLabel.includes(deferredSearch) ||
      group.records.some((record) => getMutationName(record).toLowerCase().includes(deferredSearch))
    );
  });
  const selectedResidueGroup =
    residueGroups.find((group) => group.position === selectedResiduePosition) || residueGroups[0] || null;
  const selectedMutation =
    selectedResidueGroup?.records.find((record) => getMutationName(record) === selectedMutationName) ||
    getDefaultMutationForResidue(selectedResidueGroup);
  const selectedResidueMutations = getInducedMutations(selectedResidueGroup?.records || []);

  const datasetMeta = getDatasetMeta(species, glycan);
  const summary = buildDatasetSummary(mutations, species, glycan);
  const ranking = getImpactRanking(selectedResidueMutations, 20);
  const landscape = getLandscapePoints(selectedResidueMutations);
  const selectedPoint = selectedMutation ? getLandscapePoints([selectedMutation]) : [];
  const mutationName = selectedMutation ? getMutationName(selectedMutation) : 'Select a mutation';
  const mutationPosition = getMutationPosition(selectedMutation);
  const structureUrl = resolveStructureUrl(selectedMutation, species, glycan);
  const selectedMutationIsReference = isWildTypeReference(selectedMutation);
  const structureStatus = !selectedMutation
    ? 'Choose a mutation first'
    : selectedMutationIsReference
      ? 'Reference state only'
    : structureUrl
      ? 'Linked and viewable'
      : 'No linked PDB yet';
  const bindingSignal = getBindingSignal(selectedMutation?.dAffinity);
  const stabilitySignal = getStabilitySignal(selectedMutation?.dStability);
  const insightCards = [
    { label: 'Mutations', value: summary.totalMutations, tone: 'text-slate-950' },
    { label: 'Stronger binders', value: summary.enhancedCount, tone: 'text-emerald-600' },
    { label: 'Weaker binders', value: summary.weakenedCount, tone: 'text-rose-600' },
    { label: 'Linked structures', value: summary.structureCount, tone: 'text-slate-950' },
  ];
  const residueInsights = selectedResidueGroup
      ? {
        label: `${selectedResidueGroup.wildType}${selectedResidueGroup.position}`,
        mutationCount: selectedResidueMutations.length,
        mutationPattern: selectedResidueGroup.records[0]?.mutexp || 'N/A',
      }
    : null;

  return (
    <div className="page-backdrop">
      <PageHero
        eyebrow="Mutation explorer"
        title="Single-point mutations binding change and structure in one workbench"
        description="Search residue by residue compare mutation level binding shifts against structural cost and keep the selected structure in view while you interpret the dataset."
        image={fimhArchitectureImage}
        imageAlt="FimH structural architecture used as the portal hero visual."
        actions={
          <>
            <a href="#portal-workbench">
              <Button size="lg" className="bg-white text-slate-950 hover:bg-slate-100">
                Open workbench
              </Button>
            </a>
            <Link to="/molecular-mechanism">
              <Button variant="outline" size="lg" className="border-white/20 bg-transparent text-white hover:bg-white/10">
                Review mechanism
              </Button>
            </Link>
          </>
        }
      /> 

      <section className="section-shell pb-8">
        <div className="container-max">
          <SectionIntro
            eyebrow="Workbench overview"
            title="The dashboard stays inside the narrative"
            description="Filters sit on the left interpretation stays central and the structure viewer remains tied to the selected mutation so the workflow does not fragment as more single-point mutation panels are added."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <div className="inset-panel">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Residue language</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                A residue label such as <span className="font-mono text-slate-900">Y48</span> means tyrosine at sequence position 48 in FimH.
              </p>
            </div>
            <div className="inset-panel">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Mutation language</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                A mutation label such as <span className="font-mono text-slate-900">Y48F</span> means the original residue Y was changed to F at position 48.
              </p>
            </div>
            <div className="inset-panel">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Binding language</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Negative <span className="font-mono text-slate-900">dAffinity</span> means stronger predicted binding. Positive values mean weaker binding than the reference state.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="portal-workbench" className="pb-16">
        <div className="container-max grid gap-8 xl:grid-cols-[22rem,1fr]">
          <div className="space-y-6 xl:sticky xl:top-28 xl:h-fit">
            <Card hoverable={false}>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-[#0d1f1c] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  {datasetMeta.label}
                </span>
                <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">
                  {datasetMeta.badge}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{datasetMeta.description}</p>

              <div className="mt-6 space-y-3">
                <p className="text-sm font-semibold text-slate-900">Species lens</p>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  {speciesOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setSpecies(option.value)}
                      className={`w-full rounded-[1.35rem] border px-4 py-3 text-left text-sm font-semibold transition-colors ${
                        species === option.value
                          ? 'border-slate-950 bg-slate-950 text-white'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <p className="text-sm font-semibold text-slate-900">Glycan panel</p>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  {glycanOptions.map((option) => {
                    const disabled = species === 'porcine' && option === 'om3';
                    return (
                      <button
                        key={option}
                        type="button"
                        disabled={disabled}
                        onClick={() => setGlycan(option)}
                        className={`w-full rounded-[1.35rem] border px-4 py-3 text-left text-sm font-semibold uppercase transition-colors ${
                          disabled
                            ? 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400'
                            : glycan === option
                              ? 'border-primary-600 bg-primary-600 text-white'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-900">Residue catalog</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {filteredResidueGroups.length} mutated residues
                  </p>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="F1 Y48 Q133 Y48F"
                  className="w-full rounded-[1.35rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-colors focus:border-primary-500 focus:bg-white"
                />
                <p className="text-xs leading-6 text-slate-500">
                  Only positions with tested mutations are shown here. Reference only positions are hidden so the list stays clean.
                </p>
                <div className="max-h-[18rem] space-y-2 overflow-y-auto pr-1 md:max-h-[24rem]">
                  {loading && <div className="rounded-[1.35rem] bg-slate-50 px-4 py-5 text-center text-sm text-slate-500">Loading residue catalog...</div>}
                  {!loading && filteredResidueGroups.length === 0 && <div className="rounded-[1.35rem] bg-slate-50 px-4 py-5 text-center text-sm text-slate-500">No residues matched.</div>}
                  {!loading && filteredResidueGroups.map((group) => {
                    const isSelected = group.position === selectedResiduePosition;
                    return (
                      <button
                        key={group.position}
                        type="button"
                        onClick={() => {
                          setSelectedResiduePosition(group.position);
                          setSelectedMutationName('');
                        }}
                        className={`w-full rounded-[1.35rem] border px-4 py-3 text-left transition-colors ${isSelected ? 'border-primary-600 bg-primary-600 text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'}`}
                      >
                        <span className="block font-mono text-sm font-semibold">{group.wildType}{group.position}</span>
                        <span className={`mt-1 block text-xs ${isSelected ? 'text-primary-100' : 'text-slate-500'}`}>
                          {getInducedMutations(group.records).length} mutations
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* <div className="surface-panel-dark p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Roadmap</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">{datasetMeta.nextStep}</p>
            </div> */}
          </div>

          <div className="space-y-8">
            {error && <Card hoverable={false} className="border-rose-200 bg-rose-50"><p className="text-sm font-semibold text-rose-700">{error}</p></Card>}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {insightCards.map((card) => (
                <div key={card.label} className="metric-tile">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{card.label}</p>
                  <p className={`mt-4 text-4xl font-bold ${card.tone}`}>{card.value}</p>
                </div>
              ))}
            </div>

            <Card hoverable={false}>
              <div className="grid gap-8 xl:grid-cols-[1.15fr,0.85fr]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Sequence navigator</p>
                  <h3 className="mt-2 text-3xl font-bold text-slate-950">Choose a mutated residue then inspect the mutations tested at that site</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Each tile shows the original amino acid and its sequence position on one line such as <span className="font-mono text-slate-900">Y48</span>. Only mutated positions are shown.
                  </p>

                  <div className="mt-6 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4 md:p-5">
                    <div className="flex flex-wrap gap-2">
                      {filteredResidueGroups.map((item) => {
                        const isSelected = item.position === selectedResiduePosition;
                        return (
                          <button
                            key={item.position}
                            type="button"
                            onClick={() => {
                              setSelectedResiduePosition(item.position);
                              setSelectedMutationName('');
                            }}
                            className={`min-w-[5.25rem] rounded-[1.1rem] border px-3 py-3 text-center transition-colors ${
                              isSelected
                                ? 'border-primary-600 bg-primary-600 text-white'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                            }`}
                          >
                            <span className="block font-mono text-base font-bold">
                              {item.wildType}{item.position}
                            </span>
                            <span className={`mt-1 block text-[11px] font-semibold ${isSelected ? 'text-primary-100' : 'text-slate-500'}`}>
                              {getInducedMutations(item.records).length} mutations
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="surface-panel-dark p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Selected residue</p>
                    <h4 className="mt-3 font-mono text-3xl font-bold text-white">
                      {residueInsights ? residueInsights.label : 'Choose a residue'}
                    </h4>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      This is the original amino acid and position being tested. All mutation labels shown below belong to this one site.
                    </p>
                    <div className="mt-5 grid gap-3 text-sm text-slate-300">
                      <p>Mutations tested: <span className="font-semibold text-white">{residueInsights ? residueInsights.mutationCount : 'N/A'}</span></p>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-300">
                      Full set: <span className="font-mono text-white">{residueInsights ? residueInsights.mutationPattern : 'Select a residue to view the tested substitutions.'}</span>
                    </p>
                  </div>

                  <div className="inset-panel">
                    <label htmlFor="mutation-select" className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                      Available mutations at this residue
                    </label>
                    <select
                      id="mutation-select"
                      value={selectedMutation ? getMutationName(selectedMutation) : ''}
                      onChange={(event) => {
                        setSelectedMutationName(event.target.value);
                      }}
                      className="mt-3 w-full rounded-[1.15rem] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition-colors focus:border-primary-500"
                      disabled={!selectedResidueGroup}
                    >
                      {!selectedResidueGroup && <option value="">Select a residue first</option>}
                      {selectedResidueGroup?.records.map((record) => (
                        <option key={getMutationName(record)} value={getMutationName(record)}>
                          {getMutationName(record)}
                        </option>
                      ))}
                    </select>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {selectedResidueGroup?.records.map((record) => {
                        const active = getMutationName(record) === mutationName;
                        return (
                          <button
                            key={getMutationName(record)}
                            type="button"
                            onClick={() => setSelectedMutationName(getMutationName(record))}
                            className={`rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${
                              active
                                ? 'border-primary-600 bg-primary-600 text-white'
                                : isWildTypeReference(record)
                                  ? 'border-slate-200 bg-slate-100 text-slate-500 hover:bg-slate-200'
                                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {getMutationName(record)}{isWildTypeReference(record) ? ' ref' : ''}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card hoverable={false}>
              <div className="grid gap-6 xl:grid-cols-[1.05fr,0.95fr]">
                <div>
                  <div className="flex flex-wrap gap-3">
                    <span className="rounded-full bg-[#0d1f1c] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white">Selected mutation</span>
                    <span className="rounded-full bg-sky-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-800">{species} {glycan.toUpperCase()}</span>
                  </div>
                  <h2 className="mt-5 font-mono text-4xl font-bold text-slate-950 md:text-5xl">{mutationName}</h2>
                  <p className="mt-3 text-slate-600">
                    {selectedMutation
                      ? `Mutation ${mutationName} in the ${species} ${glycan.toUpperCase()} panel`
                      : 'Choose a mutation from the left panel to inspect binding stability and structure details'}
                  </p>
                  {selectedMutation && (
                    <p className="mt-2 text-sm leading-7 text-slate-500">
                      <span className="font-mono font-semibold text-slate-800">{getWildTypeResidue(selectedMutation)}{mutationPosition}</span>
                      {' '}is the original site and{' '}
                      <span className="font-mono font-semibold text-slate-800">{mutationName}</span>
                      {' '}is the tested substitution.
                    </p>
                  )}
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className={`rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${bindingSignal.tone}`}>
                      {bindingSignal.label}
                    </span>
                    <span className={`rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${stabilitySignal.tone}`}>
                      {stabilitySignal.label}
                    </span>
                    <span className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700">
                      {structureStatus}
                    </span>
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="inset-panel"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Affinity</p><p className="mt-3 text-3xl font-bold text-slate-950">{formatCompactNumber(selectedMutation?.Affinity)}</p></div>
                    <div className="inset-panel"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">dAffinity</p><p className={`mt-3 text-3xl font-bold ${toneClass(selectedMutation?.dAffinity)}`}>{formatSignedNumber(selectedMutation?.dAffinity)}</p></div>
                    <div className="inset-panel"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Stability</p><p className="mt-3 text-3xl font-bold text-slate-950">{formatCompactNumber(selectedMutation?.Stability)}</p></div>
                    <div className="inset-panel"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">dStability</p><p className="mt-3 text-3xl font-bold text-slate-950">{formatSignedNumber(selectedMutation?.dStability)}</p></div>
                  </div>
                </div>
                <div className="surface-panel-dark p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Quick interpretation</p>
                  <div className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
                    <p>Binding call <span className="font-semibold text-white">{bindingSignal.label}</span></p>
                    <p>Structural readout <span className="font-semibold text-white">{stabilitySignal.label}</span></p>
                    <p>Best binder <span className="font-mono text-white">{summary.strongestBinder ? getMutationName(summary.strongestBinder) : 'N/A'}</span> {formatSignedNumber(summary.strongestBinder?.dAffinity)}</p>
                    <p>Weakest binder <span className="font-mono text-white">{summary.weakestBinder ? getMutationName(summary.weakestBinder) : 'N/A'}</span> {formatSignedNumber(summary.weakestBinder?.dAffinity)}</p>
                    <p>Residue focus <span className="font-semibold text-white">{residueInsights ? residueInsights.label : 'N/A'}</span> with <span className="font-semibold text-white">{residueInsights ? residueInsights.mutationCount : 'N/A'}</span> mutations</p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid gap-8 xl:grid-cols-2">
              <Card hoverable={false}>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Impact ranking</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-950">Binding shifts at this residue</h3>
                <p className="mt-3 text-sm text-slate-600">This chart compares only the mutations tested at the selected position. Negative dAffinity suggests stronger binding while positive dAffinity suggests weakening against the reference state.</p>
                <div className="mt-6 h-72 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ranking} margin={{ top: 10, right: 10, left: -10, bottom: 35 }}>
                      <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" />
                      <XAxis
                        dataKey="mutation"
                        tick={{ fontSize: 11 }}
                        angle={-28}
                        textAnchor="end"
                        height={72}
                        label={{ value: 'Tested mutation at selected residue', position: 'insideBottom', offset: -5, style: { fontSize: 12, fill: '#475569', fontWeight: 600 } }}
                      />
                      <YAxis
                        tick={{ fontSize: 12 }}
                        label={{ value: 'dAffinity  binding change vs reference', angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: '#475569', fontWeight: 600 } }}
                      />
                      <Tooltip
                        formatter={(value, name) => [typeof value === 'number' ? value.toFixed(3) : value, name === 'dAffinity' ? 'dAffinity' : name]}
                        labelFormatter={(label) => `Mutation ${label}`}
                      />
                      <ReferenceLine y={0} stroke="#334155" strokeDasharray="3 3" />
                      <Bar dataKey="dAffinity" radius={[10, 10, 0, 0]}>
                        {ranking.map((record) => <Cell key={record.mutation} fill={barColor(record.dAffinity)} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card hoverable={false}>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Landscape</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-950">Residue mutation landscape</h3>
                <p className="mt-3 text-sm text-slate-600">Each point is one mutation at the selected residue so the researcher can compare all substitutions at that site directly.</p>
                <div className="mt-6 h-72 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 10, right: 10, left: -10, bottom: 10 }}>
                      <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" />
                      <XAxis
                        type="number"
                        dataKey="dAffinity"
                        tick={{ fontSize: 12 }}
                        label={{ value: 'dAffinity  binding change', position: 'insideBottom', offset: -5, style: { fontSize: 12, fill: '#475569', fontWeight: 600 } }}
                      />
                      <YAxis
                        type="number"
                        dataKey="dStability"
                        tick={{ fontSize: 12 }}
                        label={{ value: 'dStability  structural change', angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: '#475569', fontWeight: 600 } }}
                      />
                      <Tooltip
                        formatter={(value, name) => [typeof value === 'number' ? value.toFixed(3) : value, name === 'dAffinity' ? 'dAffinity' : 'dStability']}
                        labelFormatter={() => ''}
                      />
                      <ReferenceLine x={0} stroke="#334155" strokeDasharray="3 3" />
                      <ReferenceLine y={0} stroke="#334155" strokeDasharray="3 3" />
                      <Scatter data={landscape} fill="#1d4ed8" />
                      <Scatter data={selectedPoint} fill="#f59e0b" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <Card id="structure-lab" hoverable={false}>
              <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Structure lab</p>
                  <h3 className="mt-2 text-3xl font-bold text-slate-950">3D viewer and file access</h3>
                  <p className="mt-3 text-sm text-slate-600">The selected mutation remains linked to the viewer so analytics and structure stay in one place while the mutation library expands across additional glycan panels.</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  {structureUrl && <a href={structureUrl} target="_blank" rel="noreferrer"><Button>Open linked PDB</Button></a>}
                </div>
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
                <StructureViewport
                  mutationName={mutationName}
                  mutationPosition={mutationPosition}
                  structureUrl={structureUrl}
                  wildTypeResidue={getWildTypeResidue(selectedMutation)}
                  mutantResidue={getMutantResidue(selectedMutation)}
                />
                <div className="space-y-6">
                  <div className="surface-panel-dark p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Current model</p>
                    <h4 className="mt-3 font-mono text-3xl font-bold">{mutationName}</h4>
                    <div className="mt-5 space-y-3 text-sm text-slate-300">
                      <p>Species: <span className="font-semibold capitalize text-white">{species}</span></p>
                      <p>Glycan panel: <span className="font-semibold uppercase text-white">{glycan}</span></p>
                      <p>Residue position: <span className="font-semibold text-white">{mutationPosition || 'N/A'}</span></p>
                      <p>Status: <span className="font-semibold text-white">{structureStatus}</span></p>
                    </div>
                    {selectedMutation && (
                      <div className="mt-5 rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Mutation identity</p>
                        <div className="mt-3 flex items-center gap-3">
                          <span className="rounded-full bg-slate-100 px-3 py-2 font-mono text-sm font-semibold text-slate-950">
                            {getWildTypeResidue(selectedMutation)}
                          </span>
                          <span className="text-sm text-slate-400">to</span>
                          <span className="rounded-full bg-amber-300 px-3 py-2 font-mono text-sm font-semibold text-slate-950">
                            {getMutantResidue(selectedMutation)}
                          </span>
                          <span className="rounded-full border border-white/10 px-3 py-2 font-mono text-sm text-white">
                            {mutationPosition || 'N/A'}
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-7 text-slate-300">
                          The selected residue is highlighted in the viewer and labeled here so the original site and the tested substitution are easier to distinguish.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Selected record</p>
                    <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
                      <div><p className="text-slate-500">Mutation</p><p className="font-mono font-semibold text-slate-950">{mutationName}</p></div>
                      <div><p className="text-slate-500">Affinity</p><p className="font-semibold text-slate-950">{formatNumber(selectedMutation?.Affinity, 2)}</p></div>
                      <div><p className="text-slate-500">dAffinity</p><p className={`font-semibold ${toneClass(selectedMutation?.dAffinity)}`}>{formatSignedNumber(selectedMutation?.dAffinity)}</p></div>
                      <div><p className="text-slate-500">dStability</p><p className="font-semibold text-slate-950">{formatSignedNumber(selectedMutation?.dStability)}</p></div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
