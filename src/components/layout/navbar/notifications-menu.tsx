import { Bell, Check, CheckCircle2, Clock, Sparkles } from "lucide-react";

interface NotificationsMenuProps {
  show: boolean;
  read: boolean;
  onToggle: () => void;
  onMarkRead: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function NotificationsMenu({
  show,
  read,
  onToggle,
  onMarkRead,
  containerRef,
}: NotificationsMenuProps) {
  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={onToggle}
        className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-700 shadow-2xs transition-colors hover:bg-slate-100 hover:text-slate-900 sm:h-10 sm:w-10"
        title="Notifications"
      >
        <Bell className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
        {!read && (
          <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5 sm:top-2 sm:right-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-indigo-600 ring-2 ring-white" />
          </span>
        )}
      </button>

      {show && (
        <div className="animate-in fade-in absolute right-0 z-50 mt-2.5 w-80 max-w-[calc(100vw-1.5rem)] rounded-2xl border border-slate-200/80 bg-white/95 p-3.5 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl duration-150 sm:w-96 sm:p-4">
          <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 sm:text-sm">Activity & Alerts</span>
              {!read && (
                <span className="rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-0.5 text-[10px] font-bold text-indigo-700 sm:text-xs">
                  2 New
                </span>
              )}
            </div>
            <button
              onClick={onMarkRead}
              className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              <Check className="h-3.5 w-3.5" />
              <span>Mark read</span>
            </button>
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm">
            <div className="flex items-start gap-3 rounded-xl border border-transparent p-2.5 transition-colors hover:border-slate-100 hover:bg-slate-50">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 sm:h-9 sm:w-9">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold text-slate-900">Proposal Signed & Approved</p>
                <p className="truncate text-xs text-slate-600">Client signed Acme Corp SOW v2.4</p>
                <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-slate-400">
                  <Clock className="h-3 w-3" /> 10 minutes ago
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-transparent p-2.5 transition-colors hover:border-slate-100 hover:bg-slate-50">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 sm:h-9 sm:w-9">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold text-slate-900">New High-Value Lead</p>
                <p className="truncate text-xs text-slate-600">
                  Inbound inquiry via WebXode Site ($25k project)
                </p>
                <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-slate-400">
                  <Clock className="h-3 w-3" /> 1 hour ago
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
