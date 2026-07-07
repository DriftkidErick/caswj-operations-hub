import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  CalendarDays,
  FileText,
  Users,
  ListTodo,
  Settings,
  Calendar,
  Target,
  ChevronDown,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Agendas", path: "/agendas", icon: ClipboardList },
  { name: "Events", path: "/events", icon: CalendarDays },
  { name: "Templates", path: "/templates", icon: FileText },
  { name: "People", path: "/people", icon: Users },
  { name: "Tasks", path: "/tasks", icon: ListTodo },
  { name: "Calendar", path: "/calendar", icon: Calendar },
  { name: "Goals", path: "/goals", icon: Target },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-title">CASWJ</div>
        <div className="brand-subtitle">
          CULTURAL ARTS SOCIETY
          <br />
          OF WEST JORDAN
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <Icon size={21} strokeWidth={1.8} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
        
    </aside>
  );
}