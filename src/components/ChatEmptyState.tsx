import React from "react";
import { PROMPT_SUGGESTIONS } from "../mock/initialData";
import { SuggestionCard } from "./SuggestionCard";
import { Sparkles, Shield, Cpu, Zap } from "lucide-react";

interface ChatEmptyStateProps {
  onSelectPrompt: (promptText: string) => void;
}

export const ChatEmptyState: React.FC<ChatEmptyStateProps> = ({
  onSelectPrompt,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 max-w-4xl mx-auto w-full text-center overflow-y-auto">
      {/* Central Hero Logo / Badge */}
      <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0E203B] border border-[#1A3863] shadow-inner text-blue-400 text-xs font-medium animate-pulse">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Modelo Orion 3.5 Turbo Ativo</span>
      </div>

      {/* Main Title */}
      <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3">
        Como posso ajudar?
      </h1>

      {/* Subtext */}
      <p className="text-xs sm:text-sm text-slate-400 max-w-lg mb-8 sm:mb-10 leading-relaxed">
        Converse com sua IA, explore ideias, tire dúvidas ou desenvolva projetos com respostas instantâneas e contextualizadas.
      </p>

      {/* Suggestions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 w-full mb-8">
        {PROMPT_SUGGESTIONS.map((suggestion) => (
          <SuggestionCard
            key={suggestion.id}
            suggestion={suggestion}
            onClick={onSelectPrompt}
          />
        ))}
      </div>

      {/* Feature Badges Footer */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-slate-400 border-t border-[#102442] pt-6 w-full max-w-xl">
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-blue-400" />
          <span>Respostas ultra rápidas</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-indigo-400" />
          <span>Privacidade garantida</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-emerald-400" />
          <span>Processamento avançado</span>
        </div>
      </div>
    </div>
  );
};
