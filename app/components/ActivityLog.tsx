'use client'
type LogItem = {
  time: string
  content: string
}

type Props = {
  title: string
  logs: LogItem[]
}

export default function ActivityLog({ title, logs }: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-sm">
      <h2 className="text-sm font-semibold mb-2">{title}</h2>
      <ul className="space-y-2">
        {logs.map((log, i) => (
          <li key={i} className="flex justify-between border-b pb-1">
            <span className="text-xs text-gray-400">{log.time}</span>
            <span>{log.content}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
