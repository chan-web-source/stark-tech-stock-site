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
 ResponsiveContainer,
 Label,
} from 'recharts';
import styles from './styles.module.css';
import { industryRankings, monthlyOverviewData } from '../../data/stockData'
import { API } from '@/utils/api.types';
import '@/index.css'
// Stock performance and revenue data

const buildMonthlyChartData = () => {
 const baseYear = 2020; // index 0 對應 2020-01
 const priceArr = monthlyOverviewData.monthly.Price.data
 const revenueArr = monthlyOverviewData.monthly.Revenue.data
 const yoyArr = monthlyOverviewData.monthly.RevenueYOY.data

 const points: Array<{ label: string; tooltipKey: string; revenue: number | null; yoy: number | null; price: number | null }> = []

 const total = Math.max(priceArr.length, revenueArr.length, yoyArr.length)
 for (let i = 0; i < total; i += 1) {
  const priceVal = priceArr[i]?.[1] as string | number | undefined
  const revenueVal = revenueArr[i]?.[1] as string | number | undefined
  const yoyVal = yoyArr[i]?.[1] as string | number | undefined

  const year = baseYear + Math.floor(i / 12)
  const month = (i % 12) + 1
  const mm = String(month).padStart(2, '0')
  const label = `${year}/${mm}`
  const tooltipKey = `${year}${mm}`

  points.push({
   label,
   tooltipKey,
   revenue: typeof revenueVal === 'number' ? revenueVal : (typeof revenueVal === 'string' && !Number.isNaN(parseFloat(revenueVal))) ? parseFloat(revenueVal) : null,
   yoy: typeof yoyVal === 'number' ? yoyVal : (typeof yoyVal === 'string' && !Number.isNaN(parseFloat(yoyVal))) ? parseFloat(yoyVal) : null,
   price: typeof priceVal === 'number' ? priceVal : (typeof priceVal === 'string' && !Number.isNaN(parseFloat(priceVal))) ? parseFloat(priceVal) : null,
  })
 }

 // 近 60 個月（約 5 年），且存在營收資料
 const last60 = points.filter(p => p.revenue !== null).slice(-60)
 return last60
}

const StockDashboard: React.FC<{ stockData: API.Stock[] }> = ({ }) => {
 const [stockDataActiveTab, setStockDataActiveTab] = React.useState('detailed');
 const [stockChartActiveTab, setStockChartActiveTab] = React.useState('monthly');
 const monthlyChartData = React.useMemo(buildMonthlyChartData, [])

 // 保留占位符以便后续接入真实表格列

 const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
   const dataPoint = payload[0]?.payload
   const price = dataPoint?.price
   return (
    <div className={styles.customTooltip}>
     <p className={styles.tooltipLabel}>{`${dataPoint?.tooltipKey}的月均價 = ${price ?? '-'}`}</p>
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
      <ButtonGroup size="small" className={styles.tabGroup}>
       <Box className={styles.topButton}>

        <Button
         className={stockChartActiveTab === 'monthly' ? styles.activeDataTab : styles.inactiveDataTab}
         onClick={() => setStockChartActiveTab('monthly')}
        >
         每月營收
        </Button>
        <Typography className={styles.topButtonText}>千元</Typography>

       </Box>
       <Button
        className={stockChartActiveTab === 'monthly' ? styles.activeDataTab : styles.inactiveDataTab}
        onClick={() => setStockChartActiveTab('monthly')}
       >
        近5年
       </Button>
       {/* <Button
        className={stockChartActiveTab === 'eps' ? styles.activeDataTab : styles.inactiveDataTab}
        onClick={() => setStockChartActiveTab('eps')}
       >
        月營股營收
       </Button> */}
      </ButtonGroup>
     </Box>

     <Box className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height={400}>
       <ComposedChart data={monthlyChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis
         dataKey="label"
         axisLine={false}
         tickLine={false}
         interval={0}
         ticks={monthlyChartData.filter(d => d.label.endsWith('/01')).map(d => d.label)}
         tickFormatter={(v: string) => v.slice(0, 4)}
         tick={{ fontSize: 12, fill: '#666' }}
        />
        <YAxis
         yAxisId="left"
         orientation="left"
         axisLine={false}
         tickLine={false}
         tick={{ fontSize: 12, fill: '#666' }}
         tickFormatter={(v: number) => v.toLocaleString('en-US')}
        >
         {/* <Label value="千元" position="top"
          offset={30}
         /> */}
        </YAxis>
        <YAxis
         yAxisId="right"
         orientation="right"
         axisLine={false}
         tickLine={false}
         tick={{ fontSize: 12, fill: '#666' }}
        >
         <Label value="%" position="insideTopRight" offset={-100} />
        </YAxis>
        <Tooltip content={<CustomTooltip />} />
        <Legend align="left" verticalAlign="top" wrapperStyle={{ top: 10 }} />
        <Bar
         yAxisId="left"
         dataKey="revenue"
         fill="#fbbf24"
         name="每月營收"
         barSize={6}
         radius={[2, 2, 0, 0]}
        />
        <Line
         yAxisId="right"
         type="monotone"
         dataKey="yoy"
         stroke="#ef4444"
         strokeWidth={3}
         name="單月營收年增率"
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
      <ButtonGroup size="small" className={styles.tabGroup}>
       <Button
        className={stockDataActiveTab === 'detailed' ? styles.activeDataTab : styles.inactiveDataTab}
        onClick={() => setStockDataActiveTab('detailed')}
       >
        詳細數據
       </Button>
       {/* <Button
        className={stockDataActiveTab === 'analysis' ? styles.activeDataTab : styles.inactiveDataTab}
        onClick={() => setStockDataActiveTab('analysis')}
       >
        指標解釋
       </Button> */}
      </ButtonGroup>
     </Box>

     <Box className={styles.tableContainer}>
      <table className={styles.financialTable}>
       <thead>
        <tr>
         <th className={styles.headerCell}>年度/月份</th>
         {monthlyChartData.map((m) => (
          <th key={m.label} className={styles.dataHeaderCell}>{m.label}</th>
         ))}
        </tr>
       </thead>
       <tbody>
        <tr>
         <td className={styles.rowHeaderCell}>每月營收</td>
         {monthlyChartData.map((m) => (
          <td key={`rev-${m.label}`} className={styles.dataCell}>
           {m.revenue != null ? m.revenue.toLocaleString('zh-TW') : '-'}
          </td>
         ))}
        </tr>
        <tr>
         <td className={styles.rowHeaderCell}>單月營收年增率 (%)</td>
         {monthlyChartData.map((m) => (
          <td key={`yoy-${m.label}`} className={styles.dataCell}>
           {m.yoy != null ? m.yoy : '-'}
          </td>
         ))}
        </tr>
       </tbody>
      </table>
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



  </Container>
 );
};

export default StockDashboard;
