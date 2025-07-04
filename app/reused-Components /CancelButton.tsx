import React from 'react'


type CanelProps = {
    label : string,
    onClick : () => void
}

export default function CancelButton({label , onClick} : CanelProps) {
  return (
    <div>
      <button
  className=" text-red-700 border border-red-300 px-3 py-1 rounded-lg hover:bg-red-200"
      onClick={onClick}
      >
        {label}
      </button>
    </div>
  )
}
