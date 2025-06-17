'use client';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Universities', value: 567, color: '#10b981' },       // teal-500
  { name: 'Instructors', value: 1098, color: '#3b82f6' },        // blue-500
  { name: 'Total Students', value: 900, color: '#ec4899' },      // pink-500
  { name: 'Enrolled Students', value: 900, color: '#f59e0b' },   // amber-500
  { name: 'Courses', value: 900, color: '#6366f1' }              // indigo-500
];

export default function OverviewChart() {
  return (
    <div className="bg-white rounded-xl shadow p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">Overview</h2>
        <select className="text-sm border rounded px-2 py-1">
          <option>This Month</option>
        </select>
      </div>

      <div className="flex items-center">
        {/* Pie chart */}
        <div className="w-1/2 h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="w-1/2 text-sm">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="text-gray-400 font-normal">Label</th>
                <th className="text-gray-400 font-normal">Value</th>
                <th className="text-gray-400 font-normal">%</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry) => {
                const total = data.reduce((sum, d) => sum + d.value, 0);
                const percent = ((entry.value / total) * 100).toFixed(1);
                return (
                  <tr key={entry.name}>
                    <td className="py-1">
                      <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
                      {entry.name}
                    </td>
                    <td>{entry.value.toLocaleString()}</td>
                    <td>{percent}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
