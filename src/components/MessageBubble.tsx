import React, { useState } from "react";
import { Message } from "../types/chat";
import { Copy, Check, ThumbsUp, ThumbsDown, FileText } from "lucide-react";
import { toast } from "sonner";

interface MessageBubbleProps {
  message: Message;
  onRegenerate?: () => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
}) => {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    toast.success("Copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFeedback = (type: "up" | "down") => {
    setFeedback(feedback === type ? null : type);
  };

  return (
    <div
      className={`
        flex gap-3 max-w-2xl w-full mx-auto my-3 px-2 sm:px-4 group text-xs sm:text-sm
        ${isUser ? "justify-end" : "justify-start"}
      `}
    >
      {/* Nubi Icon */}
      {!isUser && (
        <div className="w-6 h-6 rounded bg-[#0A1424] text-slate-400 font-semibold flex items-center justify-center shrink-0 text-[11px] mt-0.5 border border-[#0F1C30]">
          N
        </div>
      )}

      <div className={`flex flex-col max-w-[85%] ${isUser ? "items-end" : "items-start"}`}>
        {/* Role & Time */}
        <div className="text-[11px] text-slate-500 mb-1 px-0.5">
          {isUser ? "Você" : "Nubi"}
        </div>

        {/* Message Bubble Body */}
        <div
          className={`
            p-3 rounded-lg leading-relaxed whitespace-pre-wrap break-words
            ${
              isUser
                ? "bg-[#0E1C30] text-slate-100"
                : "text-slate-200"
            }
          `}
        >
          {/* Attachments if any */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2 pb-2 border-b border-[#0F1C30]">
              {message.attachments.map((att) => (
                <div
                  key={att.id}
                  className="flex items-center gap-1.5 bg-[#091322] px-2 py-1 rounded text-xs text-slate-300"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>{att.name}</span>
                </div>
              ))}
            </div>
          )}

          {message.content}
        </div>

        {/* Nubi Actions */}
        {!isUser && (
          <div className="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleCopy}
              aria-label="Copiar"
              className="p-1 rounded text-slate-500 hover:text-slate-300 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => handleFeedback("up")}
              aria-label="Feedback positivo"
              className={`p-1 rounded transition-colors ${
                feedback === "up" ? "text-blue-400" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => handleFeedback("down")}
              aria-label="Feedback negativo"
              className={`p-1 rounded transition-colors ${
                feedback === "down" ? "text-red-400" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <ThumbsDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="w-6 h-6 rounded-full bg-[#0E1C30] text-slate-300 font-medium flex items-center justify-center shrink-0 text-[11px] mt-0.5">
          Y
        </div>
      )}
    </div>
  );
};
