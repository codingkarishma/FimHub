import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import PanelHeader from './PanelHeader';
import MetricTooltip from './MetricTooltip';
import {
  panel,
  colors,
  legendRow,
  legendLabel,
  legendDot,
} from '../lib/explorerStyles';

/**
 * One "value + delta" bar chart panel. Used for both Affinity and Stability
 * by passing different keys/labels/colors — this single component replaced
 * two ~150-line copy-pasted sections in the old page.
 */
export default function ProfileChart({
  eyebrowText,
  title,
  data,
  valueKey,
  deltaKey,
  valueLabel,
  deltaLabel,
  deltaColor,
}) {
  return (
    <section style={panel}>
      <PanelHeader eyebrow={eyebrowText} title={title} />

      <div style={legendRow}>
        <span style={legendLabel}>
          <span style={legendDot(colors.affinity)} />
          {valueLabel}
        </span>
        <span style={legendLabel}>
          <span style={legendDot(deltaColor)} />
          {deltaLabel}
        </span>
      </div>

      <div style={{ height: '340px', width: '100%' }}>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 12, right: 8, bottom: 24, left: 44 }}
              barGap={2}
            >
              <CartesianGrid
                stroke="rgba(148, 163, 184, 0.12)"
                vertical={false}
              />
              <XAxis
                dataKey="id"
                tickLine={false}
                axisLine={{ stroke: 'rgba(148, 163, 184, 0.3)' }}
                interval={0}
                tick={{ fill: colors.body, fontSize: 11 }}
                label={{
                  value: 'Substitution',
                  position: 'bottom',
                  offset: 8,
                  fill: colors.muted,
                  fontSize: 11,
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={{ stroke: 'rgba(148, 163, 184, 0.3)' }}
                tick={{ fill: colors.body, fontSize: 11 }}
                label={{
                  value: 'kcal/mol',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fill: colors.muted, fontSize: 11 },
                }}
              />
              <Tooltip
                content={
                  <MetricTooltip
                    valueLabel={valueLabel}
                    deltaLabel={deltaLabel}
                    valueKey={valueKey}
                    deltaKey={deltaKey}
                    deltaColor={deltaColor}
                  />
                }
                cursor={{ fill: 'rgba(241, 245, 249, 0.6)' }}
              />
              <Bar
                dataKey={valueKey}
                name={valueLabel}
                fill={colors.affinity}
                radius={[3, 3, 0, 0]}
                maxBarSize={22}
              />
              <Bar
                dataKey={deltaKey}
                name={deltaLabel}
                fill={deltaColor}
                radius={[3, 3, 0, 0]}
                maxBarSize={22}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p
            style={{
              textAlign: 'center',
              color: colors.faint,
              paddingTop: '120px',
              fontSize: '14px',
            }}
          >
            No data available.
          </p>
        )}
      </div>
    </section>
  );
}
