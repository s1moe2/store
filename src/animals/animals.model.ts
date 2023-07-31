import {Document} from 'mongodb'

export interface Animals extends Document {
  name: string;
  specie: string;
  height: number; //in cm
  weight: number; //in kg
}
