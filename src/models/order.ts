interface Order {
  id: String;
  userId: number;
  products: Array<Product>;
  price: number;
  orderedAt: Date;
  status: String;
  rewardPoints: number;
}
