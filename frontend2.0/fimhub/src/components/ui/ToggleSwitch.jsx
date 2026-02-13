export default function ToggleSwitch({ 
  enabled, 
  onChange, 
  label,
  className = ''
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {label && <label className="font-semibold text-gray-700">{label}</label>}
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
          enabled ? 'bg-primary-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-8' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}
