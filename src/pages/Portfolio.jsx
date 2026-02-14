import { useEffect, useState } from "react";
import { parseExcel } from "../utils/excelParser";
import ReturnsTable from "../components/ReturnsTable";
import EquityDrawdownChart from "../components/EquityDrawdownChart";

export default function Portfolio() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/src/data/React Assignment Historical NAV Report.xlsx")
      .then(res => res.blob())
      .then(parseExcel)
      .then(setData);
  }, []);

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-2">Portfolio Statistics</h2>

      <ReturnsTable data={data} />

      <div className="mt-10">
        <EquityDrawdownChart data={data} />
      </div>
    </div>
  );
}