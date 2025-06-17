'use client'

import React from 'react'
import { Line, LineChart , ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function RevenueChart() {

const data = [
  { name: 'Jan', revenue: 180000 },
  { name: 'Feb', revenue: 220000 },
  { name: 'Mar', revenue: 300000 },
  { name: 'Apr', revenue: 360000 },
  { name: 'May', revenue: 470000 },
  { name: 'Jun', revenue: 420000 },
  { name: 'Jul', revenue: 390000 },
  { name: 'Aug', revenue: 410000 },
  { name: 'Sep', revenue: 320000 },
  { name: 'Oct', revenue: 290000 },
  { name: 'Nov', revenue: 370000 },
  { name: 'Dec', revenue: 450000 },
];

const dataY = [100000,200000,300000,400000,500000]


  return (
    <div>
    <div className="bg-white rounded-xl shadow p-4">
    <div className="flex justify-between items-center mb-4">
    <div>
      <h2 className="font-semibold">Monthly Revenue</h2>
      <p className="text-green-500 font-semibold">KD 45,623,456</p>
    </div>
    <select className="text-sm border rounded px-2 py-1">
      <option>All</option>
    </select>
    </div>

    <ResponsiveContainer width={550} height={800}>
        <LineChart data={data}>
            <XAxis dataKey="name"/>
            <YAxis ticks={dataY}/>
            <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#1e40af"
            strokeWidth={3}
            dot={false}
          />

        </LineChart>
    </ResponsiveContainer> 
    </div>
    </div>
  )
}
