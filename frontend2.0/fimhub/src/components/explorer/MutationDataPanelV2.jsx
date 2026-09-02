import Button from '../ui/Button';
import { formatNumber, formatSignedNumber } from '../../lib/modelData';

function formatMetric(value, signed = false) {
  if (typeof value !== 'number' || Number.isNaN(value)) return 'N/A';
  if (Math.abs(value) >= 1000000) {
    return `${value >= 0 && signed ? '+' : ''}${value.toExponential(2)}`;
  }
  return signed ? formatSignedNumber(value) : formatNumber(value);
}

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
        <h3 className="font-mono">{mutation.id}</h3>
        <p>{model?.displayName || 'No model selected'}</p>
      </div>

      <dl className="explorer-detail-list">
        <div>
          <dt>WT site</dt>
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
          <dt>Affinity</dt>
          <dd className="font-mono text-sm">
            {formatMetric(mutation.affinity)}
          </dd>
        </div>
        <div>
          <dt>dAffinity</dt>
          <dd className="font-mono text-sm">
            {formatMetric(mutation.ddg_binding, true)}
          </dd>
        </div>
        <div>
          <dt>Stability</dt>
          <dd className="font-mono text-sm">
            {formatMetric(mutation.stability)}
          </dd>
        </div>
        <div>
          <dt>dStability</dt>
          <dd className="font-mono text-sm">
            {formatMetric(mutation.ddg_stability, true)}
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
