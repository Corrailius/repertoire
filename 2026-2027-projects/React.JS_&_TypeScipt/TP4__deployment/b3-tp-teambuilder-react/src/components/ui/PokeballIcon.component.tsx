type PokeballIconProps = {
  className?: string;
};

const PokeballIcon = ({ className = "h-5 w-5" }: PokeballIconProps) => {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#ffffff" />
      <path d="M1 12a11 11 0 0 1 22 0z" fill="#dc2626" />
      <circle
        cx="12"
        cy="12"
        r="11"
        fill="none"
        stroke="#1f2937"
        strokeWidth="1.5"
      />
      <path d="M1 12h22" stroke="#1f2937" strokeWidth="1.5" />
      <circle
        cx="12"
        cy="12"
        r="3.5"
        fill="#ffffff"
        stroke="#1f2937"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default PokeballIcon;
