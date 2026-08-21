// Shared style tokens for the Explorer page.
// Centralizing these means changing "card" or "eyebrow" styling once
// updates every panel, instead of hunting through five copies.

export const colors = {
  ink: '#0f172a',
  body: '#334155',
  muted: '#64748b',
  faint: '#94a3b8',
  border: '#e2e8f0',
  borderStrong: '#cbd5e1',
  bg: '#f8fafc',
  affinity: '#475569',
  affinityDelta: '#0d9488',
  affinityDeltaBg: '#f0fdfa',
  stabilityDelta: '#6366f1',
  stabilityDeltaBg: '#eef2ff',
};

export const panel = {
  background: '#ffffff',
  borderRadius: '12px',
  border: `1px solid ${colors.border}`,
  padding: '24px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
};

export const eyebrow = {
  fontSize: '12px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: colors.muted,
  marginBottom: '6px',
};

export const sectionTitle = {
  fontSize: '18px',
  fontWeight: 600,
  color: colors.ink,
};

export const monoFont = {
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
};

export const legendDot = (color) => ({
  width: '10px',
  height: '10px',
  borderRadius: '2px',
  background: color,
});

export const legendRow = {
  display: 'flex',
  gap: '16px',
  fontSize: '12px',
  marginBottom: '16px',
  flexWrap: 'wrap',
};

export const legendLabel = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  color: colors.body,
};
