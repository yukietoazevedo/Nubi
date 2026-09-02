import React, { useState } from "react";
import { Message } from "../types/chat";
import { Sparkles, Copy, Check, ThumbsUp, ThumbsDown, RefreshCw, FileText, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface MessageBubbleProps {
  message: Message;
  onRegenerate?: () => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  onRegenerate,
}) => {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    toast.success("Mensagem copiada!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFeedback = (type: "up" | "down") => {
    if (feedback === type) {
      setFeedback(null);
    } else {
      setFeedback(type);
      toast.success(type === "up" ? "Feedback enviado: Útil!" : "Feedback enviado: Pode melhorar.");
    }
  };

  return (
    <div
      className={`
        flex gap-3 max-w-3xl w-full mx-auto my-3 px-2 sm:px-4 group
        ${isUser ? "justify-end" : "justify-start"}
      `}
    >
      {/* AI Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shrink-0 shadow-md ring-1 ring-blue-400/30 mt-0.5">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      )}

      {/* Message Box */}
      <div className={`flex flex-col max-w-[88%] sm:max-w-[82%] ${isUser ? "items-end" : "items-start"}`}>
        {/* Role & Time Badge */}
        <div className="flex items-center gap-2 mb-1 px-1 text-[11px] text-slate-400">
          <span className="font-semibold text-slate-300">
            {isUser ? "Você" : "ORION"}
          </span>
          <span>•</span>
          <span>{message.createdAt}</span>
        </div>

        {/* Message Content Bubble */}
        <div
          className={`
            p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed tracking-wide transition-all duration-200
            ${
              isUser
                ? "bg-[#142C4E] border border-[#1E4173] text-slate-100 rounded-tr-xs shadow-md"
                : "bg-[#09172B] border border-[#122847] text-slate-200 rounded-tl-xs shadow-lg"
            }
          `}
        >
          {/* Attachments if any */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3 pb-2.5 border-b border-[#1A345C]">
              {message.attachments.map((att) => (
                <div
                  key={att.id}
                  className="flex items-center gap-2 bg-[#0E203B] border border-[#1A3863] px-2.5 py-1.5 rounded-lg text-xs text-blue-300 font-medium"
                >
                  {att.type === "image" ? (
                    <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                  ) : (
                    <FileText className="w-3.5 h-3.5 text-blue-400" />
                  )}
                  <span>{att.name}</span>
                  <span className="text-[10px] text-slate-400">({att.size})</span>
                </div>
              ))}
            </div>
          )}

          {/* Formatted Text Content */}
          <div className="whitespace-pre-wrap break-words space-y-2">
            {message.content}
          </div>
        </div>

        {/* Assistant Action Bar (Copy, Thumbs Up, Thumbs Down, Retry) */}
        {!isUser && (
          <div className="flex items-center gap-1 mt-1.5 px-1 opacity-80 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleCopy}
              title="Copiar texto"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-[#0F2342] transition-colors"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>

            <button
              onClick={() => handleFeedback("up")}
              title="Resposta útil"
              className={`p-1.5 rounded-lg transition-colors ${
                feedback === "up"
                  ? "text-blue-400 bg-blue-950/60"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#0F2342]"
              }`}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => handleFeedback("down")}
              title="Resposta ruim"
              className={`p-1.5 rounded-lg transition-colors ${
                feedback === "down"
                  ? "text-red-400 bg-red-950/60"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#0F2342]"
              }`}
            >
              <ThumbsDown className="w-3.5 h-3.5" />
            </button>

            {onRegenerate && (
              <button
                onClick={onRegenerate}
                title="Regerar resposta"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-[#0F2342] transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* User Avatar Space Placeholder */}
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-500 flex items-center justify-center shrink-0 text-white text-xs font-semibold shadow-md ring-1 ring-blue-400/30 mt-0.5">
          Y
        </div>
      )}
    </div>
  );
};
