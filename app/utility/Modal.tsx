type ModalProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null

  return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-60">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 text-lg"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  )
}
