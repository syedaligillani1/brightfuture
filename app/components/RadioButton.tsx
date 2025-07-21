type Option = {
  label: string
  value: string
}

type RadioGroupProps = {
  label: string
  name: string
  options: Option[]
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function RadioGroup({
  label,
  options,
  value,
  onChange,
}: RadioGroupProps) {
  return (
    <div className="w-full mb-4">
      <p className="text-sm font-medium text-gray-700 mb-2">{label}</p>

      <div className="space-y-2">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center space-x-2">
            <input
              type="radio"
              value={opt.value}
              checked={value === opt.value}
              onChange={onChange}
            />
            <span className="text-sm">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
