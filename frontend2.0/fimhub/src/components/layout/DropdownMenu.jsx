import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function DropdownMenu({ label, items }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative group">
      <button className="px-4 py-2 text-gray-700 hover:text-primary-600 transition-colors flex items-center gap-1">
        {label}
        <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      <div className="absolute left-0 mt-0 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {items.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors border-b border-gray-100 last:border-b-0"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
