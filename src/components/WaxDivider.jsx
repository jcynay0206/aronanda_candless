// Elemento de firma de Aronanda: una línea que "gotea" como cera derretida.
// Se usa como separador entre secciones y como acento bajo títulos.

export default function WaxDivider({ tone = "oro", className = "" }) {
  const stroke = tone === "marfil" ? "#F8F2E9" : "#B8881E";

  return (
    <svg
      viewBox="0 0 240 28"
      preserveAspectRatio="none"
      className={`h-7 w-full ${className}`}
      aria-hidden="true"
    >
      <line x1="0" y1="2" x2="240" y2="2" stroke={stroke} strokeWidth="1" opacity="0.6" />
      {/* Tres gotas de cera, asimétricas a propósito */}
      <path
        d="M40 2 C 40 9, 34 12, 34 17 C 34 21.5, 37.5 24.5, 41 24.5 C 44.5 24.5, 48 21.5, 48 17 C 48 12, 42 9, 42 2 Z"
        fill={stroke}
        opacity="0.85"
      />
      <path
        d="M118 2 C 118 7, 114 9, 114 12.5 C 114 15.5, 116.5 18, 119.5 18 C 122.5 18, 125 15.5, 125 12.5 C 125 9, 121 7, 121 2 Z"
        fill={stroke}
        opacity="0.6"
      />
      <path
        d="M198 2 C 198 11, 191 14, 191 21 C 191 26.5, 195.5 30, 200 30 C 204.5 30, 209 26.5, 209 21 C 209 14, 202 11, 202 2 Z"
        fill={stroke}
        opacity="0.75"
        transform="translate(0,-4)"
      />
    </svg>
  );
}
