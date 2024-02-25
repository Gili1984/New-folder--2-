import { DatePipe } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Publisher } from '../service/publisher/publisher';
import { PublishersService } from '../service/publisher/publisher.service';
import { catchError } from 'rxjs';
import { Stock } from '../service/stock/stock';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
  resultsLength = 0;
  displayedColumns: string[] = ['idBook','bookName','price','amount'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public dialog: MatDialog, private datePipe: DatePipe,private publisherService:PublishersService,
    @Inject(MAT_DIALOG_DATA) public data: { publisher: Publisher },
 
  ) { }

  booksPerPublisher:Stock[]=[];
  //totalPrices: number = 0;
  ngOnInit(): void {
    console.log(this.data.publisher.idPublishers);
    
    this.getBooksOfPublisher()
  }

  getBooksOfPublisher(): void {
    this.publisherService.findStocksByPublisherAndNotDeleted(this.data.publisher.idPublishers)
    this.publisherService.findStocksByPublisherAndNotDeleted(this.data.publisher.idPublishers)
    .pipe(
      catchError(error => {
        console.error(`Error fetching findStocksByPublisherAndNotDeleted`, error);
        throw error;
      })
    )
    .subscribe(
      (data: Stock[]) => {
        this.booksPerPublisher = data;
      }
    );
   }
   getTotalPrice(){
   return this.booksPerPublisher.reduce((total, book) => {
    return total + ((book.price || 0) * (book.amount || 0));
  }, 0);}


  //  getTotalPrice() {
  //   return this.booksPerPublisher.reduce((total, book) => total + (book.price || 0), 0)*(book.amount);
  // }
//   getTotalPrice(): number {
//     let totalPrice = 0;
//     if (this.booksPerPublisher) {
//       this.booksPerPublisher.forEach(book => {
//         totalPrice += (book.price||0 * book.amount);
//       });
//     }
//     return totalPrice;
//   }
}
