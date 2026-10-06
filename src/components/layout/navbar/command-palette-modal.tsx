import { Search, X, ArrowRight } from "lucide-react";

export interface CommandItem {
  name: string;
  category: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface CommandPaletteModalProps {
  open: boolean;
  search: string;
  filteredCommands: CommandItem[];
  inputRef: React.RefObject<HTMLInputElement | null>;
  onSearchChange: (value: string) => void;
  onClose: () => void;
  onSelect: (href: string) => void;
}

export function CommandPaletteModal({
  open,
  search,
  filteredCommands,
  inputRef,
  onSearchChange,
  onClose,
  onSelect,
}: CommandPaletteModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-3 pt-4 sm:px-4 sm:pt-20">
      <div
        className="animate-in fade-in fixed inset-0 bg-slate-900/50 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      <div className="animate-in zoom-in-95 relative flex max-h-[85vh] w-full max-w-xl flex-col rounded-2xl border border-slate-200/90 bg-white/95 p-2.5 shadow-2xl ring-1 ring-black/5 backdrop-blur-2xl duration-150 sm:rounded-3xl sm:p-3">
        <div className="relative flex shrink-0 items-center border-b border-slate-100 px-3 pt-1.5 pb-3 sm:px-4">
          <Search className="mr-2.5 h-4.5 w-4.5 shrink-0 text-indigo-600 sm:h-5 sm:w-5" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Type a command or search modules..."
            className="w-full bg-transparent text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none sm:text-base"
          />
          <button
            onClick={onClose}
            className="shrink-0 rounded-xl p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 scrollbar-thin scrollbar-thumb-slate-200 space-y-1 overflow-y-auto p-1.5 sm:p-2">
          {filteredCommands.length > 0 ? (
            <div>
              {filteredCommands.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.href}
                    onClick={() => onSelect(item.href)}
                    className="group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs transition-all hover:bg-indigo-50/80 hover:text-indigo-950 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 shadow-2xs transition-colors group-hover:bg-white group-hover:text-indigo-600 sm:h-9 sm:w-9">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="truncate font-bold text-slate-900 group-hover:text-indigo-950">
                            {item.name}
                          </p>
                          <span className="hidden rounded-md border border-slate-200/80 bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 group-hover:border-indigo-200 group-hover:bg-indigo-100/80 group-hover:text-indigo-800 sm:inline-block">
                            {item.category}
                          </span>
                        </div>
                        <p className="mt-0.5 truncate text-[11px] text-slate-500 group-hover:text-slate-700 sm:text-xs">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="ml-2 h-4 w-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-indigo-600" />
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="py-10 text-center text-xs font-medium text-slate-500 sm:text-sm">
              No matching module found for &quot;{search}&quot;
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center justify-between border-t border-slate-100 px-3 py-2.5 text-[11px] font-semibold text-slate-400 sm:px-4 sm:text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-slate-200 bg-slate-50 px-1 py-0.5 text-[10px]">
                ↵
              </kbd>{" "}
              select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-slate-200 bg-slate-50 px-1 py-0.5 text-[10px]">
                esc
              </kbd>{" "}
              close
            </span>
          </div>
          <span className="font-bold text-indigo-600">WebXode OS</span>
        </div>
      </div>
    </div>
  );
}
