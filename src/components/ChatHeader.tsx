import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Menu,
  MoreVertical,
  Share2,
  Trash2,
  Settings,
  Info,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

interface ChatHeaderProps {
  conversationTitle?: string;
  modelName?: string;
  onOpenMobileSidebar: () => void;
  onClearChat?: () => void;
  onOpenSettings: () => void;
  onOpenAbout: () => void;
  hasMessages?: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  conversationTitle,
  modelName = "Orion 3.5 Turbo",
  onOpenMobileSidebar,
  onClearChat,
  onOpenSettings,
  onOpenAbout,
  hasMessages = false,
}) => {
  const handleExport = () => {
    toast.success("Link da conversa copiado para a área de transferência!");
  };

  return (
    <header className="h-14 min-h-[56px] px-4 bg-[#07111F]/80 backdrop-blur-md border-b border-[#132744] flex items-center justify-between z-30 select-none">
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Toggle Button */}
        <button
          onClick={onOpenMobileSidebar}
          aria-label="Abrir histórico de conversas"
          className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-[#0F223D] transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* AI Branding & Title */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white tracking-tight flex items-center gap-1.5">
              ORION
            </span>
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline-block">
              • {conversationTitle ? conversationTitle : modelName}
            </span>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-[11px] font-medium text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="hidden xs:inline">IA pronta para ajudar</span>
          </div>
        </div>
      </div>

      {/* Discrete Top Right Options Menu */}
      <div className="flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              aria-label="Opções do chat"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-[#0F223D] transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500/50"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 bg-[#0D1C33] border-[#182F52] text-slate-200 p-1.5 shadow-2xl rounded-xl"
          >
            {hasMessages && (
              <>
                <DropdownMenuItem
                  onClick={handleExport}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-[#142948] rounded-lg cursor-pointer transition-colors"
                >
                  <Share2 className="w-4 h-4 text-slate-400" />
                  <span>Compartilhar conversa</span>
                </DropdownMenuItem>

                {onClearChat && (
                  <DropdownMenuItem
                    onClick={onClearChat}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Limpar mensagens</span>
                  </DropdownMenuItem>
                )}

                <DropdownMenuSeparator className="bg-[#142948] my-1" />
              </>
            )}

            <DropdownMenuItem
              onClick={onOpenSettings}
              className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-[#142948] rounded-lg cursor-pointer transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Configurações</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={onOpenAbout}
              className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-[#142948] rounded-lg cursor-pointer transition-colors"
            >
              <Info className="w-4 h-4 text-slate-400" />
              <span>Sobre o Orion</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
