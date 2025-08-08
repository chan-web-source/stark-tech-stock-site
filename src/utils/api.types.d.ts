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


};

