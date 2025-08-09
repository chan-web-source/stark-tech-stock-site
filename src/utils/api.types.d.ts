interface RestResponse<T> {
  status: number;
  message: string;
  data: T;
}

export namespace API {
  export interface Stock {
    id: string;
    startTime: number;
    updatedAt?: string;
    type?: string;
  };

  export interface StockOverview {
    industry_category: string
    stock_id: string
    stock_name: string
    type: string
    date: string
    revenue: number
  }
};

