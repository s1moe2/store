import { Document } from "mongodb";

export interface City {
    id: string;
    name: string;
    mapUrl: string;
    airport: string;
    population: number;
  }