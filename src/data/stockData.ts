const chartData = [
 { year: '2021', month: 'Q1', revenue: 1200, stockPrice: 300 },
 { year: '2021', month: 'Q2', revenue: 1350, stockPrice: 320 },
 { year: '2021', month: 'Q3', revenue: 1400, stockPrice: 350 },
 { year: '2021', month: 'Q4', revenue: 1500, stockPrice: 380 },
 { year: '2022', month: 'Q1', revenue: 1600, stockPrice: 420 },
 { year: '2022', month: 'Q2', revenue: 1750, stockPrice: 450 },
 { year: '2022', month: 'Q3', revenue: 1800, stockPrice: 480 },
 { year: '2022', month: 'Q4', revenue: 1900, stockPrice: 500 },
 { year: '2023', month: 'Q1', revenue: 1650, stockPrice: 420 },
 { year: '2023', month: 'Q2', revenue: 1700, stockPrice: 450 },
 { year: '2023', month: 'Q3', revenue: 1800, stockPrice: 480 },
 { year: '2023', month: 'Q4', revenue: 2000, stockPrice: 520 },
 { year: '2024', month: 'Q1', revenue: 2200, stockPrice: 600 },
 { year: '2024', month: 'Q2', revenue: 2400, stockPrice: 700 },
 { year: '2024', month: 'Q3', revenue: 2600, stockPrice: 800 },
 { year: '2024', month: 'Q4', revenue: 2800, stockPrice: 900 },
 { year: '2025', month: 'Q1', revenue: 3000, stockPrice: 1000 },
 { year: '2025', month: 'Q2', revenue: 3200, stockPrice: 1180 },
];

// Monthly revenue data for DataGrid
const monthlyRevenueData = [
 { id: 1, period: '2025/02', revenue: 260008796, growthRate: 43.14 },
 { id: 2, period: '2025/03', revenue: 285956830, growthRate: 46.49 },
 { id: 3, period: '2025/04', revenue: 349566940, growthRate: 48.11 },
 { id: 4, period: '2025/05', revenue: 320515951, growthRate: 39.59 },
 { id: 5, period: '2025/06', revenue: 263708978, growthRate: 26.86 },
];

// Industry ranking data
const industryRankings = [
 { category: 'HPC', rank: 2, totalCompanies: 48, description: '台積電在此族群中排第 2 名' },
 { category: 'HBM', rank: 1, totalCompanies: 1, description: '台積電在此族群中排第 1 名' },
 { category: 'Apple Vision Pro', rank: 1, totalCompanies: 9, description: '台積電在此族群中排第 1 名' },
 { category: '蘋果', rank: 2, totalCompanies: 19, description: '台積電在此族群中排第 2 名' },
 { category: '晶片製造', rank: 1, totalCompanies: 3, description: '台積電在此族群中排第 1 名' },
 { category: '硬化錄基板', rank: 1, totalCompanies: 8, description: '台積電在此族群中排第 1 名' },
];

export { chartData, monthlyRevenueData, industryRankings };