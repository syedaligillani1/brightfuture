'use client'

import React from 'react'
import { CartesianGrid, PolarGrid , Line, LineChart , ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

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
  { name: 'Sep', revenue: 220000 },
  { name: 'Oct', revenue: 290000 },
  { name: 'Nov', revenue: 370000 },
  { name: 'Dec', revenue: 450000 },
];

const dataY = [100000,200000,300000,400000,500000]

  console.log(data); 


  return (
    <div>
<div className="bg-white rounded-xl shadow p-4 h-full w-full">
    <div className="flex justify-between items-center mb-4">
    <div>
      <h2 className="font-semibold">Monthly Revenue</h2>
      <p className="text-green-500 font-semibold">KD 45,623,456</p>
    </div>
    <select className="text-sm border rounded px-2 py-1">
      <option>All</option>
    </select>
    </div>

<div className="h-[280px]">  
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data}>
      <CartesianGrid stroke="#9ca3af" strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis ticks={dataY} />
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
    </div>
  )
}
