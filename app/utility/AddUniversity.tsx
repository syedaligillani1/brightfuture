'use client'

import { useState } from 'react'
import Button from './Button'
import PrimaryButton from '@/app/reused-Components /PrimaryButton'
import CancelButton from '@/app/reused-Components /CancelButton'

type Props = {
  onClose: () => void
}

export default function AddUniversity({ onClose }: Props) {
  const [name, setName] = useState('')
  const [deviceLimit, setDeviceLimit] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!name || !deviceLimit) {
      alert('Please fill in all required fields')
      return
    }

    alert('University Added')
    onClose()
  }

  return (
    <div className="bg-white p-6 rounded-lg max-w-3xl w-full">
      <h2 className="text-xl font-semibold mb-6">Add New University</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter University Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded p-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Device Limit</label>
            <select
              value={deviceLimit}
              onChange={(e) => setDeviceLimit(e.target.value)}
              className="w-full border rounded p-2 text-sm"
              required
            >
              <option value="">Select</option>
              <option value="1">1 Device</option>
              <option value="3">5 Devices</option>
              <option value="5">10 Devices</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">University Logo</label>
          <div className="border border-dashed border-gray-300 p-6 rounded flex flex-col items-center justify-center text-center">

            <label htmlFor="logo-upload" className="cursor-pointer">
              <div className="text-blue-800 font-bold text-sm">Upload Logo</div>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <CancelButton
            label="Cancel"
            onClick={onClose}
            className="px-4 py-2 text-sm"
            type="button"
          />
          <PrimaryButton
            label="Create University"
            className="px-4 py-2 text-sm"
            type="submit"
          />
        </div>
      </form>
    </div>
  )
}
