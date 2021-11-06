export interface IProduct {
  name: string;
  link: string;
  imageLink?: string;
  qty?: number;
  brand?: string;
  regularPrice?: number;
  superPrice?: number | null;
  isNotAvailable?: boolean;
  weight?: number;
}
