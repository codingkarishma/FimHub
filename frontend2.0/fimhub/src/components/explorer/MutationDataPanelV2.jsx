import Button from '../ui/Button';
import { formatNumber, formatSignedNumber } from '../../lib/modelData';

export default function MutationDataPanelV2({
  model,
  mutation,
  crossModelCount,
  onCompareAcrossModels,
}) {
  if (!mutation) {
    return (
      <aside className="surface-panel rounded-[1.5rem] p-5 xl:sticky xl:top-24">
        <h3 className="text-xl font-light text-[color:var(--fh-text)]">
          Selection
        </h3>
        <p className="mt-4 text-sm leading-7 text-[color:var(--fh-text-secondary)]">
          Select a substitution to load the mutation view.
        </p>
      </aside>
    );
  }

  return (
    <aside className="surface-panel rounded-[1.5rem] p-5 xl:sticky xl:top-24">
      <div>
        <h3 className="font-mono text-3xl text-[color:var(--fh-text)]">
          {mutation.id}
        </h3>
        <p className="mt-2 text-sm text-[color:var(--fh-text-secondary)]">
          {model.displayName}
        </p>
        <p className="mt-1 text-sm text-[color:var(--fh-text-secondary)]">
          {mutation.phenotype}
        </p>
      </div>

      <dl className="mt-6 grid gap-0 overflow-hidden rounded-[1rem] border border-[color:var(--fh-border)] text-sm">
        <div className="flex items-center justify-between gap-3 border-b border-[color:var(--fh-border)] px-4 py-3">
          <dt className="text-[color:var(--fh-text-secondary)]">
            Wild-type site
          </dt>
          <dd className="font-medium text-[color:var(--fh-text)]">
            {mutation.wt}
            {mutation.position}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3 border-b border-[color:var(--fh-border)] px-4 py-3">
          <dt className="text-[color:var(--fh-text-secondary)]">
            Substitution
          </dt>
          <dd className="font-medium text-[color:var(--fh-text)]">
            {mutation.wt} {'->'} {mutation.mut}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3 border-b border-[color:var(--fh-border)] px-4 py-3">
          <dt className="text-[color:var(--fh-text-secondary)]">Region</dt>
          <dd className="font-medium capitalize text-[color:var(--fh-text)]">
            {mutation.region.replace('-', ' ')}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3 border-b border-[color:var(--fh-border)] px-4 py-3">
          <dt className="text-[color:var(--fh-text-secondary)]">Method</dt>
          <dd className="font-medium text-[color:var(--fh-text)]">
            {mutation.method}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3 border-b border-[color:var(--fh-border)] px-4 py-3">
          <dt className="text-[color:var(--fh-text-secondary)]">
            Structure file
          </dt>
          <dd className="font-medium text-[color:var(--fh-text)]">
            {mutation.structureAvailable ? 'Linked PDB' : 'No linked PDB'}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3 border-b border-[color:var(--fh-border)] px-4 py-3">
          <dt className="text-[color:var(--fh-text-secondary)]">Affinity</dt>
          <dd className="font-medium text-[color:var(--fh-text)]">
            {formatNumber(mutation.affinity)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3 border-b border-[color:var(--fh-border)] px-4 py-3">
          <dt className="text-[color:var(--fh-text-secondary)]">dAffinity</dt>
          <dd className="font-medium text-[color:var(--fh-text)]">
            {formatSignedNumber(mutation.ddg_binding)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3 border-b border-[color:var(--fh-border)] px-4 py-3">
          <dt className="text-[color:var(--fh-text-secondary)]">Stability</dt>
          <dd className="font-medium text-[color:var(--fh-text)]">
            {formatNumber(mutation.stability)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <dt className="text-[color:var(--fh-text-secondary)]">dStability</dt>
          <dd className="font-medium text-[color:var(--fh-text)]">
            {formatSignedNumber(mutation.ddg_stability)}
          </dd>
        </div>
      </dl>

      <div className="mt-6 border-t border-[color:var(--fh-border)] pt-5">
        <p className="mt-3 text-sm leading-7 text-[color:var(--fh-text-secondary)]">
          {crossModelCount > 1
            ? `${crossModelCount} models contain this substitution.`
            : 'No secondary model match is available.'}
        </p>
        <div className="mt-5">
          <Button
            variant="outline"
            className="w-full"
            onClick={onCompareAcrossModels}
            disabled={crossModelCount <= 1}
          >
            Compare Across Models
          </Button>
        </div>
      </div>
    </aside>
  );
}
