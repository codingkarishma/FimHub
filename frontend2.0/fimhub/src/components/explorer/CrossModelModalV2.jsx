import Button from '../ui/Button';
import { formatNumber, formatSignedNumber } from '../../lib/modelData';

export default function CrossModelModalV2({
  open,
  onClose,
  mutationId,
  entries = [],
}) {
  if (!open) return null;

  const getOmType = (entry) => {
    const match = entry.modelId?.match(/om\d+/i);
    if (match) return match[0].toUpperCase();
    return entry.glycanType || entry.modelId?.split('-').pop()?.toUpperCase() || '—';
  };

  const speciesColor = (s) => {
    const map = { human: '#0d9488', mouse: '#6366f1', porcine: '#d97706' };
    return map[s?.toLowerCase()] || '#94a3b8';
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-md">
      <div
        className="max-h-[85vh] w-full max-w-3xl overflow-hidden bg-white"
        style={{ borderRadius: '16px', boxShadow: '0 25px 80px -20px rgba(0,0,0,0.25)' }}
      >
        {/* Header */}
        <div
          style={{
            padding: '28px 32px 24px',
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#94a3b8',
                marginBottom: '6px',
              }}
            >
              Cross-model Comparison
            </p>
            <h3
              style={{
                fontSize: '30px',
                fontWeight: 700,
                color: '#0f172a',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                letterSpacing: '-0.02em',
              }}
            >
              {mutationId}
            </h3>
            <p style={{ marginTop: '4px', fontSize: '13px', color: '#64748b' }}>
              {entries.length} model{entries.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>

        {/* Table */}
        <div style={{ overflow: 'auto', maxHeight: 'calc(85vh - 130px)' }}>
          {entries.length === 0 ? (
            <div
              style={{
                padding: '64px 32px',
                textAlign: 'center',
                color: '#94a3b8',
                fontSize: '15px',
              }}
            >
              No cross-model data available.
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  {['Model', 'Type', 'Affinity', 'dAffinity', 'Stability', 'dStability'].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: '14px 20px',
                        textAlign: ['Affinity', 'dAffinity', 'Stability', 'dStability'].includes(h) ? 'right' : 'left',
                        fontSize: '11px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: '#94a3b8',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr
                    key={entry.modelId}
                    style={{
                      borderBottom: '1px solid #f8fafc',
                      transition: 'background 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    {/* Model + Species */}
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div>
                          <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '14px' }}>
                            {entry.displayName}
                          </div>
                          <div
                            style={{
                              fontSize: '12px',
                              color: '#94a3b8',
                              marginTop: '2px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '5px',
                            }}
                          >
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* OM Type */}
                    <td style={{ padding: '16px 20px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          padding: '3px 10px',
                          borderRadius: '6px',
                          background: '#f1f5f9',
                          color: '#475569',
                          fontSize: '12px',
                          fontWeight: 600,
                          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                        }}
                      >
                        {getOmType(entry)}
                      </span>
                    </td>

                    {/* Affinity */}
                    <td
                      style={{
                        padding: '16px 20px',
                        textAlign: 'right',
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                        fontSize: '14px',
                        color: '#0f172a',
                        fontWeight: 500,
                      }}
                    >
                      {formatNumber(entry.affinity) ?? '—'}
                    </td>

                    {/* ΔAffinity */}
                    <td
                      style={{
                        padding: '16px 20px',
                        textAlign: 'right',
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                      }}
                    >
                      {entry.ddg_binding != null ? (
                        <span
                          style={{
                            fontWeight: 700,
                            fontSize: '14px',
                            color: entry.ddg_binding <= 0 ? '#059669' : '#dc2626',
                          }}
                        >
                          {formatSignedNumber(entry.ddg_binding)}
                        </span>
                      ) : (
                        <span style={{ color: '#cbd5e1' }}>—</span>
                      )}
                    </td>

                    {/* Stability */}
                    <td
                      style={{
                        padding: '16px 20px',
                        textAlign: 'right',
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                        fontSize: '14px',
                        color: '#0f172a',
                        fontWeight: 500,
                      }}
                    >
                      {formatNumber(entry.stability) ?? '—'}
                    </td>

                    {/* ΔStability */}
                    <td
                      style={{
                        padding: '16px 20px',
                        textAlign: 'right',
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                      }}
                    >
                      {entry.ddg_stability != null ? (
                        <span
                          style={{
                            fontWeight: 700,
                            fontSize: '14px',
                            color: entry.ddg_stability >= 0 ? '#4f46e5' : '#d97706',
                          }}
                        >
                          {formatSignedNumber(entry.ddg_stability)}
                        </span>
                      ) : (
                        <span style={{ color: '#cbd5e1' }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}