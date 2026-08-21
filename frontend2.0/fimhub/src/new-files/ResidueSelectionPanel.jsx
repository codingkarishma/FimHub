import PanelHeader from './PanelHeader';
import { panel, colors, eyebrow, monoFont } from '../lib/explorerStyles';

const gridLabelStyle = { ...eyebrow, marginBottom: '12px' };

function ResidueButton({ group, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '8px 4px',
        borderRadius: '6px',
        border: active ? '1px solid #0d9488' : `1px solid ${colors.border}`,
        background: active ? '#f0fdfa' : '#ffffff',
        color: active ? '#0f766e' : colors.body,
        fontSize: '13px',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.15s',
        ...monoFont,
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.background = colors.bg;
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.background = '#ffffff';
      }}
    >
      {group.wt}
      {group.position}
    </button>
  );
}

function MutationButton({ record, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '8px 10px',
        borderRadius: '6px',
        border: active ? '1px solid #6366f1' : `1px solid ${colors.border}`,
        background: active ? '#eef2ff' : '#ffffff',
        color: active ? '#4338ca' : colors.body,
        fontSize: '13px',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.15s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '6px',
        ...monoFont,
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.background = colors.bg;
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.background = '#ffffff';
      }}
    >
      <span>{record.id}</span>
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: record.structureAvailable
            ? active
              ? '#0d9488'
              : '#10b981'
            : active
              ? colors.faint
              : colors.borderStrong,
          flexShrink: 0,
        }}
      />
    </button>
  );
}

export default function ResidueSelectionPanel({
  content,
  residueGroups,
  selectedResidueGroup,
  selectedMutation,
  searchTerm,
  onSearchChange,
  onSelectResidue,
  onSelectMutation,
}) {
  return (
    <section style={panel}>
      <PanelHeader
        eyebrow="Residue Selection"
        title="Choose Site and Substitution"
        right={
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search site or substitution..."
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              border: `1px solid ${colors.borderStrong}`,
              fontSize: '14px',
              width: '240px',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.target.style.borderColor = colors.faint)}
            onBlur={(e) => (e.target.style.borderColor = colors.borderStrong)}
          />
        }
      />

      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}
      >
        <div>
          <p style={gridLabelStyle}>{content.residuesLabel}</p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(56px, 1fr))',
              gap: '6px',
            }}
          >
            {residueGroups.map((group) => (
              <ResidueButton
                key={group.position}
                group={group}
                active={group.position === selectedResidueGroup?.position}
                onClick={() => onSelectResidue(group)}
              />
            ))}
          </div>
          {residueGroups.length === 0 && (
            <p
              style={{
                marginTop: '12px',
                fontSize: '13px',
                color: colors.faint,
              }}
            >
              No residues matched.
            </p>
          )}
        </div>

        <div>
          <p style={gridLabelStyle}>{content.mutationsLabel}</p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
              gap: '6px',
            }}
          >
            {selectedResidueGroup?.records.map((record) => (
              <MutationButton
                key={record.id}
                record={record}
                active={record.id === selectedMutation?.id}
                onClick={() => onSelectMutation(record.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
