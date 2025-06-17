'use client'
type ClassItem = {
  name: string
  time: string
}

type Props = {
  classes: ClassItem[]
}

export default function ScheduleCardList({ classes }: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-sm">
      <h2 className="text-sm font-semibold mb-2">Schedule Live Classes</h2>
      {classes.map((cls, i) => (
        <div key={i} className="border p-3 mb-2 rounded">
          <p className="font-medium">{cls.name}</p>
          <p className="text-xs text-gray-400">{cls.time}</p>
        </div>
      ))}
    </div>
  )
}
