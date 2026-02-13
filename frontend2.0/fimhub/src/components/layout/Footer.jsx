import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container-max py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-400">FimHub</h3>
            <p className="text-gray-400">Interactive platform for FimH mutation and glycan interaction analysis.</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Science</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/science/uti" className="hover:text-white transition-colors">UTI & UPEC</Link></li>
              <li><Link to="/science/mechanism" className="hover:text-white transition-colors">Infection Mechanism</Link></li>
              <li><Link to="/science/fimh" className="hover:text-white transition-colors">FimH Structure</Link></li>
              <li><Link to="/science/uroplakin" className="hover:text-white transition-colors">Uroplakin Model</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/explorer/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link to="/data" className="hover:text-white transition-colors">Data</Link></li>
              <li><Link to="/methods" className="hover:text-white transition-colors">Methods</Link></li>
              <li><Link to="/guide" className="hover:text-white transition-colors">Guide</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/team" className="hover:text-white transition-colors">Team</Link></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; {currentYear} FimHub. All rights reserved.</p>
          <p>Built with React, Tailwind CSS, and scientific rigor.</p>
        </div>
      </div>
    </footer>
  );
}
