import {Document} from 'mongodb'

export interface Animals extends Document {
  name: string;
  specie: string;
  height: number;
  weight: number;
}


// mammals
// birds
// reptiles
// invertebrates