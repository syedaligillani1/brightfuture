import { DataTableProps } from "./GenericTable";

export default function DataTable<T>({
  columns,
  data,
  renderRow,
}: DataTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto rounded-xl">
      <div className="min-w-full">
        <table className="w-full text-sm text-left border-collapse">
          <thead style={{ backgroundColor: '#094e85' }} className="text-white sticky top-0">
            <tr>
              {columns.map((col) => (
                <th 
                  key={col} 
                  className="px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium whitespace-nowrap first:rounded-tl-xl last:rounded-tr-xl"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length} 
                  className="px-3 py-4 sm:px-4 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            ) : (
              data.map(renderRow)
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 