import { useState } from 'react';
import { Link } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scienceItems = [
    { label: 'UTI & UPEC', path: '/science/uti' },
    { label: 'Infection Mechanism', path: '/science/mechanism' },
    { label: 'FimH Structure', path: '/science/fimh' },
    { label: 'Uroplakin Model', path: '/science/uroplakin' },
  ];

  const explorerItems = [
    { label: 'Mutation Dashboard', path: '/explorer/dashboard' },
    { label: 'Structure Viewer', path: '/explorer/structure' },
    { label: 'OM3 vs OM6 Comparison', path: '/explorer/comparison' },
  ];

  const dataItems = [
    { label: 'Mutation Dataset', path: '/data#mutations' },
    { label: 'PDB Library', path: '/data#pdb' },
    { label: 'Energy Results', path: '/data#energy' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container-max flex items-center justify-between h-16">
        <Link to="/" className="font-bold text-2xl text-primary-600">
          FimHub
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          <Link to="/" className="px-4 py-2 text-gray-700 hover:text-primary-600 transition-colors">
            Home
          </Link>
          
          <DropdownMenu label="Science" items={scienceItems} />
          <DropdownMenu label="Explorer" items={explorerItems} />
          <DropdownMenu label="Data" items={dataItems} />
          
          <Link to="/methods" className="px-4 py-2 text-gray-700 hover:text-primary-600 transition-colors">
            Methods
          </Link>
          <Link to="/guide" className="px-4 py-2 text-gray-700 hover:text-primary-600 transition-colors">
            Guide
          </Link>
          <Link to="/team" className="px-4 py-2 text-gray-700 hover:text-primary-600 transition-colors">
            Team
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200 p-4 space-y-2">
          <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
            Home
          </Link>
          {scienceItems.map(item => (
            <Link key={item.path} to={item.path} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              {item.label}
            </Link>
          ))}
          <div className="border-t border-gray-300 my-2"></div>
          {explorerItems.map(item => (
            <Link key={item.path} to={item.path} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              {item.label}
            </Link>
          ))}
          <div className="border-t border-gray-300 my-2"></div>
          {dataItems.map(item => (
            <Link key={item.path} to={item.path} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              {item.label}
            </Link>
          ))}
          <Link to="/methods" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
            Methods
          </Link>
          <Link to="/guide" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
            Guide
          </Link>
          <Link to="/team" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
            Team
          </Link>
        </div>
      )}
    </nav>
  );
}
