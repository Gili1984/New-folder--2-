
import { Stock } from "../stock/stock";


// export interface TopBorrowings {
  

//   idBook: Stock;
//   numberOfBorrowings: number;
 
// }
export type BorrowingEntry = [stock:Stock, number:number];

export interface TopBorrowings {
  bookInTopBorrowings: BorrowingEntry;
}