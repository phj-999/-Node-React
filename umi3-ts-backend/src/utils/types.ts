export interface Data {
  id: string;
  type: string;
  name: string;
  totalPrice: string;
  amount: string;
  address: string;
}

export interface AddData {
  label: string;
  value: string;
}

export type Response = {
  datas: Data[] | AddData[];
  keywords?: string;
  success?: boolean;
  msg?: string;
};
