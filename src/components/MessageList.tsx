import React, { useEffect, useRef } from "react";
import { Message } from "../types/chat";
import { MessageBubble } from "./MessageBubble";

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
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
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

      {/* Discrete Thinking indicator */}
      {isLoading && (
        <div className="flex gap-3 max-w-2xl w-full mx-auto px-2 sm:px-4 justify-start items-center text-xs text-slate-500">
          <div className="w-6 h-6 rounded bg-[#0A1424] text-slate-400 font-semibold flex items-center justify-center shrink-0 text-[11px] border border-[#0F1C30]">
            N
          </div>
          <div className="flex items-center gap-1">
            <span>Pensando</span>
            <span className="thinking-dot-1">.</span>
            <span className="thinking-dot-2">.</span>
            <span className="thinking-dot-3">.</span>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};
