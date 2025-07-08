type ButtonProps = {
  label: React.ReactNode
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export default function PrimaryButton({ label, onClick, className, type = 'button', disabled = false }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`bg-[#094e85] text-white px-3 py-1 rounded hover:opacity-90 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {label}
    </button>
  )
}
