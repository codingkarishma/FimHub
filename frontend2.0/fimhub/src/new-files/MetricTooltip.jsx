import { formatNumber, formatSignedNumber } from '../lib/modelData';

/**
 * Recharts tooltip content, driven by a `fields` config instead of being
 * duplicated per-chart. Each field: { key, deltaKey, label, deltaLabel, deltaColor }
 */
export default function MetricTooltip({
  active,
  payload,
  label,
  valueLabel,
  deltaLabel,
  valueKey,
  deltaKey,
  deltaColor,
}) {
  if (!active || !payload?.length) return null;
  const data = payload[0]?.payload;

  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.98)',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '12px 16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        fontSize: '13px',
        lineHeight: 1.5,
        color: '#1e293b',
        minWidth: '160px',
      }}
    >
      <div
        style={{
          fontWeight: 600,
          fontSize: '14px',
          marginBottom: '8px',
          color: '#0f172a',
        }}
      >
        {label}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '4px',
        }}
      >
        <span style={{ color: '#64748b' }}>{valueLabel}:</span>
        <span style={{ fontWeight: 500, color: '#475569' }}>
          {formatNumber(data?.[valueKey])}
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <span style={{ color: '#64748b' }}>{deltaLabel}:</span>
        <span style={{ fontWeight: 500, color: deltaColor }}>
          {formatSignedNumber(data?.[deltaKey])}
        </span>
      </div>
    </div>
  );
}
