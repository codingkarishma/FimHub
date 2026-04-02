function buildViewerUrl({ structureUrl, mutationPosition, mutationName, wildTypeResidue, mutantResidue }) {
  const params = new URLSearchParams({
    'hide-controls': '1',
    'collapse-left-panel': '1',
    'structure-url': structureUrl,
    'structure-url-format': 'pdb',
    'structure-url-is-binary': '0',
    'pdb-provider': 'rcsb',
    'emdb-provider': 'rcsb',
  });

  if (mutationPosition) {
    params.set('highlight-auth-residue', String(mutationPosition));
    params.set('focus-auth-residue', String(mutationPosition));
  }

  if (mutationName) {
    params.set('mutation-label', mutationName);
  }

  if (wildTypeResidue) {
    params.set('wild-type-residue', wildTypeResidue);
  }

  if (mutantResidue) {
    params.set('mutant-residue', mutantResidue);
  }

  return `/molstar/index.html?${params.toString()}`;
}

export default function StructureViewport({
  structureUrl,
  mutationName,
  mutationPosition,
  wildTypeResidue,
  mutantResidue,
}) {
  if (!structureUrl) {
    return (
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[#f8f5ee]">
        <div className="flex h-[22rem] w-full items-center justify-center px-6 text-center sm:h-[26rem] xl:h-[32rem]">
          <div className="max-w-sm space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Structure Lab
            </p>
            <p className="text-base text-slate-700">No PDB file is linked for this mutation yet.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[#f8f5ee] shadow-[0_24px_80px_-46px_rgba(15,23,42,0.28)]">
      <iframe
        key={`${structureUrl}-${mutationPosition || 'na'}`}
        src={buildViewerUrl({
          structureUrl,
          mutationPosition,
          mutationName,
          wildTypeResidue,
          mutantResidue,
        })}
        title={`Structure viewer for ${mutationName}`}
        className="h-[22rem] w-full border-0 sm:h-[26rem] xl:h-[32rem]"
        loading="lazy"
      />

      <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/90 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm">
        Molstar viewer
      </div>

      {mutationPosition && (
        <div className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-slate-950/88 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-sm">
          Residue {mutationPosition}
        </div>
      )}

      {mutationName && wildTypeResidue && mutantResidue && (
        <div className="pointer-events-none absolute bottom-4 right-4 rounded-[1rem] border border-white/30 bg-white/92 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700 shadow-sm">
          <span className="text-slate-500">Mutation</span>{' '}
          <span className="font-mono text-slate-950">{wildTypeResidue}{mutationPosition}{mutantResidue}</span>
        </div>
      )}
    </div>
  );
}
