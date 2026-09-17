import { useMemo } from 'react';
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js/dist/plotly';

const Plot = createPlotlyComponent(Plotly);

// Human-readable amino acid names (for hover tooltip)
const AA_NAME = {
  A: 'Alanine',   R: 'Arginine',  N: 'Asparagine', D: 'Aspartate',
  C: 'Cysteine',  Q: 'Glutamine', E: 'Glutamate',  G: 'Glycine',
  H: 'Histidine', I: 'Isoleucine', L: 'Leucine',  K: 'Lysine',
  M: 'Methionine', F: 'Phenylalanine', P: 'Proline', S: 'Serine',
  T: 'Threonine', W: 'Tryptophan', Y: 'Tyrosine', V: 'Valine',
};

const TEAL = '#0b686f';
const AMBER = '#c98a3f';

/**
 * Given an array of mutation records from the same residue
 * (e.g. F1C, F1I, F1H), returns an array of plot-ready rows:
 *   { mutantLetter: "C", mutationId: "F1C", dAffinity, dStability }
 */
function buildRows(records) {
  return records
    .map((r) => {
      // Extract the mutant letter from the mutation id.
      // Assumes IDs look like "F1C", "N135S", "D54G" — last char is the mutant.
      const id = r.id || r.mutationId || '';
      const mutantLetter = id.slice(-1).toUpperCase();

      // Try many possible key names for the two metrics.
      const dAffinity =
        r.dAffinity ?? r.ddAffinity ?? r.deltaAffinity ?? r.dG ?? null;
      const dStability =
        r.dStability ?? r.ddG ?? r.deltaStability ?? r.ddStability ?? null;

      return {
        mutationId: id,
        mutantLetter,
        dAffinity: Number.isFinite(dAffinity) ? dAffinity : null,
        dStability: Number.isFinite(dStability) ? dStability : null,
      };
    })
    // Sort by mutant letter so bars are in a nice A→Y order
    .sort((a, b) => a.mutantLetter.localeCompare(b.mutantLetter));
}

function BarPanel({
  rows,
  valueKey,
  yAxisTitle,
  accentColor,
  emptyLabel,
}) {
  const points = rows.filter((r) => r[valueKey] != null);

  if (points.length === 0) {
    return (
      <div className="scatter-panel scatter-panel--empty">
        <p className="scatter-empty-text">{emptyLabel}</p>
      </div>
    );
  }

  return (
    <div className="scatter-panel">
      <Plot
        data={[
          {
            x: points.map((r) => r.mutantLetter),
            y: points.map((r) => r[valueKey]),
            text: points.map((r) => r.mutationId),
            customdata: points.map((r) => [
              AA_NAME[r.mutantLetter] || r.mutantLetter,
            ]),
            type: 'bar',
            marker: {
              color: accentColor,
              opacity: 0.85,
              line: { width: 1, color: accentColor },
            },
            hovertemplate:
              '<b>%{text}</b> · %{customdata[0]}<br>' +
              '<b>%{y:.2f}</b> kcal/mol<extra></extra>',
          },
        ]}
        layout={{
          margin: { t: 16, r: 20, b: 55, l: 70 },
          bargap: 0.25,
          xaxis: {
            title: {
              text: 'Mutated residue',
              font: { size: 12, color: '#475569' },
              standoff: 12,
            },
            type: 'category',
            categoryorder: 'array',
            categoryarray: points.map((r) => r.mutantLetter),
            tickfont: { size: 14, family: 'JetBrains Mono, monospace', color: '#0f172a' },
            showgrid: false,
            zeroline: false,
            showline: true,
            linecolor: '#e6e2da',
          },
          yaxis: {
            title: {
              text: yAxisTitle,
              font: { size: 12, color: '#475569' },
              standoff: 10,
            },
            zeroline: true,
            zerolinecolor: '#cbd5d9',
            zerolinewidth: 1.5,
            gridcolor: '#f1eee7',
            tickfont: { size: 11, color: '#64748b' },
            showline: true,
            linecolor: '#e6e2da',
          },
          plot_bgcolor: '#ffffff',
          paper_bgcolor: '#ffffff',
          font: { family: 'Inter, sans-serif', color: '#0f172a' },
          hoverlabel: {
            bgcolor: '#ffffff',
            bordercolor: '#e6e2da',
            font: { family: 'Inter, sans-serif', size: 12, color: '#0f172a' },
          },
          showlegend: false,
        }}
        config={{
          responsive: true,
          displaylogo: false,
          modeBarButtonsToRemove: [
            'lasso2d', 'select2d', 'autoScale2d', 'toggleSpikelines',
          ],
        }}
        style={{ width: '100%', height: '360px' }}
        useResizeHandler
      />
    </div>
  );
}

export default function MutationScatterPair({ records = [], residueLabel = '' }) {
  const rows = useMemo(() => buildRows(records), [records]);
  const hasAffinity = rows.some((r) => r.dAffinity != null);
  const hasStability = rows.some((r) => r.dStability != null);

  return (
    <div className="scatter-pair">
      <div className="scatter-pair-header">
        <h3 className="scatter-pair-title">
          Effect of mutations at {residueLabel || 'this residue'}
        </h3>
      </div>

      <div className="scatter-pair-grid">
        <BarPanel
          rows={rows}
          valueKey="dAffinity"
          yAxisTitle="dAffinity (kcal/mol)"
          accentColor={TEAL}
          emptyLabel={
            hasAffinity
              ? 'No ΔAffinity values for this residue.'
              : 'ΔAffinity data not available for these mutations.'
          }
        />
        <BarPanel
          rows={rows}
          valueKey="dStability"
          yAxisTitle="dStability (kcal/mol)"
          accentColor={AMBER}
          emptyLabel={
            hasStability
              ? 'No ΔStability values for this residue.'
              : 'ΔStability data not available for these mutations.'
          }
        />
      </div>
    </div>
  );
}