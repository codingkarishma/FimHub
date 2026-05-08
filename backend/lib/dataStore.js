const fs = require('fs');
const path = require('path');
const { getDataset } = require('./datasets');
const { normalizeMutationName, parseMutationName } = require('./mutations');

const DATA_DIR = path.join(__dirname, '..', 'data');
const CLEAN_DIR = path.join(DATA_DIR, 'clean');
const FILE_TTL_MS = 10 * 60 * 1000;

const fileCache = new Map();
const pdbDirCache = new Map();
const pocketPositionCache = new Map();

function readJsonCached(fileName) {
  const now = Date.now();
  const existing = fileCache.get(fileName);
  if (existing && now - existing.loadedAt < FILE_TTL_MS) {
    return existing.value;
  }

  const fullPath = path.join(CLEAN_DIR, fileName);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const value = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  fileCache.set(fileName, { value, loadedAt: now });
  return value;
}

function getPdbFiles(dirName) {
  if (!dirName) {
    return [];
  }

  if (pdbDirCache.has(dirName)) {
    return pdbDirCache.get(dirName);
  }

  const dirPath = path.join(DATA_DIR, dirName);
  if (!fs.existsSync(dirPath)) {
    pdbDirCache.set(dirName, []);
    return [];
  }

  const files = fs
    .readdirSync(dirPath)
    .filter((fileName) => fileName.toLowerCase().endsWith('.pdb'))
    .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }));

  pdbDirCache.set(dirName, files);
  return files;
}

function resolvePdbInfo(dataset, record) {
  if (!dataset?.pdbDir || !record?.mutation) {
    return {
      structure_available: false,
      pdb_file: null,
      pdb_filename: null,
    };
  }

  const files = getPdbFiles(dataset.pdbDir);
  if (!files.length) {
    return {
      structure_available: false,
      pdb_file: null,
      pdb_filename: null,
    };
  }

  const normalizedMutation = normalizeMutationName(record.mutation);
  const parsed = parseMutationName(normalizedMutation);
  const candidates = [];

  if (parsed) {
    candidates.push(`${parsed.position}_${normalizedMutation}.pdb`);
  }
  candidates.push(`${normalizedMutation}.pdb`);

  let match = files.find((fileName) => candidates.includes(fileName));

  if (!match && normalizedMutation) {
    match = files.find((fileName) => fileName.toUpperCase().includes(normalizedMutation));
  }

  if (!match) {
    return {
      structure_available: false,
      pdb_file: null,
      pdb_filename: null,
    };
  }

  return {
    structure_available: true,
    pdb_file: `/pdb/${dataset.pdbDir}/${match}`,
    pdb_filename: match,
  };
}

function getPocketPositionSet(dataset) {
  if (!dataset?.pocketFile) {
    return new Set();
  }

  if (pocketPositionCache.has(dataset.id)) {
    return pocketPositionCache.get(dataset.id);
  }

  const pocketData = readJsonCached(dataset.pocketFile);
  const positions = new Set(
    Array.isArray(pocketData)
      ? pocketData.map((entry) => entry.position).filter((value) => Number.isFinite(value))
      : []
  );

  pocketPositionCache.set(dataset.id, positions);
  return positions;
}

function getPhenotype(ddgBinding) {
  if (typeof ddgBinding !== 'number' || Number.isNaN(ddgBinding)) {
    return 'neutral';
  }
  if (ddgBinding <= -0.5) {
    return 'gain';
  }
  if (ddgBinding >= 0.5) {
    return 'loss';
  }
  return 'neutral';
}

function normalizeRecord(dataset, record) {
  const mutationId = normalizeMutationName(record.mutation || record.mutation_normalized);
  const parsed = parseMutationName(mutationId);
  const pocketPositions = getPocketPositionSet(dataset);
  const position = parsed?.position ?? record.position ?? null;
  const region = Number.isFinite(position) && pocketPositions.has(position) ? 'binding-pocket' : 'unassigned';

  return {
    ...record,
    id: mutationId,
    mutation: mutationId,
    mutation_normalized: mutationId,
    wt: parsed?.wildType ?? record.wild_type ?? null,
    mut: parsed?.mutant ?? record.mutant ?? null,
    position,
    affinity: typeof record.Affinity === 'number' ? record.Affinity : null,
    stability: typeof record.Stability === 'number' ? record.Stability : null,
    ddg_binding: typeof record.dAffinity === 'number' ? record.dAffinity : null,
    ddg_stability: typeof record.dStability === 'number' ? record.dStability : null,
    phenotype: getPhenotype(record.dAffinity),
    region,
    method: 'MOE',
    notes: `Imported from ${dataset.id} source dataset`,
  };
}

function getDatasetRecords(species, om) {
  const dataset = getDataset(species, om);
  if (!dataset) {
    return null;
  }

  const raw = readJsonCached(dataset.jsonFile);
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw.map((record) => {
    const normalized = normalizeRecord(dataset, record);
    return {
      ...normalized,
      ...resolvePdbInfo(dataset, normalized),
    };
  });
}

function getPocketRecords(species, om) {
  const dataset = getDataset(species, om);
  if (!dataset || !dataset.pocketFile) {
    return null;
  }

  const raw = readJsonCached(dataset.pocketFile);
  return Array.isArray(raw) ? raw : [];
}

function findMutationRecord(species, om, mutationName) {
  const records = getDatasetRecords(species, om);
  if (!Array.isArray(records)) {
    return null;
  }

  const normalized = normalizeMutationName(mutationName);
  return (
    records.find((record) => {
      return (
        normalizeMutationName(record.mutation) === normalized ||
        normalizeMutationName(record.mutation_normalized) === normalized
      );
    }) || null
  );
}

function getDatasetCounts(species, om) {
  const records = getDatasetRecords(species, om);
  const pocket = getPocketRecords(species, om);

  return {
    mutations: Array.isArray(records) ? records.length : 0,
    pocketResidues: Array.isArray(pocket) ? pocket.length : 0,
    structures: Array.isArray(records)
      ? records.filter((record) => record.structure_available).length
      : 0,
  };
}

function resolvePdbPath(dir, filename) {
  const baseDir = path.join(DATA_DIR, dir);
  const candidate = path.join(baseDir, filename);
  const normalizedBase = path.resolve(baseDir);
  const normalizedCandidate = path.resolve(candidate);

  if (!normalizedCandidate.startsWith(normalizedBase + path.sep) && normalizedCandidate !== normalizedBase) {
    return null;
  }

  return normalizedCandidate;
}

module.exports = {
  getDatasetCounts,
  getDatasetRecords,
  getPocketRecords,
  findMutationRecord,
  resolvePdbPath,
};
