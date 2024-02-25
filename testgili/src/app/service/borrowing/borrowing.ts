import { Reader } from "../readers/reader";
import { Stock } from "../stock/stock";


export interface Borrow {
  idBorrowing: number;
  idReader: Reader;
  idBook: Stock;
  dateBorrowing: Date;
  dateReturn: Date | null; 
}