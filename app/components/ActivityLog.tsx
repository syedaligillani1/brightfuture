type Activity = {
  time: string
  title: string
  color: string
  description: string
}

type Props = {
  data: Activity[]
}

export default function RecentActivity({ data }: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-sm">
      <h2 className="font-semibold mb-3">Recent Activity</h2>
      <div className="space-y-4 relative">
        {data.map((item, index) => (
          <div key={index} className="flex items-start space-x-3 relative">
            <div className="w-14 text-xs text-gray-500">{item.time}</div>

            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full ${item.color} z-10`} />
              {index < data.length - 1 && (
                <div className="h-full w-px bg-gray-300" />
              )}
            </div>

            <div className="mb-2 -mt-2">
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
