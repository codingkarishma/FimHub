import { getPublishedModels, getVisibleModels } from './modelData';

export function getDefaultModelId(models = []) {
  return (
    getPublishedModels(models)[0]?.id || getVisibleModels(models)[0]?.id || null
  );
}

export function getPreferredMutation(records = []) {
  return (
    records.find((record) => record.structureAvailable) || records[0] || null
  );
}

export function formatSpeciesLabel(value = '') {
  if (!value) return 'N/A';
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function buildComparisonData(records = []) {
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
