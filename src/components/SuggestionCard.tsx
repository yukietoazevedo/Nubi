import React from "react";
import { PromptSuggestion } from "../types/chat";

interface SuggestionCardProps {
  suggestion: PromptSuggestion;
  onClick: (prompt: string) => void;
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({
  suggestion,
  onClick,
}) => {
  return (
    <button
      onClick={() => onClick(suggestion.prompt)}
      className="
        text-left px-4 py-3 rounded-lg bg-[#091322] hover:bg-[#0E1E36]
        border border-[#0E1C30] hover:border-[#162D4A]
        transition-colors duration-150 flex flex-col justify-center
        focus:outline-none cursor-pointer
      "
    >
      <span className="text-xs font-medium text-slate-200">
        {suggestion.title}
      </span>
      <span className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
        {suggestion.subtitle}
      </span>
    </button>
  );
};
