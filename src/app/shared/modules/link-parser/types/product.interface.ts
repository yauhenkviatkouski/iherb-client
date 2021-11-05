export interface IProduct {
  name: string;
  link: string;
  qty?: number;
  brand?: string;
  regularPrice?: number;
  superPrice?: number;
  isNotAvailable?: boolean;
}
