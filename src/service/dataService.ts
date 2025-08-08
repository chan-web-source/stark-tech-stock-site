
// -- Stock Data API --
import { type API } from '../utils/api.types';

export const getStockData = async (
  startDate: string = "2020-04-02",
  endDate: string = "2020-04-08"
): Promise<API.Stock[]> => {
  try {
    const url = import.meta.env.VITE_API_BASE_URL || '';
    const token = import.meta.env.VITE_FINMIND_TOKEN || '';

    const queryParams = new URLSearchParams({
      dataset: "TaiwanStockPriceAdj",
      data_id: "2330",
      start_date: "2025-07-01",
      end_date: "2025-07-08"
    });

    // 使用本地代理端点避免CORS问题
    const proxyUrl = '/api/stock-data';

    const response = await fetch(`${proxyUrl}?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const json = await response.json();
    console.log(json, '==json');
    // FinMind returns shape: { msg, status, data }
    return json?.data ?? [];
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};

// -- Homepage Matches --
