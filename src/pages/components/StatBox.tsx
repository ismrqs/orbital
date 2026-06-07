interface StatBoxProps {
  label: string;
  value: string;
  color?: string;
  size?: "sm" | "md" | "lg";
  bgAlpha?: "low" | "default";
  className?: string;
}

const valueSizeMap = {
  sm: "text-[1.1rem]",
  md: "text-[1.25rem]",
  lg: "text-[1.8rem]",
};

const labelSizeMap = {
  sm: "text-[0.7rem]",
  md: "text-[0.7rem]",
  lg: "text-[0.75rem]",
};

const bgMap = {
  low:     { backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" },
  default: { backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" },
};

function StatBox({
  label,
  value,
  color = "#ffffff",
  size = "md",
  bgAlpha = "default",
  className = "",
}: StatBoxProps) {
  return (
    <div
      className={`flex flex-col gap-1 p-4 rounded-xl ${className}`}
      style={bgMap[bgAlpha]}
    >
      <span
        className={`font-['Exo_2',sans-serif] font-semibold uppercase tracking-wider text-white/35 ${labelSizeMap[size]}`}
      >
        {label}
      </span>
      <span
        className={`font-['Exo_2',sans-serif] font-bold ${valueSizeMap[size]}`}
        style={{ color }}
      >
        {value}
      </span>
    </div>
  );
}

export default StatBox;