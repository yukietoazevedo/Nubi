import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Sparkles, Sliders, Shield, Monitor } from "lucide-react";
import { toast } from "sonner";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [temperature, setTemperature] = useState(0.7);
  const [autoScroll, setAutoScroll] = useState(true);

  const handleSave = () => {
    toast.success("Configurações salvas!");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-[#0D1C33] border-[#182F52] text-slate-100 p-6 rounded-2xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-blue-400" />
            <span>Configurações do Orion</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* General Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              Interface & Preferências
            </h4>
            
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#07111F] border border-[#142A4A]">
              <div className="flex items-center gap-3">
                <Monitor className="w-4 h-4 text-slate-400" />
                <div>
                  <div className="text-xs font-medium text-slate-200">Rolagem automática</div>
                  <div className="text-[11px] text-slate-400">Rolar automaticamente para novas mensagens</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={autoScroll}
                onChange={(e) => setAutoScroll(e.target.checked)}
                className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Model Controls */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              Parâmetros do Modelo (Demo)
            </h4>

            <div className="p-3 rounded-xl bg-[#07111F] border border-[#142A4A] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Temperatura (Criatividade)</span>
                <span className="font-mono text-blue-400">{temperature}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#142A4A] rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0.0 (Preciso)</span>
                <span>1.0 (Criativo)</span>
              </div>
            </div>
          </div>

          {/* Privacy badge */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-950/40 border border-blue-900/30 text-blue-300 text-xs">
            <Shield className="w-4 h-4 shrink-0 text-blue-400" />
            <span>Suas conversas estão protegidas e armazenadas exclusivamente de forma local.</span>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-[#142948]">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="bg-transparent border-[#182F52] text-slate-300 hover:bg-[#12243E]"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-md shadow-blue-950/60"
          >
            Salvar Alterações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
