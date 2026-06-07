import { X } from "lucide-react";

interface ModalWrapperProps {
  title: string;
  onClose: () => void;
  maxWidth?: string;
  borderColor?: string;
  children: React.ReactNode;
}

function ModalWrapper({
  title,
  onClose,
  maxWidth = "26rem",
  borderColor = "rgba(41,197,246,0.2)",
  children,
}: ModalWrapperProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="w-full rounded-2xl p-7 flex flex-col gap-5"
        style={{
          maxWidth,
          backgroundColor: "#0d0d18",
          border: `1px solid ${borderColor}`,
        }}
      >
        {/* Header: título + botão fechar */}
        <div className="flex items-center justify-between">
          <h3 className="font-['Exo_2',sans-serif] font-bold text-white text-[1.05rem]">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="bg-transparent border-none cursor-pointer text-white/40 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Conteúdo */}
        {children}
      </div>
    </div>
  );
}

export default ModalWrapper;