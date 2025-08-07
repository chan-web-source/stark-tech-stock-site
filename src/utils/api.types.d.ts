interface RestResponse<T> {
  status: number;
  message: string;
  data: T;
}

declare namespace API {
  export interface Stock {
    id: string;
    startTime: number;
    updatedAt?: string;
    type?: string;
  };


};

