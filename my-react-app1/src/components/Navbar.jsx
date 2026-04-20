import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { LogOut, BrainCircuit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-slate-200 fixed z-30 w-full">
      <div className="px-4 py-3 lg:px-6 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <span className="flex items-center space-x-2 sm:ml-4">
              <BrainCircuit className="h-8 w-8 text-blue-600" />
              <span className="self-center text-xl font-bold whitespace-nowrap text-slate-800">
                AI Research Companion
              </span>
            </span>
          </div>
          <div className="flex items-center">
            {user && (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-600 hidden sm:block">
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-500 rounded-lg hover:bg-slate-100 focus:ring-4 focus:ring-slate-200 flex items-center gap-2"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="hidden sm:block">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
