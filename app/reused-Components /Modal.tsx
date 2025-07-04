type ModalProps = {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => void
}

export default function Modal({
  open,
  onClose,
  title = "",
  description ,
  confirmLabel ,
  cancelLabel ,
  onConfirm,
}: ModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
        >
          &times;
        </button>

        <h2 className="text-lg font-semibold mb-2">{title}</h2>

        <p className="text-sm text-gray-600 mb-6">{description}</p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            {cancelLabel}
          </button>
          <button
            onClick={() => {
              onConfirm?.()
              onClose()
            }}
            className="bg-[#094e85] text-white px-4 py-2 rounded hover:opacity-90"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
