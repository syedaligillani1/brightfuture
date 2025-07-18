import React from 'react'

type CancelProps = {
    label: string,
    onClick: () => void,
    className?: string,
    type?: 'button' | 'submit' | 'reset',
    disabled?: boolean
}

export default function CancelButton({ label, onClick, className, type = 'button', disabled = false }: CancelProps) {
    return (
        <div>
            <button
                className={`text-red-700 border border-red-500 px-3 py-1 rounded-lg  ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={onClick}
                type={type}
                disabled={disabled}
            >
                {label}
            </button>
        </div>
    )
}
