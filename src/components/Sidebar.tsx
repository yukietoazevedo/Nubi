import React, { useState } from "react";
import { Conversation, UserProfile } from "../types/chat";
import { ConversationMenu } from "./ConversationMenu";
import { UserMenu } from "./UserMenu";
import { RenameModal } from "./RenameModal";
import { DeleteDialog } from "./DeleteDialog";
import { Plus, MessageSquare, Sparkles, X } from "lucide-react";
import { Button } from "./ui/button";

interface SidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onRenameConversation: (id: string, newTitle: string) => void;
  onDeleteConversation: (id: string) => void;
  onOpenSettings: () => void;
  onResetData: () => void;
  user: UserProfile;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  activeId,
  onSelectConversation,
  onNewConversation,
  onRenameConversation,
  onDeleteConversation,
  onOpenSettings,
  onResetData,
  user,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const [renamingConv, setRenamingConv] = useState<Conversation | null>(null);
  const [deletingConv, setDeletingConv] = useState<Conversation | null>(null);

  const handleRenameConfirm = (newTitle: string) => {
    if (renamingConv) {
      onRenameConversation(renamingConv.id, newTitle);
      setRenamingConv(null);
    }
  };

  const handleDeleteConfirm = () => {
    if (deletingConv) {
      onDeleteConversation(deletingConv.id);
      setDeletingConv(null);
    }
  };

  return (
    <>
      <aside
        className={`
          flex flex-col h-full w-[270px] bg-[#0A1628] border-r border-[#132744] select-none
          shrink-0 z-40 transition-all duration-300 ease-in-out
          ${
            isMobileOpen
              ? "fixed inset-y-0 left-0 shadow-2xl translate-x-0"
              : "hidden lg:flex"
          }
        `}
      >
        {/* Top Header / Logo */}
        <div className="flex items-center justify-between p-4 pb-3 border-b border-[#11233E]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-md ring-1 ring-blue-400/30">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-white font-sans flex items-center gap-1.5">
                ORION
                <span className="text-[10px] uppercase font-semibold tracking-wider text-blue-400 bg-blue-950/80 px-1.5 py-0.5 rounded border border-blue-800/40">
                  AI
                </span>
              </span>
            </div>
          </div>

          {/* Close button for mobile */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#132744] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Primary Action: + Nova conversa */}
        <div className="p-3">
          <Button
            onClick={() => {
              onNewConversation();
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full h-11 justify-start gap-3 bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 rounded-xl shadow-lg shadow-blue-950/50 transition-all duration-200 group active:scale-[0.98]"
          >
            <div className="w-5 h-5 rounded-md bg-blue-500/50 flex items-center justify-center group-hover:bg-blue-400/60 transition-colors">
              <Plus className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm tracking-wide">Nova conversa</span>
          </Button>
        </div>

        {/* Conversations List Section */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          <div className="px-2 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Conversas recentes</span>
            <span className="text-[10px] bg-[#12243E] text-slate-400 px-1.5 py-0.5 rounded-full font-mono">
              {conversations.length}
            </span>
          </div>

          {conversations.length === 0 ? (
            <div className="py-8 text-center px-4">
              <MessageSquare className="w-6 h-6 mx-auto text-slate-600 mb-2 opacity-60" />
              <p className="text-xs text-slate-400 font-medium">Nenhuma conversa</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Clique em "+ Nova conversa" para iniciar.
              </p>
            </div>
          ) : (
            conversations.map((conv) => {
              const isActive = conv.id === activeId;
              return (
                <div
                  key={conv.id}
                  onClick={() => {
                    onSelectConversation(conv.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`
                    group relative flex items-center justify-between p-2.5 rounded-xl cursor-pointer text-xs
                    transition-all duration-150 border
                    ${
                      isActive
                        ? "bg-[#142A4A] border-blue-500/40 text-white font-medium shadow-sm"
                        : "bg-transparent border-transparent text-slate-300 hover:bg-[#0F223D] hover:text-slate-100 hover:border-[#162D4D]"
                    }
                  `}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <MessageSquare
                      className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                        isActive
                          ? "text-blue-400"
                          : "text-slate-400 group-hover:text-slate-300"
                      }`}
                    />
                    <span className="truncate text-xs leading-relaxed">
                      {conv.title}
                    </span>
                  </div>

                  <ConversationMenu
                    onRename={() => setRenamingConv(conv)}
                    onDelete={() => setDeletingConv(conv)}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* User Profile Footer */}
        <div className="p-3 border-t border-[#11233E]">
          <UserMenu
            user={user}
            onOpenSettings={onOpenSettings}
            onResetData={onResetData}
          />
        </div>
      </aside>

      {/* Modals for renaming & deleting */}
      {renamingConv && (
        <RenameModal
          isOpen={!!renamingConv}
          onClose={() => setRenamingConv(null)}
          currentTitle={renamingConv.title}
          onRename={handleRenameConfirm}
        />
      )}

      {deletingConv && (
        <DeleteDialog
          isOpen={!!deletingConv}
          onClose={() => setDeletingConv(null)}
          title={deletingConv.title}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </>
  );
};
