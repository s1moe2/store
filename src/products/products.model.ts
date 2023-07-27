export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

export interface TopProducts {
  id: number;
  name: string;
  count: number;
}
