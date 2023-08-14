import { ObjectId } from "mongodb";

export interface City {
  _id: ObjectId;
  name: string;
  mapUrl: string;
  airport: string;
  population: number;
}
