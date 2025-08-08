import Header from "@/components/Header"
import Spacer from "@/components/Spacer"
import style from "./style.module.css"
import PromoCodeBlock from "@/components/PromoCodeBlock"
import Footer from "@/components/Footer"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { getStockData } from "@/service/dataService"
import LeftPanel from "@/components/LeftPanel"
import StockDashboard from "../StockComponent"
import { API } from "@/utils/api.types"

const Home: React.FC = () => {

  const { t } = useTranslation();



  // Main
  const [stockData, setStockData] = useState<API.Stock[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setIsLoading(true);

        // Use the updated functions with dependencies
        const [stockData] = await Promise.all([
          getStockData()
        ]);

        // Set the state with the transformed data
        setStockData(stockData);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return (
    <>
      <Header />
      <PromoCodeBlock
        promoText={t('home.promoText')}
      />
      <div className={style.component}>
        <LeftPanel />
        <section className="container">
          <h1 className={style.heading}>{ }</h1>
          <StockDashboard />
          <div className="contentWrapper">
            <div className="mainContent">
              <Spacer space={20} />
            </div>
          </div>
        </section>
      </div>
      <Spacer space={55} />

      <Footer />
    </>
  )
};

export default Home;
