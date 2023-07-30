import {Document} from 'mongodb'
export interface Book extends Document {
  isbn: string;
  name: string;
  author: string;
  pages: number;
}
