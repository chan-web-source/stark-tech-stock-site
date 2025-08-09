"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, Typography, Box, Button, Grid } from "@mui/material"
import styles from "./styles.module.css"
import { API } from '@/utils/api.types';

const getTypeDisplay = (type: string): string => {
 switch (type) {
  case "stock":
   return "股票"
  case "fund":
   return "基金"
  default:
   return type
 }
}

type RankGraphProps = {
 title?: string;
 data?: API.StockOverview[];
}

const RankGraph: React.FC<RankGraphProps> = ({ title = '綜合排行', data }) => {
 const [showAll, setShowAll] = useState(false)
 const sourceData = data ?? []
 const displayData = showAll ? sourceData : sourceData.slice(0, 5)

 const getRankingColor = (rank: number): string => {
  switch (rank) {
   case 1:
    return styles.goldRank
   case 2:
    return styles.silverRank
   case 3:
    return styles.bronzeRank
   default:
    return styles.defaultRank
  }
 }

 const formatRevenue = (revenue: number): string => {
  return revenue.toLocaleString()
 }

 return (
  <Card className={styles.card}>
   <CardContent className={styles.cardContent}>
    <Typography className={styles.categoryTitle}>
     {title}
    </Typography>

    <Grid container className={styles.headerRow} alignItems="center" wrap="nowrap" columnSpacing={2}>
     <Grid size={{ xs: 2 }}>
      <Typography variant="body1" className={styles.headerText}>排名</Typography>
     </Grid>
     <Grid size={{ xs: 4 }}>
      <Typography variant="body1" className={styles.headerText}>公司</Typography>
     </Grid>
     <Grid size={{ xs: 6 }}>
      <Typography variant="body1" className={styles.headerTextRight}>每月營收 (千台幣)</Typography>
     </Grid>
    </Grid>

    <div className={styles.stockList}>
     {displayData.map((stock, index) => (
      <Grid container key={stock.stock_id} className={styles.stockRow} alignItems="center" wrap="nowrap" columnSpacing={2}>
       <Grid size={{ xs: 2 }} className={styles.rankBadgeContainer}>
        <div className={`${styles.rankBadge} ${getRankingColor(index + 1)}`}>{index + 1}</div>
       </Grid>
       <Grid size={{ xs: 4 }}>
        <Grid container alignItems="center" columnSpacing={2} wrap="nowrap">
         <Grid size={{ xs: 6 }}>
          <div className={styles.companyInfo}>
           <Typography variant="h6" className={styles.stockId}>
            {stock.stock_id}
           </Typography>
           <Typography variant="body2" className={styles.stockName}>
            {stock.stock_name}
           </Typography>
           <Typography variant="caption" className={styles.industryCategory}>
            {stock.industry_category}
           </Typography>
          </div>
         </Grid>
         <Grid size={{ xs: 3 }}>
          <Typography variant="body1" className={styles.typeColumn}>
           {getTypeDisplay(stock.type)}
          </Typography>
         </Grid>
        </Grid>
       </Grid>
       <Grid size={{ xs: 6 }}>
        <Typography variant="h6" className={styles.revenue}>
         {formatRevenue(stock.revenue)}
        </Typography>
       </Grid>
      </Grid>
     ))}
    </div>

    {(!showAll) && (
     <Box className={styles.expandButtonContainer}>
      <Button variant="text" className={styles.expandButton} onClick={() => setShowAll(true)}>
       展開查看 6~10 名
      </Button>
     </Box>
    )}
   </CardContent>
  </Card>
 )
}

export default RankGraph


