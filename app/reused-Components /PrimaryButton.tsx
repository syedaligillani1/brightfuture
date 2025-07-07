type ButtonProps = {
  label: string
  onClick: () => void
  className?: string
  
}

export default function PrimaryButton({ label, onClick , className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-[#094e85] text-white px-3 py-1 rounded hover:opacity-90 ${className} `}
    >
      {label}
    </button>
  )
}
