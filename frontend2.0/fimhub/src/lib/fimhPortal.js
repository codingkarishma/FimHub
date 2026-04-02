const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const datasetCatalog = {
  human_om3: {
    species: 'human',
    glycan: 'om3',
    label: 'Human OM3',
    badge: 'OM3 live',
    description: 'Human single-point mutation panel for OM3 glycan binding.',
    nextStep: 'Extend this single-point series across additional oligomannose panels when ready.',
  },
  human_om6: {
    species: 'human',
    glycan: 'om6',
    label: 'Human OM6',
    badge: 'OM6 live',
    description: 'Human single-point mutation panel for OM6 glycan binding.',
    nextStep: 'Use this as a clean benchmark as more single-point mutation panels are added.',
  },
  porcine_om6: {
    species: 'porcine',
    glycan: 'om6',
    label: 'Porcine OM6',
    badge: 'Cross-species',
    description: 'Porcine comparison panel for OM6 single-point mutations.',
    nextStep: 'Expand only when additional curated single-point glycan panels are ready.',
  },
};

export function getDatasetKey(species, glycan) {
  return `${species}_${glycan}`;
}

export function getDatasetMeta(species, glycan) {
  return (
    datasetCatalog[getDatasetKey(species, glycan)] || {
      species,
      glycan,
      label: `${species} ${glycan}`.trim(),
      badge: 'Dataset',
      description: 'FimH mutation dataset',
      nextStep: 'Add the next glycan panel when it becomes available.',
    }
  );
}

export function getMutationName(record) {
  return record?.mutation || record?.name || 'Unknown';
}

export function parseMutationToken(recordOrName) {
  const token =
    typeof recordOrName === 'string' ? recordOrName : getMutationName(recordOrName);
  const match = token.match(/^([A-Z])(\d+)([A-Z])$/);

  if (!match) {
    return null;
  }

  return {
    wildType: match[1],
    position: Number(match[2]),
    mutant: match[3],
    token,
  };
}

export function getMutationPosition(record) {
  const parsed = parseMutationToken(record);
  return parsed ? parsed.position : null;
}

export function getWildTypeResidue(record) {
  const parsed = parseMutationToken(record);
  return parsed ? parsed.wildType : null;
}

export function getMutantResidue(record) {
  const parsed = parseMutationToken(record);
  return parsed ? parsed.mutant : null;
}

export function isWildTypeReference(record) {
  const parsed = parseMutationToken(record);
  return Boolean(parsed && parsed.wildType === parsed.mutant);
}

export function sortMutationRecords(records = []) {
  return [...records].sort((left, right) => {
    const leftParsed = parseMutationToken(left);
    const rightParsed = parseMutationToken(right);
    const leftIsReference = leftParsed && leftParsed.wildType === leftParsed.mutant ? 0 : 1;
    const rightIsReference = rightParsed && rightParsed.wildType === rightParsed.mutant ? 0 : 1;

    if (leftIsReference !== rightIsReference) {
      return leftIsReference - rightIsReference;
    }

    return getMutationName(left).localeCompare(getMutationName(right), undefined, { numeric: true });
  });
}

export function getResidueGroups(records = []) {
  const residueMap = new Map();

  for (const record of records) {
    const parsed = parseMutationToken(record);
    if (!parsed) {
      continue;
    }

    if (!residueMap.has(parsed.position)) {
      residueMap.set(parsed.position, {
        position: parsed.position,
        wildType: parsed.wildType,
        records: [],
      });
    }

    residueMap.get(parsed.position).records.push(record);
  }

  return [...residueMap.values()]
    .sort((left, right) => left.position - right.position)
    .map((group) => {
      const sortedRecords = sortMutationRecords(group.records);
      const availableMutants = sortedRecords
        .map((record) => getMutantResidue(record))
        .filter(Boolean);
      const structureCount = sortedRecords.filter((record) => !isWildTypeReference(record) && Boolean(resolveStructurePath(record))).length;

      return {
        ...group,
        records: sortedRecords,
        mutationCount: sortedRecords.length,
        availableMutants,
        structureCount,
      };
    });
}

