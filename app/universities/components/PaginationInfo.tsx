import { PaginationInfoProps } from "../types";

export default function PaginationInfo({ total }: PaginationInfoProps) {
  return (
    <div className="text-right text-xs mt-2">
      Rows Per Page: 10 &nbsp; 1–10 of {total}
    </div>
  );
}