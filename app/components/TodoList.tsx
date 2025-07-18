'use client'

import PrimaryButton from '@/app/components/PrimaryButton'
import Modal from '@/app/components/Modal'
import  {useState}  from 'react'

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
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div className="bg-white p-4 rounded-xl shadow text-sm">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold">Admin To Do List</h2>
        <PrimaryButton label="Add To Do" onClick={() => setModalOpen(true)} type="button" />
      </div>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add To Do"
        description="You clicked Add To Do button"
        confirmLabel="OK"
        cancelLabel="Cancel"
        onConfirm={() => setModalOpen(false)}
      />
      <ul className="space-y-3">
        {tasks.map((task, i) => (
          <li key={i} className="flex items-start space-x-3 border-b pb-2">
            <input
              type="checkbox"
              checked={task.done}
              readOnly
              className="accent-blue-600 w-4 h-4 mt-1"
            />
            <div>
              <p className="text-sm font-medium text-black">{task.title}</p>
              <p className="text-xs text-gray-400">{task.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
