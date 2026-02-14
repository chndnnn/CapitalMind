import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  Home,
  Folder,
  FlaskConical,
  Archive,
  Users,
  Gift,
  User,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const baseClass =
    "flex items-center gap-3 px-5 py-2.5 text-sm transition-all";

  const activeClass =
    "bg-gray-200 text-gray-900 font-medium";

  const inactiveClass =
    "text-gray-600 hover:bg-gray-100";

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger (Mobile Only) */}
      <div className="md:hidden  items-center p-4 border-b">
        <button onClick={() => setIsOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0 h-screen w-64 bg-slate-50
          flex flex-col justify-between border-r border-gray-300
          transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Top Section */}
        <div>
          {/* Mobile Close Button */}
          <div className="md:hidden flex justify-end p-4">
            <button onClick={closeSidebar}>
              <X size={20} />
            </button>
          </div>

          {/* Logo */}
          <div className="px-6 py-6">
            <img
              src="https://premium.capitalmind.in/wp-content/themes/clarity/components/header/Logo_CMPremium.png"
              className="w-[60%]"
              alt="Logo"
            />
          </div>

          {/* Menu */}
          <nav className="space-y-1">
            <NavLink
              to="/"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `${baseClass} ${
                  isActive ? activeClass : inactiveClass
                }`
              }
            >
              <Home size={18} />
              Home
            </NavLink>

            <NavLink
              to="/portfolio"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `${baseClass} ${
                  isActive ? activeClass : inactiveClass
                }`
              }
            >
              <Folder size={18} />
              Portfolios
            </NavLink>

            <div className={`${baseClass} ${inactiveClass}`}>
              <FlaskConical size={18} />
              Experimentals
            </div>

            <div className={`${baseClass} ${inactiveClass}`}>
              <Archive size={18} />
              Slack Archives
            </div>

            <div className={`${baseClass} ${inactiveClass}`}>
              <Users size={18} />
              Refer a friend
            </div>

            <div className={`${baseClass} ${inactiveClass}`}>
              <Gift size={18} />
              Gift a subscription
            </div>

            <div className={`${baseClass} ${inactiveClass}`}>
              <User size={18} />
              Account
            </div>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="px-5 py-4 border-t border-gray-300 bg-gray-50">
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
    </>
  );
}
