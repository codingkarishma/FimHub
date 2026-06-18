import Button from '../ui/Button';
import { formatNumber, formatSignedNumber } from '../../lib/modelData';

export default function CrossModelModalV2({
  open,
  onClose,
  mutationId,
  entries = [],
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#1c1c2e]/40 px-4 backdrop-blur-sm">
      <div
        className="max-h-[85vh] w-full max-w-5xl overflow-hidden border border-[color:var(--fh-border)] bg-[color:var(--fh-surface)]"
        style={{ borderRadius: '12px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 28px',
            borderBottom: '1px solid var(--fh-border)',
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
                letterSpacing: '0.08em',
                color: 'var(--fh-accent)',
                marginBottom: '8px',
              }}
            >
              Cross-model comparison
            </p>
            <h3
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: 'var(--fh-text)',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              }}
            >
              {mutationId}
            </h3>
            <p
              style={{
                marginTop: '6px',
                fontSize: '13px',
                lineHeight: 1.5,
                color: 'var(--fh-text-secondary)',
              }}
            >
              Quantitative comparison of {mutationId} across {entries.length} curated model{entries.length !== 1 ? 's' : ''}.
            </p>
          </div>
          <Button variant="outline" onClick={onClose} style={{ flexShrink: 0 }}>
            Close
          </Button>
        </div>

        {/* Table */}
        <div style={{ overflow: 'auto', maxHeight: 'calc(85vh - 140px)' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '13px',
            }}
          >
            <thead
              style={{
                position: 'sticky',
                top: 0,
                zIndex: 10,
                background: 'var(--fh-surface)',
                borderBottom: '2px solid var(--fh-border)',
              }}
            >
              <tr>
                {[
                  { label: 'Model', align: 'left', width: '24%' },
                  { label: 'Species', align: 'left', width: '12%' },
                  { label: 'Glycan', align: 'left', width: '18%' },
                  { label: 'Affinity (M)', align: 'right', width: '12%' },
                  { label: 'ΔAffinity', align: 'right', width: '10%' },
                  { label: 'Stability (Pa)', align: 'right', width: '12%' },
                  { label: 'ΔStability', align: 'right', width: '10%' },
                  { label: 'Structure', align: 'center', width: '8%' },
                ].map((col) => (
                  <th
                    key={col.label}
                    style={{
                      padding: '14px 16px',
                      textAlign: col.align,
                      fontSize: '11px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--fh-text-secondary)',
                      whiteSpace: 'nowrap',
                      width: col.width,
                    }}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    style={{
                      padding: '48px 16px',
                      textAlign: 'center',
                      color: 'var(--fh-text-secondary)',
                      fontSize: '14px',
                    }}
                  >
                    No cross-model data available for this mutation.
                  </td>
                </tr>
              ) : (
                entries.map((entry, index) => (
                  <tr
                    key={entry.modelId}
                    style={{
                      borderBottom: '1px solid var(--fh-border)',
                      background: index % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0,0,0,0.04)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        index % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)';
                    }}
                  >
                    {/* Model name */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span
                          style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: entry.color || '#94a3b8',
                            flexShrink: 0,
                          }}
                        />
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--fh-text)', fontSize: '14px' }}>
                            {entry.displayName}
                          </div>
                          <div
                            style={{
                              fontSize: '11px',
                              color: 'var(--fh-text-secondary)',
                              marginTop: '2px',
                              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                            }}
                          >
                            {entry.modelId}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Species */}
                    <td style={{ padding: '14px 16px', color: 'var(--fh-text)' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '13px',
                        }}
                      >
                        <span
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background:
                              entry.species?.toLowerCase() === 'human'
                                ? '#0d9488'
                                : entry.species?.toLowerCase() === 'mouse'
                                  ? '#6366f1'
                                  : entry.species?.toLowerCase() === 'porcine'
                                    ? '#d97706'
                                    : '#94a3b8',
                          }}
                        />
                        {entry.species}
                      </span>
                    </td>

                    {/* Glycan */}
                    <td style={{ padding: '14px 16px', color: 'var(--fh-text-secondary)', fontSize: '13px' }}>
                      {entry.glycanType || '—'}
                    </td>

                    {/* Affinity */}
                    <td
                      style={{
                        padding: '14px 16px',
                        textAlign: 'right',
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                        fontSize: '13px',
                        color: 'var(--fh-text)',
                        fontWeight: 500,
                      }}
                    >
                      {formatNumber(entry.affinity) ?? '—'}
                    </td>

                    {/* ΔAffinity */}
                    <td
                      style={{
                        padding: '14px 16px',
                        textAlign: 'right',
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                        fontSize: '13px',
                        fontWeight: 600,
                      }}
                    >
                      {entry.ddg_binding != null ? (
                        <span
                          style={{
                            color: entry.ddg_binding <= 0 ? '#0d9488' : '#e11d48',
                          }}
                        >
                          {formatSignedNumber(entry.ddg_binding)}
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>

                    {/* Stability */}
                    <td
                      style={{
                        padding: '14px 16px',
                        textAlign: 'right',
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                        fontSize: '13px',
                        color: 'var(--fh-text)',
                        fontWeight: 500,
                      }}
                    >
                      {formatNumber(entry.stability) ?? '—'}
                    </td>

                    {/* ΔStability */}
                    <td
                      style={{
                        padding: '14px 16px',
                        textAlign: 'right',
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                        fontSize: '13px',
                        fontWeight: 600,
                      }}
                    >
                      {entry.ddg_stability != null ? (
                        <span
                          style={{
                            color: entry.ddg_stability >= 0 ? '#6366f1' : '#f59e0b',
                          }}
                        >
                          {formatSignedNumber(entry.ddg_stability)}
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>

                    {/* Structure availability */}
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      {entry.structureAvailable ? (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '22px',
                            height: '22px',
                            borderRadius: '50%',
                            background: '#ecfdf5',
                            color: '#059669',
                            fontSize: '12px',
                            fontWeight: 700,
                          }}
                        >
                          ✓
                        </span>
                      ) : (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '22px',
                            height: '22px',
                            borderRadius: '50%',
                            background: '#f1f5f9',
                            color: '#94a3b8',
                            fontSize: '12px',
                          }}
                        >
                          —
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}