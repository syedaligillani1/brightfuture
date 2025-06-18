type ScheduleItem = {
  title: string
  time: string
}

type Props = {
  title?: string
  startDate?: string
  endDate?: string
  events: ScheduleItem[]
}

export default function Schedules({
  title = 'Schedules',
  startDate = '2024-01-24',
  endDate = '2024-02-24',
  events
}: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-sm">
      <h2 className="font-semibold mb-2">{title}</h2>

      <div className="flex justify-between items-center mb-3 text-xs text-gray-500">
        <button>{'<'}</button>
        <div className="text-center">
          <p className="text-xs font-semibold text-blue-900">Start And End Date</p>
          <p>{startDate} To {endDate}</p>
        </div>
        <button>{'>'}</button>
      </div>

      <div className="grid grid-cols-7 text-center text-xs text-gray-500 mb-3">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={i} className={i === 3 ? 'text-blue-700 font-bold' : ''}>{d}</div>
        ))}
      </div>

      <div className="space-y-3">
        {events.map((event, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-[10px]">📍</div>
              <div>
                <p className="font-medium">{event.title}</p>
                <p className="text-xs text-gray-500">{event.time}</p>
              </div>
            </div>
            <button className="text-xs bg-blue-900 text-white rounded-full px-2 py-1">→ Detail</button>
          </div>
        ))}
      </div>
    </div>
  )
}
