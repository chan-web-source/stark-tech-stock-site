type CurrencyCode = 'USDT' | 'BTC' | 'ETH' | 'TRX';

interface Wallet {
  id: string;
  balances: Record<CurrencyCode, number>; // Maps specific currency codes to their balances
}

interface SubItem {
  id: string;
  name: string;
  route?: string;
  icon?: string;
  path?: string;
};

interface LeftPanelMenuItem {
  id: string;
  name: string;
  route?: string;
  icon?: string;
};
interface NewsItem {
  id: string;
  title: string;
  image?: string;
  date: string;
  time: string | number;
}

interface DateGroupNewsItem {
  date?: string;
  newsItems?: NewsItem[];
}

export type {
  Wallet,
  SubItem,
  LeftPanelMenuItem,
  NewsItem,
  DateGroupNewsItem,
};