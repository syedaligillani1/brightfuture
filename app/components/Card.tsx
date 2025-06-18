type CardProps = {
  icon: React.ReactNode
  label: string
  amount: string
  sales: string
}

export default function Card({ icon, label, amount, sales }: CardProps) {
  return (
    <div className="space-y-4 bg-white rounded-xl shadow p-6 w-full max-w-xs">
      <div className="w-full flex justify-start">
        {icon}
      </div>
      <div className="text-sm text-gray-500 font-medium">{label}</div>
      <div className="text-lg font-bold text-black">{amount}</div>
      <div className="text-xs text-gray-800">{sales}</div>
    </div>
  );
}
