import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, PlusCircle } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'New Note', icon: PlusCircle, path: '/notes/new' }
  ];

  return (
    <aside className="fixed top-0 left-0 z-20 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-slate-200 sm:translate-x-0">
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
        <ul className="space-y-2 font-medium">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg group ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-900 hover:bg-slate-100'
                  }`
                }
              >
                <item.icon
                  className={`w-5 h-5 transition duration-75 ${
                    // The NavLink className function doesn't easily expose isActive to children directly in this scope
                    // without a render prop for children, but we can just let CSS inherit color or use a wrapper.
                    // For simplicity, we use the default text color inheritance.
                    'text-current'
                  }`}
                />
                <span className="ml-3">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
