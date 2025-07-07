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
    <div className="h-full">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Pie chart */}
          <div className="w-full sm:w-1/2 h-48 sm:h-52 min-w-0">
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
          <div className="w-full sm:w-1/2">
            <table className="w-full text-left text-sm">
              <thead>
                <tr>
                  <th className="pb-2 text-gray-400 font-normal">Label</th>
                  <th className="pb-2 text-gray-400 font-normal">Value</th>
                  <th className="pb-2 text-gray-400 font-normal">%</th>
                </tr>
              </thead>
              <tbody className="text-xs sm:text-sm">
                {data.map((entry) => {
                  const total = data.reduce((sum, d) => sum + d.value, 0);
                  const percent = ((entry.value / total) * 100).toFixed(1);
                  return (
                    <tr key={entry.name}>
                      <td className="py-1.5">
                        <div className="flex items-center gap-2">
                          <span 
                            className="inline-block w-2.5 h-2.5 rounded-full" 
                            style={{ backgroundColor: entry.color }} 
                          />
                          <span className="truncate">{entry.name}</span>
                        </div>
                      </td>
                      <td className="py-1.5">{entry.value.toLocaleString()}</td>
                      <td className="py-1.5">{percent}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}




