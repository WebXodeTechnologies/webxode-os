import Link from "next/link";
import { Plus, ChevronDown, UserPlus, FilePlus, FolderPlus, DollarSign } from "lucide-react";

interface QuickActionsMenuProps {
  show: boolean;
  onToggle: () => void;
  onClose: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function QuickActionsMenu({ show, onToggle, onClose, containerRef }: QuickActionsMenuProps) {
  const actions = [
    {
      title: "Add Sales Lead",
      desc: "Log new pipeline prospect",
      href: "/dashboard/sales",
      icon: UserPlus,
      bg: "bg-indigo-50",
      text: "text-indigo-600",
      hoverBg: "hover:bg-indigo-50 hover:text-indigo-900",
    },
    {
      title: "Create Proposal",
      desc: "Generate estimate or SOW",
      href: "/dashboard/estimates",
      icon: FilePlus,
      bg: "bg-purple-50",
      text: "text-purple-600",
      hoverBg: "hover:bg-purple-50 hover:text-purple-900",
    },
    {
      title: "Start New Project",
      desc: "Kick off delivery milestone",
      href: "/dashboard/projects",
      icon: FolderPlus,
      bg: "bg-cyan-50",
      text: "text-cyan-600",
      hoverBg: "hover:bg-cyan-50 hover:text-cyan-900",
    },
    {
      title: "Log Payment / Invoice",
      desc: "Record revenue stream",
      href: "/dashboard/finance",
      icon: DollarSign,
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      hoverBg: "hover:bg-emerald-50 hover:text-emerald-900",
    },
  ];

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={onToggle}
        className="flex h-9 items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700 active:scale-[0.98] sm:h-10 sm:px-3.5 sm:text-sm"
        title="Quick New Action"
      >
        <Plus className="h-4 w-4" />
        <span className="hidden sm:inline">New Action</span>
        <ChevronDown className="hidden h-3.5 w-3.5 text-indigo-200 sm:inline" />
      </button>

      {show && (
        <div className="animate-in fade-in absolute right-0 z-50 mt-2.5 w-64 max-w-[calc(100vw-1.5rem)] rounded-2xl border border-slate-200/80 bg-white/95 p-2 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl duration-150">
          <div className="px-3.5 py-2 text-xs font-bold tracking-wider text-slate-400 uppercase">
            Quick Actions
          </div>
          {actions.map((act) => {
            const Icon = act.icon;
            return (
              <Link
                key={act.title}
                href={act.href as any}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-700 transition-colors ${act.hoverBg}`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-xl ${act.bg} ${act.text} shrink-0`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-bold text-slate-900">{act.title}</p>
                  <p className="truncate text-xs font-normal text-slate-500">{act.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
