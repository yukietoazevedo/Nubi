import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#0D1C33] border-[#182F52] text-slate-100 p-6 rounded-2xl shadow-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg ring-1 ring-blue-400/40">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-white tracking-tight">
                ORION AI
              </DialogTitle>
              <p className="text-xs text-blue-400 font-medium">Plataforma de IA Generativa</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-2 text-xs text-slate-300 leading-relaxed">
          <p>
            O <strong className="text-white">ORION</strong> é uma plataforma moderna e intuitiva projetada para fornecer uma experiência de conversação natural, sofisticada e altamente produtiva.
          </p>

          <div className="space-y-2.5 pt-1">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Interface minimalista em azul escuro (#07111F) focada na leitura e conforto visual.</span>
            </div>

            <div className="flex items-start gap-2.5">
              <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Demonstração de experiência de produto 100% interativa e responsiva.</span>
            </div>

            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>Sem dependência de APIs externas ou armazenamento remoto nesta versão de frontend.</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-[#142948]">
          <Button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium px-5"
          >
            Entendido
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
