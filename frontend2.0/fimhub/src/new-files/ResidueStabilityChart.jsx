import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import PanelHeader from './PanelHeader';
import { panel, colors } from '../lib/explorerStyles';

export default function ResidueStabilityChart({
  residueGroups,
  selectedPosition,
  onSelectResidue,
  deltaColor,
}) {
  // Calculate average dStability for each residue
  const data = residueGroups.map((group) => {
    const stabilities = group.records
      .map((r) => r.dStability)
      .filter((v) => v != null);
    const avgStability =
      stabilities.length > 0
        ? stabilities.reduce((a, b) => a + b, 0) / stabilities.length
        : 0;
    return {
      position: group.position,
      residue: `${group.wt}${group.position}`,
      dStability: avgStability,
      count: group.records.length,
    };
  });

  return (
    <section style={panel}>
      <PanelHeader
        eyebrow="Residue Analysis"
        title="ΔStability by Position"
        right={null}
      />
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          data={data}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            type="number"
            dataKey="position"
            name="Residue Position"
            stroke={colors.muted}
            style={{ fontSize: '12px' }}
          />
          <YAxis
            type="number"
            dataKey="dStability"
            name="ΔStability"
            stroke={colors.muted}
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{
              background: 'rgba(255, 255, 255, 0.98)',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '12px',
              fontSize: '13px',
            }}
            formatter={(value) => [
              value ? value.toFixed(2) : 'N/A',
              'ΔStability',
            ]}
            labelFormatter={(label) => `Position ${label}`}
          />
          <Scatter
            name="ΔStability"
            data={data}
            fill={deltaColor}
            onClick={(state) => {
              if (state && state.position != null) {
                onSelectResidue(state.position);
              }
            }}
            style={{ cursor: 'pointer' }}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.position === selectedPosition ? '#0d9488' : deltaColor
                }
                opacity={entry.position === selectedPosition ? 1 : 0.7}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
      <p style={{ fontSize: '12px', color: colors.muted, marginTop: '12px' }}>
        Click a point to view mutation details
      </p>
    </section>
  );
}
