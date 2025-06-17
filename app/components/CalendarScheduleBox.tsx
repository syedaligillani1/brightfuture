'use client'
type Event = {
  type: string
  time: string
}

type Props = {
  dateRange: { start: string; end: string }
  events: Event[]
}

export default function CalendarScheduleBox({ dateRange, events }: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-sm">
      <h2 className="text-sm font-semibold mb-2">Schedules</h2>
      <div className="text-xs text-gray-500 mb-2">
        Start And End Date<br />
        {dateRange.start} To {dateRange.end}
      </div>
      <ul className="space-y-2">
        {events.map((e, i) => (
          <li key={i} className="flex justify-between border-b pb-1">
            <span>{e.type}</span>
            <span className="text-gray-400">{e.time}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
