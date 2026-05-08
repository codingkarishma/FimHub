function buildViewerUrl({ structureUrl, mutationPosition, mutationName, wildTypeResidue, mutantResidue }) {
  const params = new URLSearchParams({
    'structure-url': structureUrl,
    'structure-url-format': 'pdb',
    'structure-url-is-binary': '0',
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

  return `/molstar/fimhub-viewer.html?${params.toString()}`;
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
      <div className="relative overflow-hidden border border-[color:var(--fh-border)] bg-[color:var(--fh-mid)]">
        <div className="flex h-[22rem] w-full items-center justify-center px-6 text-center sm:h-[26rem] xl:h-[32rem]">
          <div className="max-w-sm space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--fh-text-secondary)]">
              Structure viewer
            </p>
            <p className="text-base text-[color:var(--fh-text-secondary)]">No mutation-linked PDB is available for this substitution.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden border border-[color:var(--fh-border)] bg-[color:var(--fh-mid)]">
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

      <div className="pointer-events-none absolute left-4 top-4 border border-[color:var(--fh-border)] bg-white/90 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--fh-text-secondary)]">
        Molstar viewer
      </div>

      {mutationPosition && (
        <div className="pointer-events-none absolute bottom-4 left-4 border border-[color:var(--fh-border)] bg-[#1c1c2e]/90 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
          Residue {mutationPosition}
        </div>
      )}

      {mutationName && wildTypeResidue && mutantResidue && (
        <div className="pointer-events-none absolute bottom-4 right-4 border border-[color:var(--fh-border)] bg-white/95 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--fh-text-secondary)]">
          <span>Mutation</span>{' '}
          <span className="font-mono text-[color:var(--fh-text)]">{wildTypeResidue}{mutationPosition}{mutantResidue}</span>
        </div>
      )}
    </div>
  );
}
