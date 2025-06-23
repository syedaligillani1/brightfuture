import { DataTableProps } from "../types";

export default function DataTable<T>({
  columns,
  data,
  renderRow,
}: DataTableProps<T>) {
  return (
    <div className="rounded-xl overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="bg-blue-900 text-white">
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-6 py-3 font-medium">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{data.map(renderRow)}</tbody>
      </table>
    </div>
  );
}