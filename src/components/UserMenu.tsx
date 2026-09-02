import React from "react";
import { UserProfile } from "../types/chat";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Settings, Sparkles, LogOut, RefreshCw, ChevronUp } from "lucide-react";

interface UserMenuProps {
  user: UserProfile;
  onOpenSettings: () => void;
  onResetData: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  user,
  onOpenSettings,
  onResetData,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="w-full flex items-center justify-between p-2 rounded-xl bg-[#081324] hover:bg-[#0F223D] border border-[#132744] text-left transition-all duration-200 group focus:outline-none focus:ring-1 focus:ring-blue-500/50"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-500 flex items-center justify-center text-white text-xs font-semibold shadow-md ring-1 ring-blue-400/20">
                {user.avatarText}
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#0A1628] rounded-full" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-slate-200 truncate group-hover:text-white transition-colors">
                {user.name}
              </div>
              <div className="text-[11px] text-slate-400 truncate">
                {user.plan}
              </div>
            </div>
          </div>

          <ChevronUp className="w-4 h-4 text-slate-400 group-hover:text-slate-200 transition-colors" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        side="top"
        className="w-56 mb-2 bg-[#0D1C33] border-[#182F52] text-slate-200 p-1.5 shadow-2xl rounded-xl"
      >
        <div className="px-3 py-2 border-b border-[#142948] mb-1">
          <p className="text-xs font-medium text-slate-200">{user.name}</p>
          <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
        </div>

        <DropdownMenuItem
          onClick={onOpenSettings}
          className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-[#142948] rounded-lg cursor-pointer transition-colors"
        >
          <Settings className="w-4 h-4 text-slate-400" />
          <span>Configurações</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onResetData}
          className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-[#142948] rounded-lg cursor-pointer transition-colors"
        >
          <RefreshCw className="w-4 h-4 text-slate-400" />
          <span>Restaurar dados demo</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-[#142948] my-1" />

        <div className="px-3 py-1.5 flex items-center justify-between text-[11px] text-blue-400 font-medium">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Orion v3.5
          </span>
          <span className="bg-blue-900/60 text-blue-300 px-1.5 py-0.5 rounded text-[10px]">
            Demo
          </span>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
