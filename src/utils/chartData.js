function parseDate(dateStr) {
  const [day, month, year] = dateStr.split("-");
  return new Date(`${year}-${month}-${day}`);
}

export function prepareChartData(rawData) {
  if (!rawData || rawData.length === 0) return [];

  const data = rawData.map(([date, nav]) => ({
    dateObj: parseDate(date),
    date: date, // original format for display
    nav: Number(nav),
  }));

  // Sort oldest → newest
  data.sort((a, b) => a.dateObj - b.dateObj);

  let peak = data[0].nav;

  return data.map((d) => {
    if (d.nav > peak) peak = d.nav;

    const drawdown = ((d.nav - peak) / peak) * 100;

    return {
      date: d.date,
      nav: d.nav,
      drawdown: drawdown,
    };
  });
}
