type ButtonProps = {
  label: string
  onClick: () => void
}

export default function PrimaryButton({ label, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-[#094e85] text-white px-3 py-1 rounded hover:opacity-90"
    >
      {label}
    </button>
  )
}
