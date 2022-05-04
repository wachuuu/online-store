import { IProduct } from "./product.model";

export interface ICartItem {
  product: IProduct,
  quantity: number,
}