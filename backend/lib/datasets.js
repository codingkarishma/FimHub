const DATASETS = [
  {
    id: 'human-om3',
    species: 'human',
    om: 'om3',
    label: 'Human OM3',
    displayName: 'Human OM3',
    glycanType: 'Oligomannose-3 (Man3GlcNAc2)',
    shortCode: 'hOM3',
    description: 'Human FimH model scored against the OM3 oligomannose glycan context.',
    pdbRef: '1KIU',
    status: 'published',
    color: '#0E6B6B',
    icon: 'om3',
    jsonFile: 'human_om3_clean.json',
    pocketFile: 'pocket_human_om3.json',
    pdbDir: 'Human_OM3_PDBs',
    structureArchive: null,
  },
  {
    id: 'human-om6',
    species: 'human',
    om: 'om6',
    label: 'Human OM6',
    displayName: 'Human OM6',
    glycanType: 'Oligomannose-6 (Man6GlcNAc2)',
    shortCode: 'hOM6',
    description: 'Human FimH model scored against the longer OM6 oligomannose glycan context.',
    pdbRef: '1KIU',
    status: 'published',
    color: '#2563EB',
    icon: 'om6',
    jsonFile: 'human_om6_clean.json',
    pocketFile: 'pocket_human_om6.json',
    pdbDir: 'Human_OM6_PDBs',
    structureArchive: null,
  },
  {
    id: 'porcine-om3',
    species: 'porcine',
    om: 'om3',
    label: 'Porcine OM3',
    displayName: 'Porcine OM3',
    glycanType: 'Oligomannose-3 (Man3GlcNAc2)',
    shortCode: 'pOM3',
    description: 'Porcine FimH comparison model for the OM3 glycan context.',
    pdbRef: '1KIU',
    status: 'published',
    color: '#B45309',
    icon: 'om3',
    jsonFile: 'porcine_om3_clean.json',
    pocketFile: null,
    pdbDir: 'Porcine_OM3_structures',
    structureArchive: 'Porcine_OM3_structures.zip',
  },
  {
    id: 'porcine-om6',
    species: 'porcine',
    om: 'om6',
    label: 'Porcine OM6',
    displayName: 'Porcine OM6',
    glycanType: 'Oligomannose-6 (Man6GlcNAc2)',
    shortCode: 'pOM6',
    description: 'Porcine FimH comparison model for the OM6 glycan context.',
    pdbRef: '1KIU',
    status: 'published',
    color: '#7C3AED',
    icon: 'om6',
    jsonFile: 'porcine_om6_clean.json',
    pocketFile: null,
    pdbDir: 'Porcine_OM6_structures',
    structureArchive: 'Porcine_OM6_structures.zip',
  },
];

function getDataset(species, om) {
  return DATASETS.find((dataset) => dataset.species === species && dataset.om === om) || null;
}

function getDatasetById(id) {
  return DATASETS.find((dataset) => dataset.id === id) || null;
}

function toApiMetadata(dataset, counts = {}) {
  return {
    id: dataset.id,
    label: dataset.label,
    displayName: dataset.displayName,
    species: dataset.species,
    om: dataset.om,
    glycanType: dataset.glycanType,
    shortCode: dataset.shortCode,
    description: dataset.description,
    pdbRef: dataset.pdbRef,
    status: dataset.status,
    color: dataset.color,
    icon: dataset.icon,
    routes: {
      mutations: `/api/mutations/${dataset.species}/${dataset.om}`,
      mutationDetail: `/api/mutation/${dataset.species}/${dataset.om}/:mutname`,
      pocket: dataset.pocketFile ? `/api/pocket/${dataset.species}/${dataset.om}` : null,
    },
    structures: {
      pdbDir: dataset.pdbDir,
      archive: dataset.structureArchive,
    },
    counts,
  };
}

module.exports = {
  DATASETS,
  getDataset,
  getDatasetById,
  toApiMetadata,
};
