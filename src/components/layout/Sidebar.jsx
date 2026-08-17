import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  BarChart3,
  Settings,
  UserCircle2,
  X,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";

const menu = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Tasks",
    path: "/tasks",
    icon: CheckSquare,
  },
  {
    name: "Calendar",
    path: "/calendar",
    icon: Calendar,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const name = localStorage.getItem("name") || "User";
  const email = localStorage.getItem("email") || "";

  return (
    <div
      className={`
        fixed left-0 top-0 z-[60]
        flex h-dvh w-72 flex-col
        border-r border-border
        bg-background shadow-xl

        transition-transform duration-300 ease-in-out

        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }

        lg:translate-x-0
        lg:shadow-none
      `}
    >
      {/* Logo */}
      <div className="flex shrink-0 items-start justify-between p-6">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-foreground">
            TaskFlow
          </h1>

          <p className="truncate text-sm text-muted-foreground">
            Professional Workspace
          </p>
        </div>

        {/* Mobile Close */}
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="shrink-0 rounded-lg p-2 text-muted-foreground transition hover:bg-accent hover:text-foreground lg:hidden"
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="min-h-0 flex-1 overflow-y-auto p-3">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `
                my-2 flex items-center gap-3
                rounded-2xl px-4 py-3
                transition-all

                ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }
                `
              }
            >
              <Icon
                size={20}
                className="shrink-0"
              />

              <span className="truncate">
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </nav>

      <Separator />

      {/* User */}
      <div className="shrink-0 p-6">
        <div className="flex min-w-0 items-center gap-4">
          <UserCircle2
            size={42}
            className="shrink-0"
          />

          <div className="min-w-0">
            <h4 className="truncate font-semibold text-foreground">
              {name}
            </h4>

            <p className="truncate text-sm text-muted-foreground">
              {email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;