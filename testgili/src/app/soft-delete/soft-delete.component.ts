import { Component, Inject } from '@angular/core';
import { ReaderService } from '../service/readers/reader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Reader } from '../service/readers/reader';
import { BorrowingService } from '../service/borrowing/borrowing.service';
import { catchError } from 'rxjs';
import { Borrow } from '../service/borrowing/borrowing';
import { PublishersService } from '../service/publisher/publisher.service';

@Component({
  selector: 'app-soft-delete',
  templateUrl: './soft-delete.component.html',
  styleUrl: './soft-delete.component.css'
})
export class SoftDeleteComponent {
  constructor(private readerService: ReaderService,
    private publisherService: PublishersService,
    private snackBar: MatSnackBar,
    private borrowingService: BorrowingService,
    @Inject(MAT_DIALOG_DATA) public data:  any,
    public dialogRef: MatDialogRef<SoftDeleteComponent>
  ) {   }

  ngOnInit(): void {
  
    console.log('Dialog data:', this.data.objectType);

  }

  confirmDelete(): void {
    if (this.data.objectType === 'Reader') {
        this.deleteReader(this.data.reader.idReader); // Call deleteReader method
    } else if (this.data.objectType === 'Publisher') {
        this.deletePublisher(this.data.publisher.idPublishers); // Call deletePublisher method
    } else {
        console.error('Unknown object type:', this.data.objectType);
    }
}



deleteReader(readerId: number): void {
  // Implement delete logic for reader
  console.log('Deleting reader with ID:', readerId);
  this.deleteR(readerId)
}

deletePublisher(publisherId: number): void {
  // Implement delete logic for publisher
  console.log('Deleting publisher with ID:', publisherId);
  this.deleteP(publisherId)
}






deleteP(publisherId:number):void {
  //this.chekIfValid(idReader);
  this.dialogRef.close(true);
  console.log(publisherId);
  this.publisherService.softDeletePublisherIfNoStocks(publisherId).subscribe(
    (res) => {
      console.log('publisherId soft deleted successfully');
      //this.fetchBooks(); // Fetch the updated list of books after deletion
      this.snackBar.open('publisherId deleted successfully', 'Close', {
        duration: 3000
      });
    },
    (error) => {
      console.error('Error deleting publisherId:', error);
      // Handle error if deletion fails
      this.snackBar.open('Error deleting publisherId', 'Close', {
        duration: 3000
      });
    }
  );
}


deleteR(idReader:number):void {
    //this.chekIfValid(idReader);
    this.dialogRef.close(true);
    console.log(idReader);
    this.readerService.softDeleteIfNoOpenBorrows(idReader).subscribe(
      () => {
        console.log('reader soft deleted successfully');
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



