// Simple SVG diagram components for FimHub
export const InfectionCycleDiagram = ({ className }) => (
  <svg viewBox="0 0 400 300" className={className || 'w-full h-auto'}>
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#3d3ffd" />
      </marker>
    </defs>
    
    {/* Circle with steps */}
    <circle cx="200" cy="150" r="120" fill="none" stroke="#e0e0e0" strokeWidth="2" />
    
    {/* Step 1: Bacteria ascend */}
    <circle cx="200" cy="40" r="25" fill="#ef4444" opacity="0.8" />
    <text x="200" y="47" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">1</text>
    <text x="200" y="75" textAnchor="middle" fontSize="11" fill="#333">Bacteria Ascend</text>
    
    {/* Step 2: FimH Sticks */}
    <circle cx="310" cy="110" r="25" fill="#fb923c" opacity="0.8" />
    <text x="310" y="117" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">2</text>
    <text x="310" y="145" textAnchor="middle" fontSize="11" fill="#333">FimH Sticks</text>
    
    {/* Step 3: Invasion */}
    <circle cx="310" cy="240" r="25" fill="#14b8a6" opacity="0.8" />
    <text x="310" y="247" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">3</text>
    <text x="310" y="268" textAnchor="middle" fontSize="11" fill="#333">Cell Invades</text>
    
    {/* Step 4: Biofilm */}
    <circle cx="200" cy="280" r="25" fill="#3d3ffd" opacity="0.8" />
    <text x="200" y="287" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">4</text>
    <text x="200" y="310" textAnchor="middle" fontSize="11" fill="#333">Biofilm Forms</text>
    
    {/* Arrows */}
    <path d="M 200 65 L 285 100" stroke="#3d3ffd" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
    <path d="M 320 135 L 320 215" stroke="#3d3ffd" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
    <path d="M 285 260 L 225 270" stroke="#3d3ffd" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
    <path d="M 175 260 L 175 55" stroke="#3d3ffd" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" opacity="0.5" strokeDasharray="5,5" />
  </svg>
);

export const FimHBindingDiagram = ({ className }) => (
  <svg viewBox="0 0 400 300" className={className || 'w-full h-auto'}>
    {/* Bladder cell surface */}
    <rect x="20" y="200" width="360" height="80" fill="#e8f4f8" stroke="#3d3ffd" strokeWidth="2" />
    <text x="200" y="250" textAnchor="middle" fontSize="12" fill="#666">Bladder Cell Surface</text>
    
    {/* Uroplakins on cell */}
    <circle cx="80" cy="200" r="12" fill="#14b8a6" opacity="0.7" />
    <circle cx="140" cy="200" r="12" fill="#14b8a6" opacity="0.7" />
    <circle cx="200" cy="200" r="12" fill="#14b8a6" opacity="0.7" />
    <circle cx="260" cy="200" r="12" fill="#14b8a6" opacity="0.7" />
    <circle cx="320" cy="200" r="12" fill="#14b8a6" opacity="0.7" />
    
    {/* Mannose sugars */}
    <circle cx="80" cy="180" r="8" fill="#fb923c" />
    <circle cx="140" cy="175" r="8" fill="#fb923c" />
    <circle cx="200" cy="170" r="8" fill="#fb923c" />
    <circle cx="260" cy="175" r="8" fill="#fb923c" />
    <circle cx="320" cy="180" r="8" fill="#fb923c" />
    
    {/* Bacteria and FimH */}
    <circle cx="200" cy="80" r="25" fill="#ef4444" opacity="0.7" />
    <text x="200" y="85" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">E. coli</text>
    
    {/* FimH (the hook) */}
    <line x1="200" y1="105" x2="200" y2="165" stroke="#3d3ffd" strokeWidth="3" />
    <circle cx="200" cy="165" r="6" fill="#3d3ffd" />
    <text x="210" y="140" fontSize="11" fill="#3d3ffd" fontWeight="bold">FimH</text>
    
    {/* Connection line */}
    <line x1="200" y1="165" x2="200" y2="200" stroke="#3d3ffd" strokeWidth="2" strokeDasharray="3,3" />
    
    {/* Labels */}
    <text x="200" y="30" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#333">How FimH Sticks</text>
    <text x="90" y="150" fontSize="10" fill="#fb923c" fontWeight="bold">Mannose</text>
  </svg>
);

