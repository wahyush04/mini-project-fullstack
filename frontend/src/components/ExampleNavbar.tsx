// src/components/Navbar.tsx
import { Home, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex gap-6 items-center">
      <Link to="/" className="flex items-center gap-1 text-blue-600 hover:underline">
        <Home size={20} /> Home
      </Link>
      <Link to="/about" className="flex items-center gap-1 text-blue-600 hover:underline">
        <Info size={20} /> About
      </Link>
      <Link to="/users" className="flex items-center gap-1 text-blue-600 hover:underline">
        <Info size={20} /> User List
      </Link>
    </nav>
  );
};

export default Navbar;