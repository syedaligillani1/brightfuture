export type TableProps<T> = {
  columns: string[];
  data: T[];
  tabs?: string[];
  searchPlaceholder?: string;
  renderRow: (row: T, index: number) => React.ReactNode;
  onAddNew?: () => void;
};

export type TableTabsProps = {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
  onAddNew?: () => void;
};

export type TableSearchProps = {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
};

export type DataTableProps<T> = {
  columns: string[];
  data: T[];
  renderRow: (row: T, index: number) => React.ReactNode;
};

export type PaginationInfoProps = {
  total: number;
};

type AddNewButtonProps = {
  onClick: () => void;
  label?: string;
  className?: string;
};
