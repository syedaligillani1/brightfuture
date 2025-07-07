type SelectBoxProps = {
  label: string
  options: { label: string; value: string }[]
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function SelectBox({
  label,
  options,
  value,
  onChange,
}: SelectBoxProps) {
  return (
    <div className="w-1/2 mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <select
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
      >
        <option value="">Select </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
