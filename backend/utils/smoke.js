const { createApp } = require('../app');

async function fetchJson(baseUrl, pathname, expectedStatus = 200) {
  const response = await fetch(`${baseUrl}${pathname}`);
  const body = await response.json();

  if (response.status !== expectedStatus) {
    throw new Error(`${pathname} expected ${expectedStatus} but received ${response.status}: ${JSON.stringify(body)}`);
  }

  return body;
}

async function main() {
  const app = createApp();
  const server = await new Promise((resolve) => {
    const instance = app.listen(0, () => resolve(instance));
  });

  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    const health = await fetchJson(baseUrl, '/api/health');
    if (health.status !== 'ok') {
      throw new Error('Health endpoint did not return ok');
    }

    const datasets = await fetchJson(baseUrl, '/api/datasets');
    if (!Array.isArray(datasets.datasets) || datasets.datasets.length < 4) {
      throw new Error('Dataset registry response is incomplete');
    }

    const datasetsWithoutStructures = datasets.datasets.filter(
      (dataset) => dataset.status === 'published' && !dataset.counts?.structures
    );
    if (datasetsWithoutStructures.length) {
      throw new Error(
        `Published datasets are missing structure files: ${datasetsWithoutStructures
          .map((dataset) => dataset.id)
          .join(', ')}`
      );
    }

    const humanOm3 = await fetchJson(baseUrl, '/api/mutations/human/om3');
    const humanOm6 = await fetchJson(baseUrl, '/api/mutations/human/om6');
    const porcineOm3 = await fetchJson(baseUrl, '/api/mutations/porcine/om3');
    const porcineOm6 = await fetchJson(baseUrl, '/api/mutations/porcine/om6');

    if (!humanOm3.length || !humanOm6.length || !porcineOm3.length || !porcineOm6.length) {
      throw new Error('One or more mutation datasets are empty');
    }

    const mutationDetail = await fetchJson(baseUrl, `/api/mutation/human/om3/${humanOm3[0].mutation}`);
    if (!mutationDetail?.mutation) {
      throw new Error('Mutation detail endpoint returned an invalid payload');
    }

    const structureRecord = [...humanOm3, ...humanOm6, ...porcineOm3, ...porcineOm6].find(
      (record) => record.structure_available && record.pdb_file
    );
    if (!structureRecord) {
      throw new Error('No mutation-linked PDB structure files were found');
    }

    const pdbResponse = await fetch(`${baseUrl}${structureRecord.pdb_file}`);
    if (!pdbResponse.ok) {
      throw new Error(`${structureRecord.pdb_file} expected 200 but received ${pdbResponse.status}`);
    }
    const pdbBody = await pdbResponse.text();
    if (!pdbBody.includes('ATOM')) {
      throw new Error(`${structureRecord.pdb_file} did not look like a PDB file`);
    }

    const humanPocketOm3 = await fetchJson(baseUrl, '/api/pocket/human/om3');
    const humanPocketOm6 = await fetchJson(baseUrl, '/api/pocket/human/om6');
    if (!humanPocketOm3.length || !humanPocketOm6.length) {
      throw new Error('Pocket datasets are missing or empty');
    }

    await fetchJson(baseUrl, '/api/pocket/porcine/om3', 404);
    await fetchJson(baseUrl, '/api/mutation/human/om3/NOTREAL', 404);

    console.log('Backend smoke check passed');
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
