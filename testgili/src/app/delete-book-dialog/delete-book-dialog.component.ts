import { Component, Inject } from '@angular/core';
import { Stock } from '../service/stock/stock';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StockService } from '../service/stock/stock.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-book-dialog',
  templateUrl: './delete-book-dialog.component.html',
  styleUrl: './delete-book-dialog.component.css'
})
export class DeleteBookDialogComponent {

  constructor(private stockService: StockService,private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { book: Stock },
    public dialogRef: MatDialogRef<DeleteBookDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  deleteBook(book: any): void {
 
   this.dialogRef.close(true);
    const bookId = book.idBook; // Assuming the id of the book is stored in 'id' property
    console.log(bookId);
    this.stockService.softDeleteIfNoOpenBorrows(bookId).subscribe(
      () => {
        console.log('Book soft deleted successfully');
        //this.fetchBooks(); // Fetch the updated list of books after deletion
        this.snackBar.open('Book deleted successfully', 'Close', {
          duration: 3000
        });
      },
      (error) => {
        console.error('Error deleting book:', error);
        // Handle error if deletion fails
        this.snackBar.open('Error deleting book', 'Close', {
          duration: 3000
        });
      }
    );
  }
}
