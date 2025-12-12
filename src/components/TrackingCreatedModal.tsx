import React from 'react';
import { CheckCircle, Copy, X, ExternalLink, MessageSquare, Sparkles } from 'lucide-react';

interface TrackingCreatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  inviteLink: string;
  personName: string;
  linkCopied: boolean;
  onCopyLink: () => void;
}

export const TrackingCreatedModal: React.FC<TrackingCreatedModalProps> = ({
  isOpen,
  onClose,
  inviteLink,
  personName,
  linkCopied,
  onCopyLink,
}) => {
  if (!isOpen) return null;

  const shareWhatsApp = () => {
    const message = encodeURIComponent(
      `🛡️ *VigiaLink - Sistema de Rastreamento GPS*\n\n` +
      `Olá ${personName}!\n\n` +
      `Você foi adicionado(a) ao meu sistema de proteção VigiaLink.\n\n` +
      `🌍 Funciona em qualquer lugar do mundo\n` +
      `📍 Rastreamento GPS em tempo real\n` +
      `🔒 100% Seguro e Privado\n\n` +
      `Para ativar, clique no link abaixo e aceite o convite:\n` +
      `${inviteLink}\n\n` +
      `O GPS será ativado automaticamente após sua aceitação.`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[100] animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform animate-in zoom-in-95 duration-300">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-t-2xl">
            <div className="flex justify-center mb-4">
              <div className="bg-green-500 rounded-full p-4 shadow-lg animate-bounce">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
              🎉 Rastreamento Criado!
            </h2>

            <p className="text-center text-gray-700 text-sm">
              Sistema GPS configurado para <span className="font-bold text-blue-600">{personName}</span>
            </p>
          </div>

          <div className="p-6 space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border-2 border-blue-200">
              <div className="flex items-start space-x-3 mb-3">
                <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">
                    Como funciona:
                  </h3>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>✅ Envie o link para {personName}</li>
                    <li>✅ Pessoa aceita o convite</li>
                    <li>✅ GPS ativa automaticamente</li>
                    <li>✅ Rastreamento 24/7 em tempo real</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <label className="block text-xs font-semibold text-gray-600 mb-2">
                Link de Ativação GPS:
              </label>
              <div className="bg-white border-2 border-dashed border-blue-300 rounded-lg p-3 break-all text-sm text-gray-700 font-mono">
                {inviteLink}
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={onCopyLink}
                className={`w-full py-3 px-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg transform hover:scale-105 ${
                  linkCopied
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                }`}
              >
                {linkCopied ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Link Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    <span>Copiar Link</span>
                  </>
                )}
              </button>

              <button
                onClick={shareWhatsApp}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg transform hover:scale-105"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Enviar via WhatsApp</span>
              </button>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-xs text-yellow-800 text-center">
                <span className="font-bold">🌍 Funciona globalmente!</span> O GPS será ativado assim que {personName} aceitar o convite.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
