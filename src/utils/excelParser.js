import * as XLSX from "xlsx";

// export const parseExcel = async (file) => {
//   const data = await file.arrayBuffer();
//   const workbook = XLSX.read(data);
//   const sheet = workbook.Sheets[workbook.SheetNames[0]];
//   return XLSX.utils.sheet_to_json(sheet);
// };

export const parseExcel = async (file) => {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  const sliced = json.slice(6); // skip first 6 rows

  return sliced;
};
