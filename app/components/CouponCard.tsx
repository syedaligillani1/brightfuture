'use client'
type CouponItem = {
  name: string
  progress: string 
}

type Props = {
  title: string
  items: CouponItem[]
  onViewAll?: () => void
}

export default function CouponCardList({ title, items, onViewAll }: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-semibold">{title}</h2>
        {onViewAll && <button className="text-blue-600 text-xs">View All</button>}
      </div>
      {items.map((item, index) => (
        <div key={index} className="text-sm border-b py-2">
          <p className="font-medium">{item.name}</p>
          <p className="text-xs text-gray-500">Coupon Redeemed: {item.progress}</p>
        </div>
      ))}
    </div>
  )
}
