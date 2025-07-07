interface PaginationInfoProps {
  total: number;
}

export default function PaginationInfo({ total }: PaginationInfoProps) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-500">
        Showing <span className="font-medium">{total}</span> results
      </p>
    </div>
  );
} 