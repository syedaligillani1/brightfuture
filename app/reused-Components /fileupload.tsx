type FileUploadFieldProps = {
  label: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  accept?: string
  disabled?: boolean
  name?: string
}

export default function FileUploadField({
  label,
  onChange,
  accept = "image/*",
  disabled = false,
  name = "file-upload"
}: FileUploadFieldProps) {
  return (
    <div className="w-1/2">
      <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>

      <div className="border border-dashed border-gray-300 p-6 rounded flex flex-col items-center justify-center text-center">
        <label htmlFor={name} className="cursor-pointer">
          <div className="text-blue-800 font-bold text-sm">Upload File</div>
        </label>

        <input
          id={name}
          name={name}
          type="file"
          className="hidden"
          accept={accept}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
    </div>
  )
}
