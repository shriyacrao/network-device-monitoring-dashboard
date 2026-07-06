import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-slate-100 font-semibold text-lg tracking-tight">
        NetMonitor
      </Link>
      {user && (
        <div className="flex items-center gap-6 text-sm">
          <Link to="/" className="text-slate-300 hover:text-white transition-colors">
            Dashboard
          </Link>
          <Link to="/devices" className="text-slate-300 hover:text-white transition-colors">
            Devices
          </Link>
          <span className="text-slate-500">
            {user.name} <span className="text-slate-600">({user.role})</span>
          </span>
          <button
            onClick={handleLogout}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-md transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
