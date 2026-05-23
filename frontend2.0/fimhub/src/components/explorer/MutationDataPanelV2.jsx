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
      <aside className="explorer-panel explorer-data-panel xl:sticky xl:top-24">
        <p className="explorer-list-label">Mutation</p>
        <h3>Selection</h3>
        <p className="explorer-empty-copy">
          Select a substitution to load the mutation view.
        </p>
      </aside>
    );
  }

  return (
    <aside className="explorer-panel explorer-data-panel xl:sticky xl:top-24">
      <div className="explorer-data-title">
        <p className="explorer-list-label">Mutation</p>
        <h3 className="font-mono">
          {mutation.id}
        </h3>
        <p>
          {model?.displayName || 'No model selected'}
        </p>
        <p>
          {mutation.phenotype}
        </p>
      </div>

      <dl className="explorer-detail-list">
        <div>
          <dt>Wild-type site</dt>
          <dd>
            {mutation.wt}
            {mutation.position}
          </dd>
        </div>
        <div>
          <dt>Substitution</dt>
          <dd>
            {mutation.wt} {'->'} {mutation.mut}
          </dd>
        </div>
        <div>
          <dt>Region</dt>
          <dd className="capitalize">
            {mutation.region.replace('-', ' ')}
          </dd>
        </div>
        <div>
          <dt>Method</dt>
          <dd>
            {mutation.method}
          </dd>
        </div>
        <div>
          <dt>Structure file</dt>
          <dd>
            {mutation.structureAvailable ? 'Linked PDB' : 'No linked PDB'}
          </dd>
        </div>
        <div>
          <dt>Affinity</dt>
          <dd>
            {formatNumber(mutation.affinity)}
          </dd>
        </div>
        <div>
          <dt>dAffinity</dt>
          <dd>
            {formatSignedNumber(mutation.ddg_binding)}
          </dd>
        </div>
        <div>
          <dt>Stability</dt>
          <dd>
            {formatNumber(mutation.stability)}
          </dd>
        </div>
        <div>
          <dt>dStability</dt>
          <dd>
            {formatSignedNumber(mutation.ddg_stability)}
          </dd>
        </div>
      </dl>

      <div className="explorer-compare-block">
        <p>
          {crossModelCount > 1
            ? `${crossModelCount} models contain this substitution.`
            : 'No secondary model match is available.'}
        </p>
        <Button
          variant="outline"
          className="w-full rounded-lg"
          onClick={onCompareAcrossModels}
          disabled={crossModelCount <= 1}
        >
          Compare Across Models
        </Button>
      </div>
    </aside>
  );
}
