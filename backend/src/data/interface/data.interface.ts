export interface IData {
  country: string;
  data: {
    x: string;
    y: number;
  }[];
  color: string;
  created_at?: Date;
  updated_at?: Date;
}

export type TBatchData = {
  count: number;
  data: IData[];
  limit: number;
};
