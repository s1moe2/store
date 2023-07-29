import { Document } from "mongodb";

export interface Vegetables extends Document {
  name: string;
  color: string;
  price: number;
}
