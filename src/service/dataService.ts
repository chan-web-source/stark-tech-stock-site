
// -- Stock Data API --
import { type API } from '../utils/api.types';

export const getStockData = async (
  startDate?: string,
  endDate?: string
): Promise<API.Stock[]> => {
  try {
    const response = await fetch('https://api.finmindtrade.com/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.REACT_APP_FINMIND_API_KEY || ''
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};

// -- Homepage Matches --

type Stock = API.Stock;
