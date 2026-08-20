import React from "react";

export type DataTableColumn<T> = {
  key: string;
  header: string;
  className?: string;
  render: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  rows: T[];
  columns: DataTableColumn<T>[];
  getRowKey: (row: T) => string;
};

export default function DataTable<T>({
  rows,
  columns,
  getRowKey,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left">
        <thead className="border-b border-[#f3ece9] bg-[#fffdfb]">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`whitespace-nowrap px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#a799a0] ${column.className ?? ""}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f3ece9]">
          {rows.map((row) => (
            <tr key={getRowKey(row)} className="transition hover:bg-[#fffdfb]">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`px-6 py-5 align-middle ${column.className ?? ""}`}
                >
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
