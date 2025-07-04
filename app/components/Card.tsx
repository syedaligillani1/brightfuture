type CardProps = {
  icon: React.ReactNode
  label: string
  amount: string
  sales: string
}

export default function Card({ icon, label, amount, sales }: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-6 w-full">
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center">
          {icon}
        </div>
        <div className="space-y-2 sm:space-y-3">
          <div className="text-sm text-gray-500 font-medium">{label}</div>
          <div className="text-base sm:text-lg font-bold text-black">{amount}</div>
          <div className="text-xs sm:text-sm text-gray-800">{sales}</div>
        </div>
      </div>
    </div>
  );
}
