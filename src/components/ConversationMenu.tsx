import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreHorizontal, Edit2, Trash2 } from "lucide-react";

interface ConversationMenuProps {
  onRename: () => void;
  onDelete: () => void;
}

export const ConversationMenu: React.FC<ConversationMenuProps> = ({
  onRename,
  onDelete,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Opções da conversa"
          className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-1 rounded-md text-slate-400 hover:text-slate-100 hover:bg-[#1A345C] transition-all duration-150"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-40 bg-[#0D1C33] border-[#182F52] text-slate-200 p-1 shadow-xl rounded-lg"
      >
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onRename();
          }}
          className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-[#142948] rounded-md cursor-pointer transition-colors"
        >
          <Edit2 className="w-3.5 h-3.5 text-slate-400" />
          <span>Renomear</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-md cursor-pointer transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Excluir</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
