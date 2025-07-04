import { DataTableProps } from "../types";

export default function DataTable<T>({
  columns,
  data,
  renderRow,
}: DataTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto rounded-xl">
      <div className="min-w-full lg:min-w-[800px]"> 
        <table className="w-full text-sm text-left border-collapse">
          <thead style={{ backgroundColor: '#094e85' }} className="text-white">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map(renderRow)}
          </tbody>
        </table>
      </div>
    </div>
  );
}