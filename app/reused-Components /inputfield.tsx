type InputFieldProps = {
    label: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    type?: string
    required?: boolean
    name?: string
    error?: boolean
    success?: boolean
}

export default function InputField({
    label,
    value,
    onChange,
    placeholder = '',
    type = 'text',
    required = false,
    name,
    error,
    success,
}: InputFieldProps) {

    return (
        <div className="w-full sm:w-1/2 lg:w-1/ xl:w-1/ px-2">
            <label
                htmlFor={name}
                className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
            >
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`w-full rounded-lg px-4 py-2 text-sm sm:text-base border outline-none transition
                ${error === true ? 'border-red-500 focus:ring-2 focus:ring-red-500' : ''}
                ${success === true && !error ? 'border-green-500 focus:ring-2 focus:ring-green-500' : ''}
                ${!error && success !== true ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' : ''}
`}
            />
        </div>
    )

}
