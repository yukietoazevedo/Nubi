import React, { useState, useRef, useEffect } from "react";
import { Attachment } from "../types/chat";
import {
  Send,
  Paperclip,
  Mic,
  MicOff,
  X,
  FileText,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "sonner";

interface ChatInputProps {
  onSendMessage: (text: string, attachments?: Attachment[]) => void;
  isLoading?: boolean;
  selectedModel: string;
  onSelectModel: (model: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading = false,
  selectedModel,
  onSelectModel,
}) => {
  const [text, setText] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        180
      )}px`;
    }
  }, [text]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if ((!text.trim() && attachments.length === 0) || isLoading) return;

    onSendMessage(text, attachments.length > 0 ? attachments : undefined);
    setText("");
    setAttachments([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleAttachFile = () => {
    // Simulate attaching a file
    const sampleFiles: Attachment[] = [
      { id: Date.now().toString(), name: "análise_projeto.pdf", size: "2.4 MB", type: "file" },
      { id: Date.now().toString() + "2", name: "wireframe_screen.png", size: "1.1 MB", type: "image" },
    ];
    const newAtt = sampleFiles[attachments.length % 2];
    setAttachments((prev) => [...prev, newAtt]);
    toast.success(`Arquivo "${newAtt.name}" anexado!`);
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setText((prev) => prev + " [Transcrição de áudio simulada]");
      toast.success("Áudio gravado e transcrito!");
    } else {
      setIsRecording(true);
      toast.info("Escutando... Fale agora. Clique novamente para parar.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 pb-4 pt-2">
      <form
        onSubmit={handleSubmit}
        className={`
          relative flex flex-col bg-[#09172B] border rounded-2xl p-2.5 sm:p-3.5
          shadow-xl transition-all duration-200
          ${
            isLoading
              ? "opacity-80 border-[#142A4A]"
              : "border-[#152E52] focus-within:border-blue-500/60 focus-within:ring-1 focus-within:ring-blue-500/30"
          }
        `}
      >
        {/* Model Tag Pill & Aux Info */}
        <div className="flex items-center justify-between mb-2 px-1 text-xs">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0F2342] hover:bg-[#152E52] border border-[#1A3761] text-blue-300 font-medium text-[11px] transition-colors focus:outline-none"
              >
                <Sparkles className="w-3 h-3 text-blue-400" />
                <span>{selectedModel}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-48 bg-[#0D1C33] border-[#182F52] text-slate-200 p-1 rounded-xl shadow-2xl"
            >
              {["Orion 3.5 Turbo", "Orion Pro", "Orion Ultra", "Orion Code"].map(
                (model) => (
                  <DropdownMenuItem
                    key={model}
                    onClick={() => onSelectModel(model)}
                    className="flex items-center justify-between px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-[#142948] rounded-lg cursor-pointer"
                  >
                    <span>{model}</span>
                    {selectedModel === model && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    )}
                  </DropdownMenuItem>
                )
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {isRecording && (
            <div className="flex items-center gap-1.5 text-xs text-red-400 font-medium animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>Gravando áudio...</span>
            </div>
          )}
        </div>

        {/* Attachments Chips */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2 px-1">
            {attachments.map((att) => (
              <div
                key={att.id}
                className="flex items-center gap-2 bg-[#0F2445] border border-[#1B3A69] px-2.5 py-1 rounded-lg text-xs text-slate-200"
              >
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span className="max-w-[140px] truncate">{att.name}</span>
                <button
                  type="button"
                  onClick={() => removeAttachment(att.id)}
                  className="text-slate-400 hover:text-white ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Text Area */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder="Envie uma mensagem..."
          rows={1}
          className="
            w-full bg-transparent text-slate-100 placeholder:text-slate-500
            text-xs sm:text-sm resize-none focus:outline-none px-1 py-1
            max-h-44 leading-relaxed font-sans
          "
        />

        {/* Bottom Actions Bar inside composer */}
        <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#0F223D]/80">
          <div className="flex items-center gap-1">
            {/* Attach File Button */}
            <button
              type="button"
              onClick={handleAttachFile}
              disabled={isLoading}
              title="Anexar arquivo"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-[#0E213D] transition-colors focus:outline-none"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            {/* Voice Recording Button */}
            <button
              type="button"
              onClick={toggleRecording}
              disabled={isLoading}
              title={isRecording ? "Parar gravação" : "Usar microfone"}
              className={`p-2 rounded-xl transition-colors focus:outline-none ${
                isRecording
                  ? "bg-red-950/80 text-red-400 border border-red-800/40"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#0E213D]"
              }`}
            >
              {isRecording ? (
                <MicOff className="w-4 h-4" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={(!text.trim() && attachments.length === 0) || isLoading}
            aria-label="Enviar mensagem"
            className={`
              p-2.5 rounded-xl flex items-center justify-center transition-all duration-200
              ${
                (text.trim() || attachments.length > 0) && !isLoading
                  ? "bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-950/60 active:scale-95"
                  : "bg-[#0E203B] text-slate-600 cursor-not-allowed border border-[#142A4A]"
              }
            `}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>

      <p className="text-[10px] text-center text-slate-500 mt-2">
        O Orion pode cometer erros. Considere verificar informações importantes.
      </p>
    </div>
  );
};
