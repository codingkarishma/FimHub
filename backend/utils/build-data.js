const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const { normalizeMutationName, parseMutationName } = require('../lib/mutations');

const RAW_DIR = path.join(__dirname, '..', 'data');
const CLEAN_DIR = path.join(RAW_DIR, 'clean');

const CSV_DATASETS = [
  { species: 'human', om: 'om3', input: 'Human_OM3_MOE_data.csv', output: 'human_om3_clean.json' },
  { species: 'human', om: 'om6', input: 'Human_OM6_MOE_data.csv', output: 'human_om6_clean.json' },
  { species: 'porcine', om: 'om3', input: 'Porcine_OM3_MOE_data.csv', output: 'porcine_om3_clean.json' },
  { species: 'porcine', om: 'om6', input: 'Porcine_OM6_MOE_data.csv', output: 'porcine_om6_clean.json' },
];

const POCKET_DATASETS = [
  { species: 'human', om: 'om3', input: 'New_Human_pocket_residues_OM3.unknown', output: 'pocket_human_om3.json' },
  { species: 'human', om: 'om6', input: 'Human_pocket_residues_OM6.unknown', output: 'pocket_human_om6.json' },
];

const RESIDUE_TO_ONE_LETTER = {
  Ala: 'A',
  Arg: 'R',
  Asn: 'N',
  Asp: 'D',
  Cys: 'C',
  Gln: 'Q',
  Glu: 'E',
  Gly: 'G',
  His: 'H',
  Ile: 'I',
  Leu: 'L',
  Lys: 'K',
  Met: 'M',
  Phe: 'F',
  Pro: 'P',
  Ser: 'S',
  Thr: 'T',
  Trp: 'W',
  Tyr: 'Y',
  Val: 'V',
};

function ensureCleanDir() {
  fs.mkdirSync(CLEAN_DIR, { recursive: true });
}

function toNumberOrNull(value) {
  if (value === '' || value === null || value === undefined) {
    return null;
  }

  const parsed = Number(String(value).trim());
  return Number.isFinite(parsed) ? parsed : null;
}

function cleanCsvDataset(dataset) {
  const sourcePath = path.join(RAW_DIR, dataset.input);
  const raw = fs.readFileSync(sourcePath, 'utf8');
  const rows = parse(raw, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
    trim: true,
  });

  const cleaned = rows.map((row) => {
    const mutationOriginal =
      row.mutation ||
      row.Mutation ||
      row.mut ||
      row.mutation_name ||
      row.MUTATION ||
      '';
    const mutation = normalizeMutationName(mutationOriginal);
    const parsedMutation = parseMutationName(mutation);

    const record = {
      species: dataset.species,
      om: dataset.om,
      mutation_original: mutationOriginal,
      mutation,
      mutation_normalized: mutation,
      wild_type: parsedMutation?.wildType || null,
      position: parsedMutation?.position || null,
      mutant: parsedMutation?.mutant || null,
      Affinity: toNumberOrNull(row.Affinity),
      dAffinity: toNumberOrNull(row.dAffinity),
      Stability: toNumberOrNull(row.Stability),
      dStability: toNumberOrNull(row.dStability),
      mutseq: toNumberOrNull(row.mutseq) ?? toNumberOrNull(row.mseq),
      sseq: toNumberOrNull(row.sseq),
      mseq: toNumberOrNull(row.mseq),
    };

    Object.entries(row).forEach(([key, value]) => {
      if (!key || record[key] !== undefined) {
        return;
      }

      record[key] =
        typeof value === 'string' && value.trim() !== '' && !Number.isNaN(Number(value))
          ? toNumberOrNull(value)
          : value === ''
            ? null
            : value;
    });

    return record;
  });

  const targetPath = path.join(CLEAN_DIR, dataset.output);
  fs.writeFileSync(targetPath, JSON.stringify(cleaned, null, 2));
  return { file: dataset.output, rows: cleaned.length };
}

function parsePocketDataset(dataset) {
  const sourcePath = path.join(RAW_DIR, dataset.input);
  const raw = fs.readFileSync(sourcePath, 'utf8');
  const lines = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const entries = lines.slice(1).map((line) => {
    const [chain, residueName, uidRaw, mutationRaw = ''] = line.split(/\t+/);
    const position = Number(String(uidRaw).trim());
    const wildType = RESIDUE_TO_ONE_LETTER[residueName] || null;
    const mutationCodes = mutationRaw.replace(/\s+/g, '').split('').filter(Boolean);

    return {
      species: dataset.species,
      om: dataset.om,
      chain: chain || null,
      residue_name: residueName || null,
      residue_code: wildType,
      position: Number.isFinite(position) ? position : null,
      uid: Number.isFinite(position) ? position : null,
      mutation_codes: mutationCodes,
      mutations: wildType && Number.isFinite(position)
        ? mutationCodes.map((code) => `${wildType}${position}${code}`)
        : [],
      mutation_pattern: mutationRaw.replace(/\s+/g, '') || null,
    };
  });

  const targetPath = path.join(CLEAN_DIR, dataset.output);
  fs.writeFileSync(targetPath, JSON.stringify(entries, null, 2));
  return { file: dataset.output, rows: entries.length };
}

function main() {
  ensureCleanDir();

  const written = [
    ...CSV_DATASETS.map(cleanCsvDataset),
    ...POCKET_DATASETS.map(parsePocketDataset),
  ];

  written.forEach((item) => {
    console.log(`Wrote ${item.file}: ${item.rows} rows`);
  });
}

if (require.main === module) {
  main();
}

module.exports = {
  main,
};
