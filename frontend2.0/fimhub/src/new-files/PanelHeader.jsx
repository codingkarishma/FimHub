import { eyebrow, sectionTitle, monoFont } from '../lib/explorerStyles';

/**
 * The small-caps label + heading pattern repeated across every panel
 * ("Residue Selection" / "Choose Site and Substitution", etc).
 */
export default function PanelHeader({
  eyebrow: eyebrowText,
  title,
  mono,
  right,
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: right ? '20px' : '16px',
      }}
    >
      <div>
        <p style={eyebrow}>{eyebrowText}</p>
        <h2
          style={
            mono
              ? { ...sectionTitle, fontSize: '20px', ...monoFont }
              : sectionTitle
          }
        >
          {title}
        </h2>
      </div>
      {right}
    </div>
  );
}
