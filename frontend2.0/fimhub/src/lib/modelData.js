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

function mapBackendModel(model) {
  return {
    ...model,
    displayName: model.displayName || model.label,
    glycanType: model.glycanType || model.label,
    species: model.species || 'unknown',
    description: model.description || '',
    counts: model.counts || {},
    color: model.color || '#0E6B6B',
    status: model.status || 'published',
  };
}

function mapBackendMutation(record) {
  return {
    ...record,
    id: record.id || record.mutation_normalized || record.mutation,
    mutation: record.mutation || record.id,
    wt: record.wt || record.wild_type || null,
    mut: record.mut || record.mutant || null,
    position: typeof record.position === 'number' ? record.position : null,
    affinity: typeof record.affinity === 'number' ? record.affinity : null,
    stability: typeof record.stability === 'number' ? record.stability : null,
    ddg_binding: typeof record.ddg_binding === 'number' ? record.ddg_binding : null,
    ddg_stability: typeof record.ddg_stability === 'number' ? record.ddg_stability : null,
    phenotype: record.phenotype || 'neutral',
    region: record.region || 'unassigned',
    method: record.method || 'MOE',
    notes: record.notes || '',
    structureUrl: record.pdb_file ? `${API_BASE_URL}${record.pdb_file}` : null,
    structureAvailable: Boolean(record.structure_available),
  };
}

export async function fetchAvailableModels() {
  const payload = await getJson('/api/datasets');
  return Array.isArray(payload.datasets) ? payload.datasets.map(mapBackendModel) : [];
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