export function getSequenceTrack(groups = []) {
  const track = [];
  let previousPosition = null;

  for (const group of groups) {
    if (previousPosition !== null && group.position - previousPosition > 1) {
      track.push({
        type: 'gap',
        start: previousPosition + 1,
        end: group.position - 1,
      });
    }

    track.push({
      type: 'residue',
      ...group,
    });

    previousPosition = group.position;
  }

  return track;
}

export function getDefaultMutationForResidue(group) {
  if (!group?.records?.length) {
    return null;
  }

  return (
    group.records.find((record) => !isWildTypeReference(record)) ||
    group.records[0]
  );
}

export function isFiniteNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

export function formatNumber(value, digits = 2) {
  if (!isFiniteNumber(value)) {
    return 'N/A';
  }

  return value.toFixed(digits);
}

export function formatSignedNumber(value, digits = 3) {
  if (!isFiniteNumber(value)) {
    return 'N/A';
  }

  return `${value >= 0 ? '+' : ''}${value.toFixed(digits)}`;
}

export function formatCompactNumber(value) {
  if (!isFiniteNumber(value)) {
    return 'N/A';
  }

  const absoluteValue = Math.abs(value);

  if ((absoluteValue > 0 && absoluteValue < 0.01) || absoluteValue >= 1_000_000) {
    return value.toExponential(2);
  }

  return value.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });
}

export function resolveStructurePath(record, species, glycan) {
  if (isWildTypeReference(record)) {
    return null;
  }

  if (record?.pdb_file) {
    return record.pdb_file;
  }

  const mutationName = getMutationName(record);
  const position = getMutationPosition(record);

  if (!mutationName) {
    return null;
  }

  if (species === 'human' && glycan === 'om6' && position !== null) {
    return `/pdb/Human_OM6_PDBs/${position}_${mutationName}.pdb`;
  }

  if (
    species === 'human' &&
    glycan === 'om3' &&
    ['F1C', 'F1I', 'F1L', 'F1F'].includes(mutationName)
  ) {
    return `/pdb/Human_OM3_PDBs/1_${mutationName}.pdb`;
  }

  return null;
}

export function resolveStructureUrl(record, species, glycan) {
  const structurePath = resolveStructurePath(record, species, glycan);
  return structurePath ? `${API_BASE_URL}${structurePath}` : null;
}

export function buildDatasetSummary(records = [], species, glycan) {
  const affinityRecords = records.filter((record) => isFiniteNumber(record?.dAffinity));
  const stabilityRecords = records.filter((record) => isFiniteNumber(record?.dStability));
  const availableStructures = records.filter((record) =>
    Boolean(resolveStructurePath(record, species, glycan))
  );

  const enhancedBinders = affinityRecords.filter((record) => record.dAffinity < 0);
  const weakenedBinders = affinityRecords.filter((record) => record.dAffinity > 0);
  const structureConserving = stabilityRecords.filter(
    (record) => Math.abs(record.dStability) <= 1
  );

  const strongestBinder = [...affinityRecords].sort((left, right) => left.dAffinity - right.dAffinity)[0];
  const weakestBinder = [...affinityRecords].sort((left, right) => right.dAffinity - left.dAffinity)[0];

  return {
    totalMutations: records.length,
    enhancedCount: enhancedBinders.length,
    weakenedCount: weakenedBinders.length,
    stableCount: structureConserving.length,
    structureCount: availableStructures.length,
    strongestBinder,
    weakestBinder,
  };
}

export function getImpactRanking(records = [], limit = 12) {
  return [...records]
    .filter((record) => isFiniteNumber(record?.dAffinity))
    .sort((left, right) => Math.abs(right.dAffinity) - Math.abs(left.dAffinity))
    .slice(0, limit)
    .sort((left, right) => left.dAffinity - right.dAffinity)
    .map((record) => ({
      mutation: getMutationName(record),
      dAffinity: record.dAffinity,
      affinity: record.Affinity,
    }));
}

export function getLandscapePoints(records = []) {
  return records
    .filter((record) => isFiniteNumber(record?.dAffinity) && isFiniteNumber(record?.dStability))
    .map((record) => ({
      mutation: getMutationName(record),
      dAffinity: record.dAffinity,
      dStability: record.dStability,
    }));
}

export function getInducedMutations(records = []) {
  return records.filter((record) => !isWildTypeReference(record));
}
