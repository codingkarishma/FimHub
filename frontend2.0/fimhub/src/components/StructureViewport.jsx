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
      <div className="structure-viewport">
        <div className="flex h-[18rem] w-full items-center justify-center px-6 text-center sm:h-[20rem] xl:h-[23rem]">
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
    <div className="structure-viewport">
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
        className="h-[18rem] w-full border-0 sm:h-[20rem] xl:h-[23rem]"
        loading="lazy"
      />

      <div className="structure-viewport-badge left-4 top-4">
        Molstar viewer
      </div>

      {mutationPosition && (
        <div className="structure-viewport-badge bottom-4 left-4 is-dark">
          Residue {mutationPosition}
        </div>
      )}

      {mutationName && wildTypeResidue && mutantResidue && (
        <div className="structure-viewport-badge bottom-4 right-4">
          <span>Mutation</span>{' '}
          <span className="font-mono text-[color:var(--fh-text)]">{wildTypeResidue}{mutationPosition}{mutantResidue}</span>
        </div>
      )}
    </div>
  );
}
