// Convert "23-04-2024" → Date object
function parseDate(dateStr) {
  const [day, month, year] = dateStr.split("-");
  return new Date(`${year}-${month}-${day}`);
}

export function calculateMetrics(rawData) {
  if (!rawData || rawData.length < 2) return null;

  // Convert to proper objects
  const data = rawData.map(([date, nav]) => ({
    date: parseDate(date),
    nav: Number(nav),
  }));

  // Sort oldest → latest
  data.sort((a, b) => a.date - b.date);

  const latest = data[data.length - 1];
  const latestNAV = latest.nav;

  // Helper: find NAV N days ago
  function getPastNAV(days) {
    const target = new Date(latest.date);
    target.setDate(target.getDate() - days);

    const found = [...data]
      .reverse()
      .find(d => d.date <= target);

    return found ? found.nav : null;
  }

  function calcReturn(pastNAV) {
    if (!pastNAV) return null;
    return ((latestNAV - pastNAV) / pastNAV) * 100;
  }

  // 🔹 Trailing Returns
  const oneDay = calcReturn(getPastNAV(1));
  const oneWeek = calcReturn(getPastNAV(7));
  const oneMonth = calcReturn(getPastNAV(30));
  const threeMonth = calcReturn(getPastNAV(90));
  const sixMonth = calcReturn(getPastNAV(180));
  const oneYear = calcReturn(getPastNAV(365));
  const threeYear = calcReturn(getPastNAV(365 * 3));

  // 🔹 YTD
  const currentYear = latest.date.getFullYear();
  const firstOfYear = data.find(d => d.date.getFullYear() === currentYear);
  const ytd = firstOfYear ? calcReturn(firstOfYear.nav) : null;

  // 🔹 Since Inception CAGR
  const firstNAV = data[0].nav;
  const totalYears =
    (latest.date - data[0].date) / (365 * 24 * 60 * 60 * 1000);

  const sinceInception =
    (Math.pow(latestNAV / firstNAV, 1 / totalYears) - 1) * 100;

  // 🔹 Drawdown & Max Drawdown
  let peak = data[0].nav;
  let maxDrawdown = 0;
  let currentDD = 0;

  data.forEach(d => {
    if (d.nav > peak) peak = d.nav;

    const dd = ((d.nav - peak) / peak) * 100;

    if (dd < maxDrawdown) maxDrawdown = dd;
    if (d === latest) currentDD = dd;
  });

  return {
    ytd,
    oneDay,
    oneWeek,
    oneMonth,
    threeMonth,
    sixMonth,
    oneYear,
    threeYear,
    sinceInception,
    currentDD,
    maxDrawdown,
  };
}
