import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ShieldCheck, User, Settings, LogOut } from "lucide-react";

interface ProfileMenuProps {
  show: boolean;
  userName: string;
  userEmail: string;
  userRoleDisplay: string;
  avatarConfig: { imageUrl: string; bgClass: string };
  onToggle: () => void;
  onClose: () => void;
  onLogout: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function ProfileMenu({
  show,
  userName,
  userEmail,
  userRoleDisplay,
  avatarConfig,
  onToggle,
  onClose,
  onLogout,
  containerRef,
}: ProfileMenuProps) {
  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={onToggle}
        className="flex items-center gap-2 rounded-xl p-1 transition-colors hover:bg-slate-100/80 sm:gap-2.5"
        title="User menu"
      >
        <div
          className={`relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl sm:h-10 sm:w-10 ${avatarConfig.bgClass} border border-slate-200/60 shadow-xs`}
        >
          <Image
            src={avatarConfig.imageUrl}
            alt={userName}
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </div>
        {/* User details shown on Desktop (lg+), hidden on Tablet & Mobile (< lg) */}
        <div className="hidden min-w-0 text-left lg:block">
          <p className="truncate text-xs leading-tight font-bold text-slate-900 sm:text-sm">
            {userName}
          </p>
          <p className="truncate text-[11px] font-semibold text-slate-500 sm:text-xs">
            {userRoleDisplay}
          </p>
        </div>
        <ChevronDown className="hidden h-4 w-4 shrink-0 text-slate-400 lg:block" />
      </button>

      {show && (
        <div className="animate-in fade-in absolute right-0 z-50 mt-2.5 w-64 max-w-[calc(100vw-1.5rem)] rounded-2xl border border-slate-200/80 bg-white/95 p-2 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl duration-150 sm:w-72">
          <div className="flex items-center gap-3 border-b border-slate-100 px-3 py-3">
            <div
              className={`relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl ${avatarConfig.bgClass} border border-slate-200/60 shadow-xs`}
            >
              <Image
                src={avatarConfig.imageUrl}
                alt={userName}
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-slate-900 sm:text-sm">{userName}</p>
              <p className="truncate text-[11px] font-medium text-slate-500">{userEmail}</p>
              <div className="mt-1 inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 sm:text-xs">
                <ShieldCheck className="h-3 w-3" /> {userRoleDisplay}
              </div>
            </div>
          </div>

          <div className="space-y-1 py-1.5">
            <Link
              href={"/dashboard/profile" as any}
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 sm:text-sm"
            >
              <User className="h-4 w-4 text-slate-400" />
              <span>My Profile</span>
            </Link>
            <Link
              href={"/dashboard/settings" as any}
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 sm:text-sm"
            >
              <Settings className="h-4 w-4 text-slate-400" />
              <span>Workspace Settings</span>
            </Link>
          </div>

          <div className="border-t border-slate-100 pt-1.5">
            <button
              onClick={onLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold text-rose-600 transition-colors hover:bg-rose-50 sm:text-sm"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
