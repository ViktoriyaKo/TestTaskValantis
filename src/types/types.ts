export interface ICard {
  brand: string | null;
  id: string;
  price: number;
  product: string;
}


export interface IParams {
  [key: string]: string | number | void | unknown[];
}