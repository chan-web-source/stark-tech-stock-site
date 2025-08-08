import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import styles from './style.module.css';

interface PromoProps {
  bookmakerLogo?: string;
  promoCode?: string;
  promoText?: string;
}

const PromoCodeBlock: React.FC<PromoProps> = () => {

  const handleContinueClick = () => {
    // 处理继续按钮点击
    console.log('Continue button clicked');
  };

  return (
    <Box className={styles.gradientBanner}>
      <Box className={styles.bannerContent}>
        {/* 主标题 */}
        <Typography variant="h4" className={styles.headline}>
          免費註冊,一眼判斷公司值不值得投資
        </Typography>

        {/* 详细描述 */}
        <Typography variant="body1" className={styles.description}>
          台股和美股 7000+家公司,財報狗個股頁提供你:7種進出場參考指標、9種安全性指標、22種獲利性指標、13種成長性指標,幫助你一眼判斷公司的投資價值,避開地雷股。
        </Typography>

        {/* 继续按钮 */}
        <Button
          variant="contained"
          className={styles.continueButton}
          onClick={handleContinueClick}
        >
          點我繼續
        </Button>
      </Box>
    </Box>
  );
};

export default PromoCodeBlock;