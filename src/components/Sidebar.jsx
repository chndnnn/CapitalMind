import { NavLink } from "react-router-dom";
import {
  Home,
  Folder,
  FlaskConical,
  Archive,
  Users,
  Gift,
  User,
  ChevronDown,
} from "lucide-react";

export default function Sidebar() {
  const baseClass =
    "flex items-center gap-3 px-5 py-2.5 text-sm transition-all";

  const activeClass =
    "bg-gray-200 text-gray-900 font-medium";

  const inactiveClass =
    "text-gray-600 hover:bg-gray-100";

  return (
    <div className="w-64 bg-slate-50 h-screen flex flex-col justify-between border-r border-gray-300">
      
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="px-6 py-6">
          <h1 className="text-xl font-bold">
            <img src="https://premium.capitalmind.in/wp-content/themes/clarity/components/header/Logo_CMPremium.png" className="w-[60%]" alt="" />
          </h1>
        </div>

        {/* Menu */}
        <nav className="space-y-1">
          
          {/* Home (Functional) */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${baseClass} ${
                isActive ? activeClass : inactiveClass
              }`
            }
          >
            <Home size={18} />
            Home
          </NavLink>

          {/* Portfolios (Functional) */}
          <NavLink
            to="/portfolio"
            className={({ isActive }) =>
              `${baseClass} ${
                isActive ? activeClass : inactiveClass
              }`
            }
          >
            <Folder size={18} />
            Portfolios
          </NavLink>

          {/* Static Items */}
          <div className={`${baseClass} ${inactiveClass} cursor-pointer`}>
            <FlaskConical size={18} />
            Experimentals
          </div>

          <div className={`${baseClass} ${inactiveClass} cursor-pointer`}>
            <Archive size={18} />
            Slack Archives
          </div>

          <div className={`${baseClass} ${inactiveClass} cursor-pointer`}>
            <Users size={18} />
            Refer a friend
          </div>

          <div className={`${baseClass} ${inactiveClass} cursor-pointer`}>
            <Gift size={18} />
            Gift a subscription
          </div>

          <div className={`${baseClass} ${inactiveClass} cursor-pointer`}>
            <User size={18} />
            Account
          </div>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="px-5 py-4 border-t border-gray-300 bg-gray-50">
        
        {/* User */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-semibold">
              RN
            </div>
            <ChevronDown size={16} className="text-gray-500" />
          </div>

          <div className="text-right">
            <div className="text-xs font-medium text-gray-700">
              CMPY
            </div>
            <div className="text-[11px] text-gray-400">
              Valid till Apr 19, 2025
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
