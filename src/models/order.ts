import { Product } from "./product";

export interface Order {
  id: string;
  userId: number;
  products: Array<Product>;
  price: number;
  orderedAt: Date;
  status: string;
  rewardPoints: number;
}
