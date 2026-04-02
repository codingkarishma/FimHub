import { Link } from 'react-router-dom';

export default function DropdownMenu({ label, items }) {
  return (
    <div className="relative group">
      <button className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-white hover:text-slate-950">
        {label}
        <svg className="h-4 w-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div className="absolute left-0 top-full z-50 mt-3 w-60 rounded-3xl border border-slate-200 bg-white/95 p-2 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.55)] opacity-0 invisible transition-all duration-200 group-hover:visible group-hover:opacity-100">
        {items.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
