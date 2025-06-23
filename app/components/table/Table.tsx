'use client'
import React, { useState } from 'react'
import data from './table.json'
import Button from '../../utility/Button'
import Modal from '@/app/utility/Modal'
import AddUniversity from '@/app/utility/AddUniversity'
import Router, { useRouter } from 'next/router'


export default function Table() {

  const [open, setOpen] = useState(false)


  return (
    <div className="bg-white shadow rounded-xl p-4 mt-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Recently Joined</h2>
        <select className="text-sm border rounded px-2 py-1">
          <option>Last 30 days</option>
          <option>Last 20 days</option>
          <option>Last 10 days</option>

        </select>
      </div>

          <div className='p6'>
        <Button label="Add University" 
         onClick={() => Router.push('/universities')}
 />

        <Modal open={open} onClose={() => setOpen(false)}>
          <h2 className="text-lg font-semibold mb-4">Add New University</h2>

          <AddUniversity onClose={() => setOpen(false)} />
        </Modal>
        </div>




        <div className="rounded-xl overflow-hidden ">
          <table className="w-full text-sm text-left">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="px-3 py-2">Name</th>
                <th>University</th>
                <th>Department</th>
                <th>Course</th>
                <th>Code</th>
                <th>Subscription</th>
                <th>Mode</th>
                <th>Add-Ons</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((student, index) => (
                <tr key={index} className=" border -b border-gray-100 hover:bg-gray-50">
                  <td className="px-3 py-2">{student.name}</td>
                  <td>{student.university}</td>
                  <td>{student.department}</td>
                  <td>{student.course}</td>
                  <td>{student.code}</td>
                  <td>{student.subscription}</td>
                  <td>{student.mode}</td>
                  <td>{student.addons}</td>
                  <td>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${student.status === 'Paid'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                        }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="text-center text-gray-500">:</td>
                </tr>
              ))}
            </tbody>

          </table>
          <div className="w-full flex justify-end px-4 py-2">
            <p className="text-xs text-gray-500">Rows Per Page:10</p>
          </div>
        </div>
      </div>
      )
}
