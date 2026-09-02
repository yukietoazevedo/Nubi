import React from "react";
import { PromptSuggestion } from "../types/chat";
import { Lightbulb, Compass, Code, PenTool, ArrowUpRight } from "lucide-react";

interface SuggestionCardProps {
  suggestion: PromptSuggestion;
  onClick: (prompt: string) => void;
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({
  suggestion,
  onClick,
}) => {
  const getIcon = () => {
    switch (suggestion.iconName) {
      case "lightbulb":
        return <Lightbulb className="w-4 h-4 text-amber-400" />;
      case "compass":
        return <Compass className="w-4 h-4 text-cyan-400" />;
      case "code":
        return <Code className="w-4 h-4 text-blue-400" />;
      case "pen":
        return <PenTool className="w-4 h-4 text-emerald-400" />;
      default:
        return <Lightbulb className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <button
      onClick={() => onClick(suggestion.prompt)}
      className="
        group relative text-left p-4 rounded-2xl bg-[#09172B] hover:bg-[#0F2342]
        border border-[#142A4A] hover:border-blue-500/50
        transition-all duration-200 ease-out flex flex-col justify-between
        h-32 shadow-lg hover:shadow-blue-950/20 active:scale-[0.99] focus:outline-none focus:ring-1 focus:ring-blue-500/50
      "
    >
      <div className="flex items-center justify-between w-full mb-2">
        <div className="p-2 rounded-xl bg-[#0F223D] border border-[#18335C] group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-colors">
          {getIcon()}
        </div>
        <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
      </div>

      <div>
        <h3 className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
          {suggestion.title}
        </h3>
        <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5 group-hover:text-slate-300 transition-colors">
          {suggestion.subtitle}
        </p>
      </div>
    </button>
  );
};
