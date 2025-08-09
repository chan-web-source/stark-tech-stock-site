"use client"

import type React from "react"
import { Grid, Card, Typography } from "@mui/material"
import RankBox from "./RankBox"
import styles from "./styles.module.css"
import { stockOverviewData } from "@/data/stockData"
import '@/index.css'

// 將資料依據 type 分組，最多取前兩個類別
const groupByType = (data: typeof stockOverviewData) => {
 const map = new Map<string, typeof stockOverviewData>()
 for (const item of data) {
  if (!map.has(item.industry_category)) {
   map.set(item.industry_category, [])
  }
  map.get(item.industry_category)!.push(item)
 }
 return Array.from(map.entries()).slice(0, 2)
}

const StockOverviewRank: React.FC = () => {
 const groups = groupByType(stockOverviewData)

 return (
  <div className={styles.container}>
   <Typography className="sectionTitle">
    相關產業公司數據排行榜
   </Typography>
   <Grid container spacing={3}>
    {groups.map(([category, items]) => (
     <Grid key={category} size={{ xs: 12, md: 6 }}>
      <Card className={styles.card}>
       <RankBox title={category} data={items} />
      </Card>
     </Grid>
    ))}
   </Grid>
  </div>
 )
}

export default StockOverviewRank