import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { calculateMetrics } from "../utils/portfolioCalculations";
import { useMemo } from "react";

export default function ReturnsTable({ data }) {
  const metrics = useMemo(() => calculateMetrics(data), [data]);
  const tableData = useMemo(() => {
    if (!metrics) return [];

    return [
      {
        name: 'Quant active',
        ytd: metrics.ytd,
        oneDay: metrics.oneDay,
        oneWeek: metrics.oneWeek,
        oneMonth: metrics.oneMonth,
        threeMonth: metrics.threeMonth,
        sixMonth: metrics.sixMonth,
        oneYear: metrics.oneYear,
        threeYear: metrics.threeYear,
        sinceInception: metrics.sinceInception,
        currentDD: metrics.currentDD,
        maxDrawdown: metrics.maxDrawdown,
      },
    ];
  }, [metrics]);

  const columns = useMemo(
    () =>
      [
        { accessorKey: "name", header: "NAME" },
        { accessorKey: "ytd", header: "YTD" },
        { accessorKey: "oneDay", header: "1D" },
        { accessorKey: "oneWeek", header: "1W" },
        { accessorKey: "oneMonth", header: "1M" },
        { accessorKey: "threeMonth", header: "3M" },
        { accessorKey: "sixMonth", header: "6M" },
        { accessorKey: "oneYear", header: "1Y" },
        { accessorKey: "threeYear", header: "3Y" },
        { accessorKey: "sinceInception", header: "SI (CAGR)" },
        { accessorKey: "currentDD", header: "DD" },
        { accessorKey: "maxDrawdown", header: "Max DD" },
      ].map((col) => ({
        ...col,
        cell: ({ getValue }) => {
          const val = getValue();
          if (val === null || val === undefined)
            return <span>-</span>;

          const isNegative = val < 0;
          const valueToDisplay =
            col?.accessorKey === "name"
              ? val
              : `${val?.toFixed(2)}%`;

          return (
            <span
              className={`font-semibold text-slate-500
                }`}
            >
              {valueToDisplay}
            </span>
          );
        },
      })),
    []
  );

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!metrics) return null;

 return (
  <div className="p-4 rounded-xl">
    <h3 className="text-lg font-semibold mb-4">
      Trailing Returns
    </h3>

    {/* ================= DESKTOP TABLE ================= */}
    <div className="hidden md:block overflow-x-auto">
      <table className="min-w-full text-sm border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="border-b text-left bg-slate-200"
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-2 px-4 whitespace-nowrap font-medium text-gray-600"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="py-3 px-4 whitespace-nowrap"
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* ================= MOBILE CARD VIEW ================= */}
    <div className="md:hidden space-y-4">
      {table.getRowModel().rows.map((row) => (
        <div
          key={row.id}
          className="bg-white rounded-xl shadow p-4 space-y-2"
        >
          {row.getVisibleCells().map((cell) => (
            <div
              key={cell.id}
              className="flex justify-between text-sm"
            >
              <span className="text-gray-500">
                {cell.column.columnDef.header}
              </span>
              <span className="font-semibold">
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>

    <p className="text-sm text-slate-500 mt-4">
      Note: Return above 1 year is annualised
    </p>
  </div>
);
}
