export interface IData {
  country: string;
  data: string;
  color: number;
  created_at: Date;
  updated_at: Date;
}

export type TBatchData = {
  count: number;
  data: IData[];
  limit: number;
};
