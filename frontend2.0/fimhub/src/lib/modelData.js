const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

async function getJson(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status}`);
  }

  return response.json();
}

function toTitleCase(value = '') {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const LEGACY_MODEL_META = {
  human_om3: {
    id: 'human-om3',
    displayName: 'Human OM3',
    species: 'human',
    om: 'om3',
    glycanType: 'Oligomannose-3 (Man3GlcNAc2)',
    description: 'Human FimH model scored against the OM3 oligomannose glycan context.',
    color: '#0E6B6B',
    pdbRef: '1KIU',
    status: 'published',
  },
  human_om6: {
    id: 'human-om6',
    displayName: 'Human OM6',
    species: 'human',
    om: 'om6',
    glycanType: 'Oligomannose-6 (Man6GlcNAc2)',
    description: 'Human FimH model scored against the OM6 oligomannose glycan context.',
    color: '#2563EB',
    pdbRef: '1KIU',
    status: 'published',
  },
  porcine_om3: {
    id: 'porcine-om3',
    displayName: 'Porcine OM3',
    species: 'porcine',
    om: 'om3',
    glycanType: 'Oligomannose-3 (Man3GlcNAc2)',
    description: 'Porcine FimH comparison model for the OM3 glycan context.',
    color: '#B45309',
    pdbRef: '1KIU',
    status: 'published',
  },
  porcine_om6: {
    id: 'porcine-om6',
    displayName: 'Porcine OM6',
    species: 'porcine',
    om: 'om6',
    glycanType: 'Oligomannose-6 (Man6GlcNAc2)',
    description: 'Porcine FimH comparison model for the OM6 glycan context.',
    color: '#7C3AED',
    pdbRef: '1KIU',
    status: 'published',
  },
};

function mapBackendModel(model) {
  return {
    ...model,
    om: model.om || model.chainLength || model.glycan || null,
    displayName: model.displayName || model.label,
    glycanType: model.glycanType || model.label,
    species: model.species || 'unknown',
    description: model.description || '',
    counts: model.counts || {},
    color: model.color || '#0E6B6B',
    status: model.status || 'published',
  };
}

function mapLegacyModels(payload) {
  const catalog = payload?.legacy && typeof payload.legacy === 'object'
    ? payload.legacy
    : payload && !Array.isArray(payload) && typeof payload === 'object'
      ? payload
      : {};

  return Object.keys(catalog)
    .map((key) => LEGACY_MODEL_META[key])
    .filter(Boolean)
    .map(mapBackendModel);
}

function mapBackendMutation(record) {
  const mutationId = record.id || record.mutation_normalized || record.mutation;
  const parsed = typeof mutationId === 'string' ? mutationId.match(/^([A-Z])(\d+)([A-Z])$/) : null;
  const ddgBinding =
    typeof record.ddg_binding === 'number'
      ? record.ddg_binding
      : typeof record.dAffinity === 'number'
        ? record.dAffinity
        : null;
  const ddgStability =
    typeof record.ddg_stability === 'number'
      ? record.ddg_stability
      : typeof record.dStability === 'number'
        ? record.dStability
        : null;

  return {
    ...record,
    id: mutationId,
    mutation: record.mutation || record.id,
    wt: record.wt || record.wild_type || parsed?.[1] || null,
    mut: record.mut || record.mutant || parsed?.[3] || null,
    position: typeof record.position === 'number' ? record.position : parsed ? Number(parsed[2]) : null,
    affinity: typeof record.affinity === 'number' ? record.affinity : typeof record.Affinity === 'number' ? record.Affinity : null,
    stability: typeof record.stability === 'number' ? record.stability : typeof record.Stability === 'number' ? record.Stability : null,
    ddg_binding: ddgBinding,
    ddg_stability: ddgStability,
    phenotype: record.phenotype || (typeof ddgBinding === 'number' ? (ddgBinding < 0 ? 'gain' : ddgBinding > 0 ? 'loss' : 'neutral') : 'neutral'),
    region: record.region || 'unassigned',
    method: record.method || 'MOE',
    notes: record.notes || '',
    structureUrl: record.pdb_file ? `${API_BASE_URL}${record.pdb_file}` : null,
    structureAvailable: Boolean(record.structure_available || record.pdb_file),
  };
}

export async function fetchAvailableModels() {
  const payload = await getJson('/api/datasets');
  if (Array.isArray(payload?.datasets)) {
    return payload.datasets.map(mapBackendModel);
  }

  return mapLegacyModels(payload);
}

export async function fetchMutationsForModel(model) {
  if (!model?.species || !model?.om) {
    return [];
  }

  const payload = await getJson(`/api/mutations/${model.species}/${model.om}`);
  return Array.isArray(payload) ? payload.map(mapBackendMutation) : [];
}

export async function fetchMutationIndex(models = []) {
  const publishedModels = getPublishedModels(models);
  const entries = await Promise.all(
    publishedModels.map(async (model) => [model.id, await fetchMutationsForModel(model)])
  );

  return Object.fromEntries(entries);
}

export function getAllModels(models = []) {
  return models;
}

export function getVisibleModels(models = []) {
  return models.filter((model) => model.status !== 'hidden');
}

export function getPublishedModels(models = []) {
  return models.filter((model) => model.status === 'published' || model.status === 'beta');
}

export function getModelById(models = [], modelId) {
  return models.find((model) => model.id === modelId) || null;
}

export function getModelBindingSummary(model) {
  if (!model) return null;

  return {
    testedMutationCount: model.counts?.mutations ?? 0,
    pocketResidueCount: model.counts?.pocketResidues ?? 0,
    structureCount: model.counts?.structures ?? 0,
  };
}

export function getModelMutations(mutationsByModel = {}, modelId) {
  return mutationsByModel[modelId] || [];
}

export function parseMutationId(mutationId = '') {
  const match = mutationId.match(/^([A-Z])(\d+)([A-Z])$/);
  if (!match) return null;
  return {
    wt: match[1],
    position: Number(match[2]),
    mut: match[3],
  };
}

export function getResidueGroups(records = []) {
  const map = new Map();

  records.forEach((record) => {
    const parsed = parseMutationId(record.id);
    if (!parsed) return;

    if (!map.has(parsed.position)) {
      map.set(parsed.position, {
        position: parsed.position,
        wt: parsed.wt,
        records: [],
      });
    }

    map.get(parsed.position).records.push(record);
  });

  return [...map.values()]
    .sort((left, right) => left.position - right.position)
    .map((group) => ({
      ...group,
      records: [...group.records].sort((left, right) => left.id.localeCompare(right.id, undefined, { numeric: true })),
    }));
}

export function getMutationById(records = [], mutationId) {
  return records.find((record) => record.id === mutationId) || null;
}

export function formatSignedNumber(value, digits = 2) {
  if (typeof value !== 'number' || Number.isNaN(value)) return 'N/A';
  return `${value >= 0 ? '+' : ''}${value.toFixed(digits)}`;
}

export function formatNumber(value, digits = 2) {
  if (typeof value !== 'number' || Number.isNaN(value)) return 'N/A';
  return value.toFixed(digits);
}

export function getMutationPhenotypeTone(phenotype) {
  if (phenotype === 'gain') return 'text-emerald-700 bg-emerald-50 border-emerald-200';
  if (phenotype === 'loss') return 'text-rose-700 bg-rose-50 border-rose-200';
  return 'text-slate-700 bg-slate-100 border-slate-200';
}

export function getMutationCrossModelData(models = [], mutationsByModel = {}, mutationId) {
  return getPublishedModels(models)
    .map((model) => {
      const match = getModelMutations(mutationsByModel, model.id).find((record) => record.id === mutationId);
      if (!match) return null;
      return {
        modelId: model.id,
        displayName: model.displayName,
        species: toTitleCase(model.species),
        glycanType: model.glycanType,
        color: model.color,
        mutation: match.id,
        affinity: match.affinity,
        stability: match.stability,
        ddg_binding: match.ddg_binding,
        ddg_stability: match.ddg_stability,
        phenotype: match.phenotype,
        structureAvailable: match.structureAvailable,
      };
    })
    .filter(Boolean);
}

export function groupModelsBySpecies(models = []) {
  return models.reduce((acc, model) => {
    const key = model.species;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(model);
    return acc;
  }, {});
}

export function resolveStructureUrl(model, mutation) {
  if (!model || !mutation) return null;
  return mutation.structureUrl || null;
}
