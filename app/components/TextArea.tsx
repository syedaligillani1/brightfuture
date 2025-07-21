type TextAreaProps = {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  rows? : number
}

export default function TextArea({ label, value, onChange, placeholder , rows = 4 }: TextAreaProps) {
  return (
    <div className="w-1/2 mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        rows={rows}
      />
    </div>
  )
}
