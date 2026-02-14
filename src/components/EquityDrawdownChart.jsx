import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

import { prepareChartData } from "../utils/chartData";
import { useState, useMemo } from "react";
import { RotateCcw } from "lucide-react";

export default function EquityDrawdownChart({ data }) {
  const fullData = prepareChartData(data);

  const defaultFrom = "2019-01-01";
  const defaultTo = "";

  const [fromDate, setFromDate] = useState(defaultFrom);
  const [toDate, setToDate] = useState(defaultTo);
  const [spinning, setSpinning] = useState(false);

  const isDirty =
    fromDate !== defaultFrom || toDate !== defaultTo;

  const handleRefresh = () => {
    if (!isDirty) return;

    setSpinning(true);
    setTimeout(() => setSpinning(false), 500);

    setFromDate(defaultFrom);
    setToDate(defaultTo);
  };

  const filteredData = useMemo(() => {
    if (!fullData.length) return [];

    const start = fromDate ? new Date(fromDate) : null;
    const end = toDate ? new Date(toDate) : null;

    return fullData.filter((d) => {
      const current = new Date(
        d.date.split("-").reverse().join("-")
      );

      if (start && current < start) return false;
      if (end && current > end) return false;

      return true;
    });
  }, [fullData, fromDate, toDate]);

  if (!filteredData.length) return null;

  return (
    <div className="p-4 sm:p-6 rounded-xl mt-2 bg-white shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">
        
        {/* Left */}
        <div>
          <h3 className="text-lg font-semibold">
            Equity Curve
          </h3>

          <div className="flex flex-wrap gap-4 items-center mt-1">
            <p className="text-sm text-gray-500">
              Live since {filteredData[0]?.date}
            </p>

            <button
              onClick={handleRefresh}
              disabled={!isDirty}
              className={`text-sm flex items-center gap-1 transition-colors ${
                isDirty
                  ? "text-green-600 hover:text-green-700"
                  : "text-green-300 cursor-not-allowed"
              }`}
            >
              <RotateCcw
                size={14}
                className={`transition-transform ${
                  spinning ? "rotate-180" : ""
                }`}
              />
              Refresh
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="flex flex-col w-full sm:w-auto">
            <label className="text-xs text-gray-500 mb-1">
              From date
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border rounded px-2 py-1 text-sm w-full focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div className="flex flex-col w-full sm:w-auto">
            <label className="text-xs text-gray-500 mb-1">
              To date
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border rounded px-2 py-1 text-sm w-full focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      {/* Equity Chart */}
      <div className="h-[220px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData}>
            <CartesianGrid
              stroke="#e5e7eb"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="date"
              minTickGap={40}
              axisLine={{ stroke: "#d1d5db" }}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />

            <YAxis
              axisLine={{ stroke: "#d1d5db" }}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="nav"
              stroke="#16a34a"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Drawdown Chart */}
      <div className="h-[120px] sm:h-[150px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData}>
            <CartesianGrid
              stroke="#e5e7eb"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis dataKey="date" hide />

            <YAxis
              domain={["auto", 0]}
              tickFormatter={(v) => `${v.toFixed(0)}%`}
              axisLine={{ stroke: "#d1d5db" }}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />

            <ReferenceLine y={0} stroke="#9ca3af" />

            <Tooltip
              formatter={(v) => `${v.toFixed(2)}%`}
            />

            <Area
              type="monotone"
              dataKey="drawdown"
              stroke="#dc2626"
              fill="#ef4444"
              fillOpacity={0.35}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
