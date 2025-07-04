import React from 'react'


type CanelProps = {
    label: string,
    onClick: () => void
    className?: string

}

export default function CancelButton({ label, onClick , className }: CanelProps) {
    return (
        <div>
            <button
                className={`text-red-700 border border-red-500 px-3 py-1 rounded-lg  ${className}`}
                onClick={onClick}
            >
                {label}
            </button>
        </div>
    )
}
