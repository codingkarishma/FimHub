const MUTATION_PATTERN = /^([A-Z])(\d+)([A-Z])$/i;

function normalizeMutationName(value) {
  if (value === null || value === undefined) {
    return null;
  }

  const raw = String(value).trim();
  if (!raw) {
    return null;
  }

  const afterColon = raw.includes(':') ? raw.split(':').slice(1).join(':') : raw;
  const bracketMatch = afterColon.match(/^([A-Za-z]\d+)\[([^\]]+)\]$/);

  if (bracketMatch) {
    const base = bracketMatch[1];
    const firstAlt = bracketMatch[2].split(';')[0].trim();
    return `${base}${firstAlt}`.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  }

  const cleaned = afterColon.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  return cleaned || null;
}

function parseMutationName(value) {
  const normalized = normalizeMutationName(value);
  if (!normalized) {
    return null;
  }

  const match = normalized.match(MUTATION_PATTERN);
  if (!match) {
    return null;
  }

  return {
    wildType: match[1].toUpperCase(),
    position: Number(match[2]),
    mutant: match[3].toUpperCase(),
    normalized,
  };
}

module.exports = {
  normalizeMutationName,
  parseMutationName,
};
