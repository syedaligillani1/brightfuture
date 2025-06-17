'use client'
type InvoiceItem = {
  name: string
  university: string
  id: string
  department: string
  invoiceNo: string
  status: string
}

type Props = {
  title: string
  items: InvoiceItem[]
  onViewAll?: () => void
}

export default function InvoiceCardList({ title, items, onViewAll }: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-semibold">{title}</h2>
        {onViewAll && (
          <button onClick={onViewAll} className="text-blue-600 text-xs">
            View All
          </button>
        )}
      </div>
      {items.map((item, i) => (
        <div key={i} className="flex justify-between py-2 border-b text-sm">
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-xs text-gray-500">{item.university}</p>
            <p className="text-xs text-gray-400">{item.id}</p>
          </div>
          <div className="text-right">
            <p className="text-xs">{item.department}</p>
            <p className="text-xs text-gray-400">Invoice {item.invoiceNo}</p>
            <span className={`text-xs px-2 py-1 rounded-full ${
              item.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
            }`}>
              {item.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
