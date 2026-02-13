// backend/utils/cleaner.js
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

const RAW_DIR = path.join(__dirname, '..', 'data');
const CLEAN_DIR = path.join(__dirname, '..', 'data', 'clean');
if (!fs.existsSync(CLEAN_DIR)) fs.mkdirSync(CLEAN_DIR, { recursive: true });

function normalizeMutation(mut) {
  if (!mut && mut !== 0) return null;
  // If input is like "6:F1C" or "6:F1[C;I;L]" => extract after first colon
  const s = String(mut).trim();
  const afterColon = s.includes(':') ? s.split(':').slice(1).join(':') : s;
  // if there's bracket like F1[C;I], pick the first letter inside bracket or remove brackets
  const bracketMatch = afterColon.match(/^([A-Za-z]\d+)\[([^\]]+)\]/);
  if (bracketMatch) {
    const base = bracketMatch[1];
    const firstAlt = bracketMatch[2].split(';')[0].trim();
    // construct e.g. F1C if base is F1 and firstAlt is C
    return `${base[0]}${base.slice(1)}${firstAlt}`; // base is like F1
  }
  // else strip any non-alphanum except digits (keep format like F1C or F123C)
  const clean = afterColon.replace(/[^A-Za-z0-9]/g, '');
  return clean || null;
}

function toNumberOrNull(v) {
  if (v === '' || v === null || v === undefined) return null;
  const n = Number(String(v).trim());
  return Number.isFinite(n) ? n : null;
}

function cleanOne(filename, outname) {
  const rawPath = path.join(RAW_DIR, filename);
  if (!fs.existsSync(rawPath)) {
    console.error('Missing raw file:', rawPath);
    return;
  }
  const raw = fs.readFileSync(rawPath, 'utf8');

  // try to be lenient: parse with relaxed options
  const records = parse(raw, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
    trim: true,
  });

  const out = records.map((r) => {
    // Convert keys to a stable set. Access common fields but keep all others.
    const mutationRaw = r.mutation || r.Mutation || r.mut || r.mutation_name || '';
    const mutation_normalized = normalizeMutation(mutationRaw);

    // Build object with normalized fields
    const obj = {
      mutation_original: mutationRaw,
      mutation: mutation_normalized,
      // try common numeric fields:
      Affinity: toNumberOrNull(r.Affinity),
      dAffinity: toNumberOrNull(r.dAffinity),
      Stability: toNumberOrNull(r.Stability),
      dStability: toNumberOrNull(r.dStability),
      mutseq: toNumberOrNull(r.mutseq) || toNumberOrNull(r.mseq) || null,
      sseq: toNumberOrNull(r.sseq) || null,
    };

    // copy the rest and convert numeric-looking fields
    Object.keys(r).forEach((k) => {
      if (obj[k] !== undefined) return;
      const val = r[k];
      // skip empty column names
      if (!k || k.trim() === '') return;
      obj[k] = (typeof val === 'string' && val.trim() !== '' && !Number.isNaN(Number(val))) ? toNumberOrNull(val) : (val === '' ? null : val);
    });

    return obj;
  });

  fs.writeFileSync(path.join(CLEAN_DIR, outname), JSON.stringify(out, null, 2));
  console.log('Wrote', outname, 'rows:', out.length);
}

// Example filenames — change to match your files in backend/data/raw
cleanOne('Human_OM3_MOE_data.csv', 'om3_clean.json');
cleanOne('Human_OM6_MOE_data.csv', 'om6_clean.json');
cleanOne('Porcine_OM6_MOE_data.csv', 'porcine_clean.json');
