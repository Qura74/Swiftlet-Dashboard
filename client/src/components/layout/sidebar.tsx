import { useState } from "react";
import type { User } from "firebase/auth";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  House,
  Bell,
  Table,
  Settings,
  UserPlus,
  LogOut,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

type NavItem = {
  title: string;
  href?: string;
  icon: React.FC<any>;
  onClick?: () => void;
};

// 🌐 Main Navigation Links
const navItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: House },
  { title: "Sites", href: "/profile", icon: Table },
  { title: "Alerts", href: "/notifications", icon: Bell },
];

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false); // ⚙️ Dropdown toggle

  const handleSignOut = async () => {
    if (logout) {
      await logout();
      navigate("/auth/sign-in");
    }
  };

  return (
    <aside
      className={cn(
        "bg-white lg:bg-transparent flex flex-col relative z-10 h-full border-r border-stone-200 transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* ===== Header ===== */}
      <div className="p-6 pb-0 relative z-10 flex items-center justify-between">
        {!collapsed && (
          <h1 className="text-lg font-semibold text-stone-900 truncate">
            {user ? `Welcome ${user.displayName || "User"}` : "Swiftlet Admin"}
          </h1>
        )}
        <div className="flex items-center gap-2">
          {/* Collapse toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 text-stone-600 hover:text-stone-900 hover:bg-stone-100"
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>

          {/* Close for mobile */}
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden p-1 text-stone-600 hover:text-stone-900 hover:bg-stone-100"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* ===== Navigation ===== */}
      <nav className="flex-1 p-4 space-y-2 relative z-10">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;

          return (
            <NavLink key={item.href} to={item.href}>
              <div
                className={cn(
                  "flex items-center text-sm font-normal rounded-lg cursor-pointer gap-3",
                  collapsed && "justify-center",
                  isActive
                    ? "px-3 py-2 shadow-sm hover:shadow-md bg-stone-800 text-white border border-stone-900 transition-all duration-200"
                    : "px-3 py-2 text-stone-700 hover:bg-stone-100 transition-colors duration-200 border border-transparent"
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{item.title}</span>}
              </div>
            </NavLink>
          );
        })}

        {/* ===== ⚙️ Settings Dropdown ===== */}
        <div className="pt-4 border-t border-stone-200 mt-4">
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className={cn(
              "flex items-center text-sm font-medium rounded-lg cursor-pointer gap-3 w-full px-3 py-2 transition-all",
              collapsed
                ? "justify-center"
                : "justify-between hover:bg-stone-100 text-stone-700"
            )}
          >
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-stone-700" />
              {!collapsed && <span>Settings</span>}
            </div>
            {!collapsed && (
              <span className="text-stone-500 text-xs">
                {settingsOpen ? "▲" : "▼"}
              </span>
            )}
          </button>

          {/* Dropdown items */}
          {settingsOpen && (
            <div
              className={cn(
                "ml-6 mt-2 space-y-1 transition-all duration-200",
                collapsed && "hidden"
              )}
            >
              <NavLink
                to="/auth/sign-up"
                className="flex items-center text-sm text-stone-700 hover:text-blue-700 transition-colors gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add User</span>
              </NavLink>

              <button
                onClick={handleSignOut}
                className="flex items-center text-sm text-red-600 hover:text-red-700 gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}
