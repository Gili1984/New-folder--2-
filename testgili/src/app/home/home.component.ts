import { Component, OnInit } from '@angular/core';
import { Stock } from '../service/stock/stock';
import { StockService } from '../service/stock/stock.service';
import { AppModule } from '../app.module';
import { MatCard } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { TopBorrowings } from '../service/borrowing/topBorrowings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',

})
export class HomeComponent implements OnInit  {

  topBorrowings: Stock[] = [];
   //topBorrowings: [Stock, number][] = [];

  constructor(private stockService: StockService) { }
  
  ngOnInit(): void {
    this.fetchTopBorrowings();
  }


  // fetchTopBorrowings(): void {
  //   this.stockService.getTop5BorrowedBooks().subscribe(
  //     (data: TopBorrowings[]) => {
  //       this.topBorrowings = data;
  //       console.log("data",data);
  //       console.log( " this.topBorrowings",this.topBorrowings);
        
  //     },
  //     (error) => {
  //       console.error('Error fetching top borrowings:', error);
  //     }
  //   );
  // }
  fetchTopBorrowings(): void {
    this.stockService.getTop5BorrowedBooks().subscribe(
      (data: Stock[]) => {
        console.log('TopBorrowings data:', data);
        this.topBorrowings = data;
      },
      (error) => {
        console.error('Error fetching top borrowings:', error);
      }
    );
  }


}
