const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { DATASETS, getDataset, getDatasetById, toApiMetadata } = require('./lib/datasets');
const {
  findMutationRecord,
  getDatasetCounts,
  getDatasetRecords,
  getPocketRecords,
  resolvePdbPath,
} = require('./lib/dataStore');

function createCorsOptions() {
  const configuredOrigins = (process.env.CORS_ORIGINS || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  function isExplicitlyAllowed(origin) {
    return configuredOrigins.includes(origin);
  }

  function isVercelOrigin(origin) {
    try {
      const { hostname, protocol } = new URL(origin);
      return (
        (protocol === 'https:' || protocol === 'http:') &&
        hostname.endsWith('.vercel.app')
      );
    } catch {
      return false;
    }
  }

  return {
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }

      if (isExplicitlyAllowed(origin)) {
        callback(null, true);
        return;
      }

      const isLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);
      const isLanAddress = /^https?:\/\/(?:\d{1,3}\.){3}\d{1,3}(?::\d+)?$/i.test(origin);
      const allowDevOrigins = process.env.NODE_ENV !== 'production' && configuredOrigins.length === 0;
      const allowVercelOrigins = process.env.ALLOW_VERCEL_ORIGINS !== 'false';

      if (allowDevOrigins && (isLocalhost || isLanAddress)) {
        callback(null, true);
        return;
      }

      if (allowVercelOrigins && isVercelOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Origin not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  };
}

function createApp() {
  const app = express();

  app.use(cors(createCorsOptions()));
  app.use(express.json());

  app.use((req, res, next) => {
    if (req.method === 'GET') {
      res.setHeader('Cache-Control', 'public, max-age=300');
    }
    next();
  });

  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      datasets: DATASETS.length,
    });
  });

  app.get('/api/datasets', (req, res) => {
    const datasets = DATASETS.map((dataset) =>
      toApiMetadata(dataset, getDatasetCounts(dataset.species, dataset.om))
    );

    res.json({
      datasets,
      legacy: {
        human_om3: '/api/mutations/human/om3',
        human_om6: '/api/mutations/human/om6',
        porcine_om3: '/api/mutations/porcine/om3',
        porcine_om6: '/api/mutations/porcine/om6',
      },
    });
  });

  app.get('/api/datasets/:datasetId', (req, res) => {
    const dataset = getDatasetById(req.params.datasetId);
    if (!dataset) {
      res.status(404).json({ error: 'Dataset not found' });
      return;
    }

    res.json(toApiMetadata(dataset, getDatasetCounts(dataset.species, dataset.om)));
  });

  app.get('/api/mutations/:species/:om', (req, res) => {
    const dataset = getDataset(req.params.species, req.params.om);
    if (!dataset) {
      res.status(404).json({ error: 'Dataset not found' });
      return;
    }

    res.json(getDatasetRecords(dataset.species, dataset.om));
  });

  app.get('/api/mutation/:species/:om/:mutname', (req, res) => {
    const dataset = getDataset(req.params.species, req.params.om);
    if (!dataset) {
      res.status(404).json({ error: 'Dataset not found' });
      return;
    }

    const match = findMutationRecord(dataset.species, dataset.om, req.params.mutname);
    if (!match) {
      res.status(404).json({ error: 'Mutation not found' });
      return;
    }

    res.json(match);
  });

  app.get('/api/pocket/:species/:om', (req, res) => {
    const dataset = getDataset(req.params.species, req.params.om);
    if (!dataset) {
      res.status(404).json({ error: 'Dataset not found' });
      return;
    }

    if (!dataset.pocketFile) {
      res.status(404).json({ error: 'Pocket dataset not available' });
      return;
    }

    res.json(getPocketRecords(dataset.species, dataset.om));
  });

  app.get(['/pdb/:dir/:filename', '/api/pdb/:dir/:filename'], (req, res) => {
    const pdbPath = resolvePdbPath(req.params.dir, req.params.filename);
    if (!pdbPath) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }

    if (!fs.existsSync(pdbPath)) {
      res.status(404).json({ error: 'PDB file not found' });
      return;
    }

    res.type('chemical/x-pdb');
    res.sendFile(pdbPath);
  });

  app.use('/api', (req, res) => {
    res.status(404).json({ error: 'API route not found' });
  });

  app.use((err, req, res, next) => {
    if (err && err.message === 'Origin not allowed by CORS') {
      res.status(403).json({ error: err.message });
      return;
    }

    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  });

  return app;
}

module.exports = {
  createApp,
};

