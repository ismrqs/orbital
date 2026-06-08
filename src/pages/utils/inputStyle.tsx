export const inputBase =
  "w-full px-4 py-[0.7rem] rounded-lg text-[0.95rem] font-['Roboto',sans-serif] outline-none transition-colors duration-200 bg-white/[0.04] text-white placeholder:text-white/25";

// Versão modal: padding vertical menor, para os modais compactos
export const inputBaseModal =
  "w-full px-4 py-2.5 rounded-lg text-[0.9rem] font-['Roboto',sans-serif] outline-none bg-white/[0.04] text-white placeholder:text-white/25 transition-colors duration-200";

export const inputBorder = (hasError: boolean) =>
  hasError
    ? "border-[1.5px] border-[#e84c1c]"
    : "border-[1.5px] border-white/10 focus:border-[#29c5f6]";

// Versão modal: usa border sem 1.5px para ficar mais leve visualmente
export const inputBorderModal = (hasError: boolean) =>
  hasError
    ? "border border-[#e84c1c]"
    : "border border-white/10 focus:border-[#29c5f6]";