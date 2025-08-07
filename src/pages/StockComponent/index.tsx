import React from 'react';
import {
 Box,
 Card,
 CardContent,
 Typography,
 Container,
 Paper,
 Chip,
 Grid,
 Button,
 ButtonGroup
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
 ComposedChart,
 Bar,
 Line,
 XAxis,
 YAxis,
 CartesianGrid,
 Tooltip,
 Legend,
 ResponsiveContainer
} from 'recharts';
import { TrendingUp, ShowChart } from '@mui/icons-material';
import styles from './styles.module.css';

// Stock performance and revenue data
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

const StockDashboard: React.FC = () => {
 const [activeTab, setActiveTab] = React.useState('detailed');

 // DataGrid columns
 const columns: GridColDef[] = [
  {
   field: 'period',
   headerName: '年度/月份',
   width: 150,
   headerClassName: styles.gridHeader
  },
  {
   field: 'revenue',
   headerName: '每月營收',
   width: 200,
   type: 'number',
   headerClassName: styles.gridHeader,
   valueFormatter: (params) => {
    return new Intl.NumberFormat('zh-TW').format(params.value);
   }
  },
  {
   field: 'growthRate',
   headerName: '單月營收年增率 (%)',
   width: 200,
   type: 'number',
   headerClassName: styles.gridHeader,
   renderCell: (params) => (
    <Box className={params.value > 0 ? styles.positiveGrowth : styles.negativeGrowth}>
     {params.value}%
    </Box>
   )
  },
 ];

 const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
   return (
    <div className={styles.customTooltip}>
     <p className={styles.tooltipLabel}>{`${label}`}</p>
     <p className={styles.tooltipRevenue}>
      {`每月營收: ${payload[0]?.value?.toLocaleString()} 億`}
     </p>
     <p className={styles.tooltipStock}>
      {`月均價: ${payload[1]?.value} 元`}
     </p>
    </div>
   );
  }
  return null;
 };

 return (
  <Container maxWidth="xl" className={styles.container}>
   {/* Header */}
   <Box className={styles.header}>
    <Box className={styles.titleSection}>
     <Typography variant="h6" className={styles.title}>
      <ShowChart className={styles.icon} />
      台積電 (2330)
     </Typography>
     <Box className={styles.priceInfo}>
      <Typography variant="h5" className={styles.currentPrice}>
       台灣 08/07 收盤價 1,180 元
      </Typography>
      <Chip
       label="+55 (+4.89%)"
       className={styles.priceChange}
       size="small"
      />
     </Box>
    </Box>
    <Button variant="contained" className={styles.followButton}>
     + 追蹤
    </Button>
   </Box>

   {/* Stock Chart Section */}
   <Paper elevation={3} className={styles.chartSection}>
    <CardContent>
     <Box className={styles.chartHeader}>
      <ButtonGroup variant="contained" className={styles.chartTabs}>
       <Button
        className={activeTab === 'monthly' ? styles.activeTab : styles.inactiveTab}
        onClick={() => setActiveTab('monthly')}
       >
        每月營收
       </Button>
       <Button
        className={activeTab === 'eps' ? styles.activeTab : styles.inactiveTab}
        onClick={() => setActiveTab('eps')}
       >
        月營股營收
       </Button>
      </ButtonGroup>
      <Chip label="近 5 年" variant="outlined" className={styles.timeRange} />
     </Box>

     <Box className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height={400}>
       <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis
         dataKey="year"
         axisLine={false}
         tickLine={false}
         tick={{ fontSize: 12, fill: '#666' }}
        />
        <YAxis
         yAxisId="left"
         orientation="left"
         axisLine={false}
         tickLine={false}
         tick={{ fontSize: 12, fill: '#666' }}
         label={{ value: '', angle: 0, position: 'insideTopLeft' }}
        />
        <YAxis
         yAxisId="right"
         orientation="right"
         axisLine={false}
         tickLine={false}
         tick={{ fontSize: 12, fill: '#666' }}
         label={{ value: '股價', angle: 0, position: 'insideTopRight' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar
         yAxisId="left"
         dataKey="revenue"
         fill="#fbbf24"
         name="每月營收"
         radius={[2, 2, 0, 0]}
        />
        <Line
         yAxisId="right"
         type="monotone"
         dataKey="stockPrice"
         stroke="#ef4444"
         strokeWidth={3}
         name="月均價"
         dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
        />
       </ComposedChart>
      </ResponsiveContainer>
     </Box>
    </CardContent>
   </Paper>

   {/* Financial Data Section */}
   <Paper elevation={3} className={styles.dataSection}>
    <CardContent>
     <Box className={styles.sectionHeader}>
      <ButtonGroup variant="contained" size="small" className={styles.tabGroup}>
       <Button
        className={activeTab === 'detailed' ? styles.activeDataTab : styles.inactiveDataTab}
        onClick={() => setActiveTab('detailed')}
       >
        詳細數據
       </Button>
       <Button
        className={activeTab === 'analysis' ? styles.activeDataTab : styles.inactiveDataTab}
        onClick={() => setActiveTab('analysis')}
       >
        指標解釋
       </Button>
      </ButtonGroup>
     </Box>

     <Box className={styles.tableContainer}>
      <table className={styles.financialTable}>
       <thead>
        <tr>
         <th className={styles.headerCell}>年度/月份</th>
         <th className={styles.dataHeaderCell}>2025/02</th>
         <th className={styles.dataHeaderCell}>2025/03</th>
         <th className={styles.dataHeaderCell}>2025/04</th>
         <th className={styles.dataHeaderCell}>2025/05</th>
         <th className={styles.dataHeaderCell}>2025/06</th>
        </tr>
       </thead>
       <tbody>
        <tr>
         <td className={styles.rowHeaderCell}>每月營收</td>
         <td className={styles.dataCell}>260,008,796</td>
         <td className={styles.dataCell}>285,956,830</td>
         <td className={styles.dataCell}>349,566,940</td>
         <td className={styles.dataCell}>320,515,951</td>
         <td className={styles.dataCell}>263,708,978</td>
        </tr>
        <tr>
         <td className={styles.rowHeaderCell}>單月營收年增率 (%)</td>
         <td className={styles.dataCell}>43.14</td>
         <td className={styles.dataCell}>46.49</td>
         <td className={styles.dataCell}>48.11</td>
         <td className={styles.dataCell}>39.59</td>
         <td className={styles.dataCell}>26.86</td>
        </tr>
       </tbody>
      </table>

      {/* Horizontal scrollbar */}
      <Box className={styles.scrollbarContainer}>
       <Box className={styles.scrollbar}></Box>
      </Box>
     </Box>

     <Box className={styles.footerNote}>
      <Typography variant="caption" className={styles.dataNote}>
       表格單位：千元，數據來自公開資訊觀測站
       <br />
       網頁圖表歡迎轉貼引用，請註明出處為財報狗
      </Typography>
     </Box>
    </CardContent>
   </Paper>

   {/* Industry Rankings Section */}
   <Paper elevation={3} className={styles.rankingSection}>
    <CardContent>
     <Typography className={styles.sectionTitle}>
      台積電每月營收在相關產業中的排名
     </Typography>

     <Grid container spacing={3} className={styles.rankingGrid}>
      {industryRankings.map((ranking, index) => (
       <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
        <Card className={styles.rankingCard}>
         <CardContent>
          <Box className={styles.rankingHeader}>
           <Typography variant="h6" className={styles.categoryName}>
            {ranking.category}
           </Typography>
           <Box className={styles.rankBadge}>
            <Typography variant="h4" className={styles.rankNumber}>
             {ranking.rank}
            </Typography>
            <Typography variant="caption">名</Typography>
           </Box>
          </Box>
          <Typography variant="body2" className={styles.rankDescription}>
           {ranking.description}
          </Typography>
          <Typography variant="caption" className={styles.totalCompanies}>
           / 共 {ranking.totalCompanies} 家
          </Typography>
          <Button
           size="small"
           className={styles.viewRankingButton}
           onClick={() => console.log(`View ${ranking.category} ranking`)}
          >
           查看完整排名
          </Button>
         </CardContent>
        </Card>
       </Grid>
      ))}
     </Grid>
    </CardContent>
   </Paper>
  </Container>
 );
};

export default StockDashboard;
