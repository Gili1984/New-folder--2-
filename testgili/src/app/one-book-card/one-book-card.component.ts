import { Component, Input, OnInit } from '@angular/core';
import { Stock } from '../service/stock/stock';
import { BookDatailsComponent } from '../book-datails/book-datails.component';
import { EditAmpuntComponent } from '../edit-ampunt/edit-ampunt.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { StockService } from '../service/stock/stock.service';
import { DeleteBookDialogComponent } from '../delete-book-dialog/delete-book-dialog.component';

@Component({
  selector: 'app-one-book-card',
  templateUrl: './one-book-card.component.html',
  styleUrl: './one-book-card.component.css'
})
export class OneBookCardComponent implements OnInit {

  @Input() book: any;
  //@Input() isTop!: boolean; 
  // ngOnInit(): void {
  //   throw new Error("this.book");
  // }

  constructor(private stockService: StockService,public dialog: MatDialog, private snackBar: MatSnackBar) {
  
  }
  ngOnInit(): void {
 console.log("tt");
 

  }
  openDialog(book: Stock): void {
    const dialogRef = this.dialog.open(BookDatailsComponent, {
      width: '500px',
      data: { book }
    });
  }
  
editAmount(book: Stock): void {
  const dialogRef = this.dialog.open(EditAmpuntComponent, {
    width: '500px',
    data: { book }
  });
     // Subscribe to the afterClosed() method
     dialogRef.afterClosed().subscribe(result => {
      // If result is true (indicating "YES" was clicked)
      if (result) {
        //this.ngOnInit(); // Fetch the updated list of books
      }
    });
}
  
openDeleteDialog(book: Stock): void {
  const dialogRef = this.dialog.open(DeleteBookDialogComponent, {
    width: '500px',
    data: { book }
  });

  // Subscribe to the afterClosed() method
  dialogRef.afterClosed().subscribe(result => {
    // If result is true (indicating "YES" was clicked)
    if (result) {
      //this.fetchBooks(); // Fetch the updated list of books
    }
  });
}
}
