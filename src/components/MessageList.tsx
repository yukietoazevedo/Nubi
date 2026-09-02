import React, { useEffect, useRef } from "react";
import { Message } from "../types/chat";
import { MessageBubble } from "./MessageBubble";
import { Sparkles } from "lucide-react";

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
  onRegenerate?: () => void;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  isLoading = false,
  onRegenerate,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          onRegenerate={
            message.role === "assistant" && message === messages[messages.length - 1]
              ? onRegenerate
              : undefined
          }
        />
      ))}

      {/* Thinking / Loading State */}
      {isLoading && (
        <div className="flex gap-3 max-w-3xl w-full mx-auto my-3 px-2 sm:px-4 justify-start items-start animate-fade-in">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shrink-0 shadow-md ring-1 ring-blue-400/30">
            <Sparkles className="w-4 h-4 text-white animate-spin-slow" />
          </div>

          <div className="bg-[#09172B] border border-[#122847] text-slate-300 p-4 rounded-2xl rounded-tl-xs shadow-lg flex items-center gap-3">
            <span className="text-xs font-medium text-blue-400 tracking-wide">
              Pensando
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400 thinking-dot-1" />
              <span className="w-2 h-2 rounded-full bg-blue-400 thinking-dot-2" />
              <span className="w-2 h-2 rounded-full bg-blue-400 thinking-dot-3" />
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};
