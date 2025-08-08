import React from 'react';
import {
 Box,
 Card,
 CardContent,
 Typography,
 Container,
 Paper,
 Grid,
 Button,
 ButtonGroup,
 Chip,
} from '@mui/material';
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
import styles from './styles.module.css';
import { chartData, industryRankings, monthlyRevenueData } from '../../data/stockData'
// Stock performance and revenue data

const StockDashboard: React.FC = () => {
 const [stockDataActiveTab, setStockDataActiveTab] = React.useState('detailed');
 const [stockChartActiveTab, setStockChartActiveTab] = React.useState('monthly');

 // 保留占位符以便后续接入真实表格列

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
    <Box className={styles.titleRow}>
     <Typography className={styles.stockCode}>2330</Typography>
     <Typography className={styles.stockName}>台積電</Typography>
     <Typography className={styles.priceDate}>08/08 收盤價：1,175 元</Typography>
     <Typography className={styles.priceDelta}>-5 (-0.42%)</Typography>
    </Box>
    <Button variant="contained" className={styles.followButton} startIcon={<span>+</span>}>
     追蹤
    </Button>
   </Box>

   {/* Stock Chart Section */}
   <Paper elevation={3} className={styles.chartSection}>
    <CardContent>

     <Box className={styles.sectionHeader}>
      <ButtonGroup variant="contained" size="small" className={styles.tabGroup}>
       <Button
        className={stockChartActiveTab === 'monthly' ? styles.activeDataTab : styles.inactiveDataTab}
        onClick={() => setStockChartActiveTab('monthly')}
       >
        每月營收
       </Button>
       <Button
        className={stockChartActiveTab === 'eps' ? styles.activeDataTab : styles.inactiveDataTab}
        onClick={() => setStockChartActiveTab('eps')}
       >
        月營股營收
       </Button>
      </ButtonGroup>
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
        className={stockDataActiveTab === 'detailed' ? styles.activeDataTab : styles.inactiveDataTab}
        onClick={() => setStockDataActiveTab('detailed')}
       >
        詳細數據
       </Button>
       <Button
        className={stockDataActiveTab === 'analysis' ? styles.activeDataTab : styles.inactiveDataTab}
        onClick={() => setStockDataActiveTab('analysis')}
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
         {monthlyRevenueData.map((m) => (
          <th key={m.period} className={styles.dataHeaderCell}>{m.period}</th>
         ))}
        </tr>
       </thead>
       <tbody>
        <tr>
         <td className={styles.rowHeaderCell}>每月營收</td>
         {monthlyRevenueData.map((m) => (
          <td key={`rev-${m.period}`} className={styles.dataCell}>
           {m.revenue.toLocaleString('zh-TW')}
          </td>
         ))}
        </tr>
        <tr>
         <td className={styles.rowHeaderCell}>單月營收年增率 (%)</td>
         {monthlyRevenueData.map((m) => (
          <td key={`gr-${m.period}`} className={styles.dataCell}>
           {m.growthRate}
          </td>
         ))}
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
   <Box className={styles.rankingSection}>
    <CardContent>
     <Typography className={styles.sectionTitle}>
      台積電每月營收在相關產業中的排名
     </Typography>

     <Grid container spacing={3} className={styles.rankingGrid}>
      {industryRankings.map((ranking, index) => (
       <Grid size={{ xs: 12, sm: 6, md: 4 }} style={{ padding: 0 }} key={index}>
        <Card className={styles.rankingCard}>
         <CardContent>
          <Box className={styles.rankingItem}>
           <Box className={styles.rankingInfo}>
            <Typography className={styles.categoryName}>{ranking.category}</Typography>
            <Typography className={styles.rankDescription}>台積電在此族群中排第 {ranking.rank} 名</Typography>
            <Button size="small" variant="text" className={styles.viewRankingLink}>查看完整排名</Button>
           </Box>
           <span className={styles.verticalDivider} />
           <Box className={styles.rankRight}>
            <Box className={styles.rankNumberRow}>
             <span className={styles.rankNumberLarge}>{ranking.rank}</span>
             <span className={styles.rankUnit}>名</span>
            </Box>
            <div className={styles.rankSub}>/ 共 {ranking.totalCompanies} 家</div>
           </Box>
          </Box>
         </CardContent>
        </Card>
       </Grid>
      ))}
     </Grid>
    </CardContent>
   </Box>
  </Container>
 );
};

export default StockDashboard;
