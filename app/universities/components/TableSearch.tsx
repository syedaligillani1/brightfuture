import { TableSearchProps } from "../types";

export default function TableSearch({
  value,
  onChange,
  placeholder = "Search...",
}: TableSearchProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="border rounded px-3 py-2 mb-4 w-full"
    />
  );
}