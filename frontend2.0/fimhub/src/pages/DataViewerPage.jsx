import { useEffect, useRef, useState } from 'react';
import Reveal from '../components/site/Reveal';
import Button from '../components/ui/Button';
import {
  fetchAvailableModels,
  fetchMutationsForModel,
  formatNumber,
  formatSignedNumber,
  getPublishedModels,
  getVisibleModels,
} from '../lib/modelData';

export default function DataViewerPage() {
  const tableSectionRef = useRef(null);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [selectedGlycan, setSelectedGlycan] = useState('');
  const [tableData, setTableData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadModels() {
      try {
        const data = await fetchAvailableModels();
        const published = getPublishedModels(getVisibleModels(data));

        if (cancelled) {
          return;
        }

        console.log('[DataViewer] Loaded models:', published);
        setModels(published);
        setError('');
      } catch (err) {
        if (cancelled) {
          return;
        }

        console.error('[DataViewer] Failed to load models:', err);
        setError('Failed to load available models');
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadModels();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!showTable || !tableData.length || !tableSectionRef.current) {
      return;
    }

    tableSectionRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [showTable, tableData]);

  const species = Array.from(new Set(models.map((model) => model.species)))
    .filter(Boolean)
    .sort();

  const glycans = Array.from(
    new Set(
      models
        .filter((model) => !selectedSpecies || model.species === selectedSpecies)
        .map((model) => model.om)
        .filter(Boolean),
    ),
  ).sort();

  const handleLoadData = async () => {
    if (!selectedSpecies || !selectedGlycan) {
      setError('Please select both species and glycan context');
      return;
    }

    setTableLoading(true);
    setError('');

    try {
      const selectedModel =
        models.find(
          (model) =>
            model.species === selectedSpecies && model.om === selectedGlycan,
        ) || null;

      if (!selectedModel) {
        throw new Error('No published dataset matches that selection');
      }

      const data = await fetchMutationsForModel(selectedModel);
      console.log('[DataViewer] Received data:', data);
      setTableData(data);
      setShowTable(true);
    } catch (err) {
      console.error('[DataViewer] Data fetch error:', err);
      setError(`Could not load data: ${err.message}`);
      setTableData([]);
      setShowTable(false);
    } finally {
      setTableLoading(false);
    }
  };

  const columns = [
    { key: 'mutation_normalized', label: 'Mutation' },
    { key: 'position', label: 'Position' },
    { key: 'wt', label: 'WT' },
    { key: 'mut', label: 'Mut' },
    { key: 'affinity', label: 'Affinity' },
    { key: 'ddg_binding', label: 'DeltaDeltaG Binding' },
    { key: 'stability', label: 'Stability' },
    { key: 'ddg_stability', label: 'DeltaDeltaG Stability' },
  ];

  const getCellValue = (row, key) => {
    const value = row[key];

    if (typeof value === 'number') {
      if (key === 'affinity' || key === 'stability') {
        return formatNumber(value);
      }

      if (key === 'ddg_binding' || key === 'ddg_stability') {
        return formatSignedNumber(value);
      }

      return value;
    }

    return value || '-';
  };

  return (
    <div>
      <section className="py-12 md:py-14">
        <div className="container-max">
          <Reveal>
            <div className="space-y-6 rounded-lg border border-[color:var(--fh-border)] bg-[color:var(--fh-surface)] p-6">
              {!models.length && loading ? (
                <p className="text-sm text-[color:var(--fh-text-secondary)]">
                  Loading models...
                </p>
              ) : (
                <>
                  <div>
                    <p className="mb-3 text-sm font-semibold text-[color:var(--fh-text)]">
                      Select dataset parameters:
                    </p>
                    <div className="grid gap-4 md:grid-cols-[1fr,1fr,auto]">
                      <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--fh-text-secondary)]">
                          Host species
                        </label>
                        <select
                          value={selectedSpecies}
                          onChange={(event) => {
                            setSelectedSpecies(event.target.value);
                            setSelectedGlycan('');
                            setShowTable(false);
                          }}
                          className="w-full rounded border border-[color:var(--fh-border)] bg-[color:var(--fh-surface)] px-3 py-2.5 text-sm text-[color:var(--fh-text)] outline-none focus:border-[color:var(--fh-accent)]"
                        >
                          <option value="">Choose species...</option>
                          {species.map((item) => (
                            <option key={item} value={item}>
                              {item.charAt(0).toUpperCase() + item.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--fh-text-secondary)]">
                          Glycan context
                        </label>
                        <select
                          value={selectedGlycan}
                          onChange={(event) => {
                            setSelectedGlycan(event.target.value);
                            setShowTable(false);
                          }}
                          disabled={!selectedSpecies}
                          className="w-full rounded border border-[color:var(--fh-border)] bg-[color:var(--fh-surface)] px-3 py-2.5 text-sm text-[color:var(--fh-text)] outline-none focus:border-[color:var(--fh-accent)] disabled:opacity-50"
                        >
                          <option value="">Choose glycan...</option>
                          {glycans.map((item) => (
                            <option key={item} value={item}>
                              {item.toUpperCase()}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-end">
                        <Button
                          onClick={handleLoadData}
                          disabled={
                            !selectedSpecies || !selectedGlycan || tableLoading
                          }
                        >
                          {tableLoading ? 'Loading...' : 'Load Data'}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {error && <p className="text-sm text-rose-700">{error}</p>}

                  {!showTable && (
                    <div className="rounded-lg bg-[color:var(--fh-mid)] p-4">
                      <p className="text-sm text-[color:var(--fh-text-secondary)]">
                        Select a host species and glycan context above, then
                        click "Load Data" to view the mutation table.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {showTable && (
        <section
          ref={tableSectionRef}
          className="py-12 pb-20 md:py-14"
        >
          <div className="container-max">
            <div className="surface-panel space-y-4 px-5 py-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[color:var(--fh-text)]">
                  {selectedSpecies.charAt(0).toUpperCase() +
                    selectedSpecies.slice(1)}{' '}
                  | {selectedGlycan.toUpperCase()}
                </h2>
                <span className="text-sm text-[color:var(--fh-text-secondary)]">
                  {tableData.length} mutations
                </span>
              </div>

              <div className="overflow-x-auto rounded-lg border border-[color:var(--fh-border)] bg-[color:var(--fh-surface)]">
                <table className="w-full text-sm">
                  <thead className="border-b border-[color:var(--fh-border)] bg-[color:var(--fh-mid)]">
                    <tr>
                      {columns.map((column) => (
                        <th
                          key={column.key}
                          className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em] text-[color:var(--fh-text)]"
                        >
                          {column.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[color:var(--fh-border)]">
                    {tableData.length > 0 ? (
                      tableData.map((row, index) => (
                        <tr
                          key={index}
                          className="bg-[color:var(--fh-surface)] transition-colors hover:bg-[color:var(--fh-mid)]"
                        >
                          {columns.map((column) => (
                            <td
                              key={`${index}-${column.key}`}
                              className="px-4 py-3 font-mono text-xs text-[color:var(--fh-text)]"
                            >
                              {getCellValue(row, column.key)}
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr className="bg-[color:var(--fh-surface)]">
                        <td
                          colSpan={columns.length}
                          className="px-4 py-8 text-center text-[color:var(--fh-text-secondary)]"
                        >
                          No data available for this selection
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="text-xs text-[color:var(--fh-text-secondary)]">
                Values are MOE-derived predictions. Negative DeltaDeltaG values
                indicate stronger predicted binding or stability relative to
                wild-type.
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
