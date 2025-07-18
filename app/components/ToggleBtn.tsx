type ToggleBtnProps = {
  label?: string
  value: boolean
  onChange: (value: boolean) => void
}

export default function ToggleBtn({ label, value, onChange }: ToggleBtnProps) {
  return (
    <div className="flex items-center space-x-2">
      {label && <span className="text-sm">{label}</span>}
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={value}
          onChange={() => onChange(!value)}
        />
        <div className="w-11 h-6 bg-gray-300 peer-checked:bg-[#094e85] rounded-full peer-focus:ring-2 ring-blue-300 transition-all duration-200"></div>
        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 transform peer-checked:translate-x-full"></div>
      </label>
    </div>
  )
}
