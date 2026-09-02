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

const STORAGE_KEY = "orion_conversations_v1";

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
    return conversations.length > 0 ? conversations[0].id : null;
  });

  const [user] = useState<UserProfile>(INITIAL_USER);
  const [selectedModel, setSelectedModel] = useState<string>("Orion 3.5 Turbo");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);

  // Save to localStorage whenever conversations update
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    } catch (err) {
      console.error("Error saving to localStorage:", err);
    }
  }, [conversations]);

  const activeConversation = conversations.find((c) => c.id === activeId);

  // Handler: New Conversation
  const handleNewConversation = () => {
    setActiveId(null);
    toast.info("Nova conversa iniciada");
  };

  // Handler: Select Conversation
  const handleSelectConversation = (id: string) => {
    setActiveId(id);
  };

  // Handler: Rename Conversation
  const handleRenameConversation = (id: string, newTitle: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title: newTitle } : c))
    );
    toast.success("Conversa renomeada!");
  };

  // Handler: Delete Conversation
  const handleDeleteConversation = (id: string) => {
    setConversations((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      if (activeId === id) {
        setActiveId(filtered.length > 0 ? filtered[0].id : null);
      }
      return filtered;
    });
    toast.success("Conversa excluída");
  };

  // Handler: Reset Data
  const handleResetData = () => {
    setConversations(INITIAL_CONVERSATIONS);
    setActiveId(INITIAL_CONVERSATIONS[0].id);
    localStorage.removeItem(STORAGE_KEY);
    toast.success("Dados de demonstração restaurados com sucesso!");
  };

  // Handler: Clear current chat messages
  const handleClearCurrentChat = () => {
    if (!activeId) return;
    setConversations((prev) =>
      prev.map((c) => (c.id === activeId ? { ...c, messages: [] } : c))
    );
    toast.success("Mensagens do chat limpas.");
  };

  // Helper: Trigger simulated AI response
  const triggerAiResponse = (targetConvId: string) => {
    setIsLoading(true);

    setTimeout(() => {
      // Pick random or contextual response
      const randomResponse =
        MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];

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
    }, 1200);
  };

  // Handler: Send Message
  const handleSendMessage = (text: string, attachments?: Attachment[]) => {
    const timeNow = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMsg: Message = {
      id: "msg-" + Date.now(),
      role: "user",
      content: text || (attachments?.length ? "Encaminho os arquivos anexados para análise." : ""),
      createdAt: timeNow,
      attachments,
    };

    if (activeId && activeConversation) {
      // Append to existing active conversation
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeId ? { ...c, messages: [...c.messages, userMsg] } : c
        )
      );
      triggerAiResponse(activeId);
    } else {
      // Create new conversation
      const rawTitle = text || attachments?.[0]?.name || "Nova conversa";
      const title = rawTitle.length > 32 ? rawTitle.slice(0, 32) + "..." : rawTitle;
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

  // Handler: Select Prompt from Empty State
  const handleSelectPrompt = (promptText: string) => {
    handleSendMessage(promptText);
  };

  // Handler: Regenerate AI Response
  const handleRegenerateResponse = () => {
    if (!activeId || !activeConversation || activeConversation.messages.length === 0)
      return;
    triggerAiResponse(activeId);
  };

  return (
    <div className="flex h-screen w-screen bg-[#07111F] text-slate-100 overflow-hidden font-sans antialiased">
      {/* Toast Notifications */}
      <Toaster position="top-right" theme="dark" />

      {/* Backdrop for mobile drawer */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 lg:hidden transition-opacity"
        />
      )}

      {/* Left Sidebar */}
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

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-full min-w-0 bg-[#07111F] relative">
        {/* Header */}
        <ChatHeader
          conversationTitle={activeConversation?.title}
          modelName={selectedModel}
          onOpenMobileSidebar={() => setIsMobileOpen(true)}
          onClearChat={handleClearCurrentChat}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenAbout={() => setIsAboutOpen(true)}
          hasMessages={!!activeConversation && activeConversation.messages.length > 0}
        />

        {/* Chat Content Body */}
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

        {/* Footer Composer Input */}
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          selectedModel={selectedModel}
          onSelectModel={setSelectedModel}
        />
      </main>

      {/* Modals */}
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
