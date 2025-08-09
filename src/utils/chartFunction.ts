export function getMonthlyRevenueGrowthRate(
 currentRevenue: number,
 lastYearRevenue: number,
 precision = 2
): string {
 if (lastYearRevenue === 0) {
  return "N/A";
 }

 const rate = (currentRevenue / lastYearRevenue - 1) * 100;
 return `${rate.toFixed(precision)}%`;
}