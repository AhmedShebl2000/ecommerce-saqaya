import { ProductType } from "./product.types";

export interface CartItem {
  product: ProductType;
  qty: number;
}

export interface CartType {
  items: CartItem[];
}
