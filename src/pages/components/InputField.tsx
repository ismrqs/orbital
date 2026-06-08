import { inputBase, inputBaseModal, inputBorder, inputBorderModal } from "../utils/inputStyle";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  textarea?: boolean;
  rows?: number;
  variant?: "default" | "modal";
  wrapperClassName?: string;
}

function InputField({
  label,
  error,
  icon,
  textarea = false,
  rows = 5,
  variant = "default",
  wrapperClassName = "",
  className = "",
  ...rest
}: InputFieldProps) {
  const base   = variant === "modal" ? inputBaseModal   : inputBase;
  const border = variant === "modal" ? inputBorderModal : inputBorder;
  const iconPadding = icon ? "pl-10" : "";

  const fieldCls = `${base} ${border(!!error)} ${iconPadding} ${className}`;

  return (
    <div className={`flex flex-col gap-1.5 ${wrapperClassName}`}>
      <label className="font-['Exo_2',sans-serif] font-bold text-[0.78rem] text-white/50 uppercase tracking-wider">
        {label}
      </label>

      <div className={icon ? "relative" : undefined}>
        {icon && (
          <span
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            {icon}
          </span>
        )}

        {textarea ? (
          <textarea
            rows={rows}
            className={`${fieldCls} resize-y`}
            {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            className={fieldCls}
            {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
      </div>

      {error && (
        <span className="text-[#e84c1c] text-[0.78rem]">{error}</span>
      )}
    </div>
  );
}

export default InputField;