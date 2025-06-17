'use client'
type Task = {
  title: string
  date: string
  done?: boolean
}

type Props = {
  tasks: Task[]
  onAddTask?: () => void
}

export default function TodoList({ tasks, onAddTask }: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-sm">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-semibold">Admin To Do List</h2>
        <button onClick={onAddTask} className="bg-blue-600 text-white px-2 py-1 text-xs rounded">
          Add To Do
        </button>
      </div>
      <ul className="space-y-2">
        {tasks.map((task, i) => (
          <li key={i} className="flex items-start space-x-2">
            <input type="checkbox" checked={task.done} readOnly />
            <div>
              <p>{task.title}</p>
              <p className="text-xs text-gray-400">{task.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
