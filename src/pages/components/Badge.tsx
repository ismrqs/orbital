import { Shield, AlertTriangle, AlertOctagon } from "lucide-react";

// Esquema "risco"
const riscoCfg = {
  ok:     { color: "#22c55e", label: "Normal",  icon: <Shield size={14} /> },
  warn:   { color: "#f0a030", label: "Atenção", icon: <AlertTriangle size={14} /> },
  danger: { color: "#e84c1c", label: "Crítico", icon: <AlertOctagon size={14} /> },
};

// Esquema "status
const statusCfg = {
  NORMAL:  { color: "#22c55e", label: "Normal",  icon: <Shield size={14} /> },
  ATENCAO: { color: "#f0a030", label: "Atenção", icon: <AlertTriangle size={14} /> },
  CRITICO: { color: "#e84c1c", label: "Crítico", icon: <AlertOctagon size={14} /> },
  OFFLINE: { color: "#4a5565", label: "Offline", icon: null },
};

type RiscoStatus  = "ok" | "warn" | "danger";
type NivelStatus  = "CRITICO" | "ATENCAO" | "NORMAL" | "OFFLINE";
type BadgeStatus  = RiscoStatus | NivelStatus;

interface BadgeProps {
  status: BadgeStatus;
  size?: "sm" | "md";
  showIcon?: boolean;
  className?: string;
}

function StatusBadge({ status, size = "sm", showIcon = false, className = "" }: BadgeProps) {

  // Resolve config independente do esquema
  const cfg =
    status in riscoCfg
      ? riscoCfg[status as RiscoStatus]
      : statusCfg[status as NivelStatus];

  const textSize  = size === "md" ? "text-[0.72rem]" : "text-[0.68rem]";
  const padding   = size === "md" ? "px-3 py-1"      : "px-2.5 py-0.5";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-['Exo_2',sans-serif] font-bold uppercase tracking-wider rounded-full ${textSize} ${padding} ${className}`}
      style={{
        color:           cfg.color,
        backgroundColor: cfg.color + "18",
        border:          `1px solid ${cfg.color}33`,
      }}
    >
      {showIcon && cfg.icon}
      {cfg.label}
    </span>
  );
}

export default StatusBadge;

export { riscoCfg, statusCfg };