export const OM3VsOM6Diagram = ({ className }) => (
  <svg viewBox="0 0 400 250" className={className || 'w-full h-auto'}>
    {/* Left side: OM3 */}
    <rect x="20" y="20" width="160" height="180" fill="#fef3c7" stroke="#fb923c" strokeWidth="2" rx="8" />
    <text x="100" y="45" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#92400e">OM3 Glycan</text>
    <text x="100" y="70" textAnchor="middle" fontSize="12" fill="#666">(High Mannose)</text>
    
    {/* OM3 mannose molecules */}
    {[60, 100, 140].map((x, i) => (
      <g key={i}>
        <circle cx={x} cy="110" r="6" fill="#fb923c" opacity="0.7" />
        <circle cx={x} cy="130" r="6" fill="#fb923c" opacity="0.7" />
        <circle cx={x} cy="150" r="6" fill="#fb923c" opacity="0.7" />
        <circle cx={x} cy="170" r="6" fill="#fb923c" opacity="0.7" />
      </g>
    ))}
    
    <text x="100" y="195" textAnchor="middle" fontSize="11" fill="#666" fontWeight="bold">More attractive to bacteria</text>
    
    {/* Right side: OM6 */}
    <rect x="220" y="20" width="160" height="180" fill="#cffafe" stroke="#06b6d4" strokeWidth="2" rx="8" />
    <text x="300" y="45" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0c4a6e">OM6 Glycan</text>
    <text x="300" y="70" textAnchor="middle" fontSize="12" fill="#666">(Low Mannose)</text>
    
    {/* OM6 mannose molecules (fewer) */}
    <circle cx="280" cy="120" r="6" fill="#06b6d4" opacity="0.7" />
    <circle cx="280" cy="150" r="6" fill="#06b6d4" opacity="0.7" />
    <circle cx="320" cy="140" r="6" fill="#06b6d4" opacity="0.7" />
    
    <text x="300" y="195" textAnchor="middle" fontSize="11" fill="#666" fontWeight="bold">Less attractive to bacteria</text>
  </svg>
);

export const ProteinStructureDiagram = ({ className }) => (
  <svg viewBox="0 0 300 300" className={className || 'w-full h-auto'}>
    <defs>
      <radialGradient id="proteinGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style={{ stopColor: '#3d3ffd', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#1e40af', stopOpacity: 1 }} />
      </radialGradient>
    </defs>
    
    {/* Main protein domain */}
    <circle cx="150" cy="150" r="80" fill="url(#proteinGradient)" opacity="0.8" />
    
    {/* Binding pocket */}
    <ellipse cx="150" cy="120" rx="20" ry="25" fill="#ffffff" opacity="0.6" />
    <text x="150" y="125" textAnchor="middle" fontSize="9" fill="#1e40af" fontWeight="bold">Pocket</text>
    
    {/* Mannose in pocket */}
    <circle cx="150" cy="110" r="8" fill="#fb923c" />
    
    {/* Linker */}
    <line x1="150" y1="155" x2="150" y2="200" stroke="#3d3ffd" strokeWidth="4" />
    
    {/* Pilin domain */}
    <rect x="120" y="200" width="60" height="60" fill="#3d3ffd" opacity="0.6" rx="4" />
    
    {/* Labels */}
    <text x="150" y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#333">FimH Protein Structure</text>
    <text x="230" y="125" fontSize="10" fill="#3d3ffd" fontWeight="bold">Lectin</text>
    <text x="230" y="175" fontSize="10" fill="#3d3ffd" fontWeight="bold">Linker</text>
    <text x="230" y="245" fontSize="10" fill="#3d3ffd" fontWeight="bold">Pilin</text>
  </svg>
);
