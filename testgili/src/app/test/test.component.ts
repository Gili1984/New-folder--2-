import { Component } from '@angular/core';
import { Stock } from '../service/stock/stock';
import { StockService } from '../service/stock/stock.service';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  books: Stock[] = [];


  constructor(private stockService: StockService,) { }
 
  ngOnInit(): void {
    this.stockService.getAllBooks().subscribe(
      (data: Stock[]) => {
        console.log(data)
        this.books = data; 
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }


  panelOpenState = false;
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 3, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 3, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 3, rows: 1, color: '#DDBDF1'},
  ];
}
