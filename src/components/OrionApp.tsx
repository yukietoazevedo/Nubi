import React, { useState, useEffect } from "react";
import { Conversation, Message, Attachment, UserProfile } from "../types/chat";
import {
  INITIAL_CONVERSATIONS,
  INITIAL_USER,
  MOCK_RESPONSES,
} from "../mock/initialData";
import { Sidebar } from "./Sidebar";
import { ChatHeader } from "./ChatHeader";
import { ChatEmptyState } from "./ChatEmptyState";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { SettingsModal } from "./SettingsModal";
import { AboutModal } from "./AboutModal";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";

const STORAGE_KEY = "nubi_conversations_v2";

export const OrionApp: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.error("Error reading localStorage:", err);
    }
    return INITIAL_CONVERSATIONS;
  });

  const [activeId, setActiveId] = useState<string | null>(() => {
    return conversations.length > 0 ? conversations[0]!.id : null;
  });

  const [user] = useState<UserProfile>(INITIAL_USER);
  const [selectedModel, setSelectedModel] = useState<string>("Nubi 3.5");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    } catch (err) {
      console.error("Error saving to localStorage:", err);
    }
  }, [conversations]);

  const activeConversation = conversations.find((c) => c.id === activeId);

  const handleNewConversation = () => {
    setActiveId(null);
  };

  const handleSelectConversation = (id: string) => {
    setActiveId(id);
  };

  const handleRenameConversation = (id: string, newTitle: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title: newTitle } : c))
    );
    toast.success("Conversa renomeada");
  };

  const handleDeleteConversation = (id: string) => {
    setConversations((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      if (activeId === id) {
        setActiveId(filtered.length > 0 ? filtered[0]!.id : null);
      }
      return filtered;
    });
    toast.success("Conversa excluída");
  };

  const handleResetData = () => {
    setConversations(INITIAL_CONVERSATIONS);
    setActiveId(INITIAL_CONVERSATIONS[0]!.id);
    localStorage.removeItem(STORAGE_KEY);
    toast.success("Dados restaurados");
  };

  const handleClearCurrentChat = () => {
    if (!activeId) return;
    setConversations((prev) =>
      prev.map((c) => (c.id === activeId ? { ...c, messages: [] } : c))
    );
    toast.success("Chat limpo");
  };

  const triggerAiResponse = (targetConvId: string) => {
    setIsLoading(true);

    setTimeout(() => {
      const randomResponse =
        MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)]!;

      const aiMessage: Message = {
        id: "msg-" + Date.now(),
        role: "assistant",
        content: randomResponse,
        createdAt: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === targetConvId
            ? { ...c, messages: [...c.messages, aiMessage] }
            : c
        )
      );

      setIsLoading(false);
    }, 1000);
  };

  const handleSendMessage = (text: string, attachments?: Attachment[]) => {
    const timeNow = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMsg: Message = {
      id: "msg-" + Date.now(),
      role: "user",
      content: text || (attachments?.length ? "Anexo enviado" : ""),
      createdAt: timeNow,
      attachments,
    };

    if (activeId && activeConversation) {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeId ? { ...c, messages: [...c.messages, userMsg] } : c
        )
      );
      triggerAiResponse(activeId);
    } else {
      const rawTitle = text || attachments?.[0]?.name || "Nova conversa";
      const title = rawTitle.length > 28 ? rawTitle.slice(0, 28) + "..." : rawTitle;
      const newId = "conv-" + Date.now();

      const newConv: Conversation = {
        id: newId,
        title,
        createdAt: "Hoje, " + timeNow,
        model: selectedModel,
        messages: [userMsg],
      };

      setConversations((prev) => [newConv, ...prev]);
      setActiveId(newId);
      triggerAiResponse(newId);
    }
  };

  const handleSelectPrompt = (promptText: string) => {
    handleSendMessage(promptText);
  };

  const handleRegenerateResponse = () => {
    if (!activeId || !activeConversation || activeConversation.messages.length === 0)
      return;
    triggerAiResponse(activeId);
  };

  return (
    <div className="flex h-screen w-screen bg-[#050B14] text-slate-100 overflow-hidden font-sans antialiased">
      <Toaster position="top-right" theme="dark" />

      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 lg:hidden transition-opacity"
        />
      )}

      <Sidebar
        conversations={conversations}
        activeId={activeId}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
        onRenameConversation={handleRenameConversation}
        onDeleteConversation={handleDeleteConversation}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onResetData={handleResetData}
        user={user}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      <main className="flex-1 flex flex-col h-full min-w-0 bg-[#050B14] relative">
        <ChatHeader
          conversationTitle={activeConversation?.title}
          modelName={selectedModel}
          onOpenMobileSidebar={() => setIsMobileOpen(true)}
          onClearChat={handleClearCurrentChat}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenAbout={() => setIsAboutOpen(true)}
          hasMessages={!!activeConversation && activeConversation.messages.length > 0}
        />

        <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
          {!activeConversation || activeConversation.messages.length === 0 ? (
            <ChatEmptyState onSelectPrompt={handleSelectPrompt} />
          ) : (
            <MessageList
              messages={activeConversation.messages}
              isLoading={isLoading}
              onRegenerate={handleRegenerateResponse}
            />
          )}
        </div>

        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          selectedModel={selectedModel}
          onSelectModel={setSelectedModel}
        />
      </main>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
};
