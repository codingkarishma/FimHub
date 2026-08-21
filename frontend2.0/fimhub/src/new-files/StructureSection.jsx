import Button from '../components/ui/Button';
import StructureViewport from '../components/StructureViewport';
import PanelHeader from './PanelHeader';
import { panel, colors, eyebrow, monoFont } from '../lib/explorerStyles';

/**
 * The exact affinity/stability/delta values for the selected mutation are
 * already visible in the two ProfileChart panels above (as bars, and in the
 * hover tooltip). Repeating them again here was pure duplication, so this
 * section now only surfaces what those charts *don't* show: whether a
 * structure exists, and how many models share this position.
 */
export default function StructureSection({
  selectedMutation,
  structureUrl,
  crossModelLabel,
  crossModelCount,
}) {
  return (
    <section style={panel}>
      <PanelHeader
        eyebrow="Structure Viewer"
        title={selectedMutation?.id || 'No mutation selected'}
        mono
        right={
          structureUrl && (
            <a href={structureUrl} download style={{ textDecoration: 'none' }}>
              <Button
                variant="outline"
                size="sm"
                style={{
                  borderRadius: '8px',
                  borderColor: colors.borderStrong,
                  color: colors.body,
                  fontWeight: 500,
                }}
              >
                Download Structure
              </Button>
            </a>
          )
        }
      />

      <div
        style={{
          background: colors.bg,
          borderRadius: '10px',
          border: `1px solid ${colors.border}`,
          overflow: 'hidden',
          marginBottom: '20px',
        }}
      >
        <StructureViewport
          mutationName={selectedMutation?.id}
          mutationPosition={selectedMutation?.position}
          structureUrl={structureUrl}
          wildTypeResidue={selectedMutation?.wt}
          mutantResidue={selectedMutation?.mut}
        />
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: colors.bg,
          borderRadius: '8px',
          padding: '14px 16px',
          border: `1px solid ${colors.border}`,
        }}
      >
        <div>
          <dt style={{ ...eyebrow, marginBottom: '4px' }}>{crossModelLabel}</dt>
          <dd
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: colors.ink,
              margin: 0,
              ...monoFont,
            }}
          >
            {crossModelCount}
          </dd>
        </div>
        <span
          style={{
            fontSize: '12px',
            fontWeight: 600,
            padding: '6px 10px',
            borderRadius: '999px',
            color: selectedMutation?.structureAvailable
              ? '#0f766e'
              : colors.faint,
            background: selectedMutation?.structureAvailable
              ? '#f0fdfa'
              : colors.bg,
            border: `1px solid ${selectedMutation?.structureAvailable ? '#99f6e4' : colors.border}`,
          }}
        >
          {selectedMutation?.structureAvailable
            ? 'Structure available'
            : 'No structure on file'}
        </span>
      </div>
    </section>
  );
}
