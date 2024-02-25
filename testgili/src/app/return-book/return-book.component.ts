import { Component } from '@angular/core';
import { AppModule } from '../app.module';
import { Reader } from '../service/readers/reader';
import { HttpClient } from '@angular/common/http';
import { Borrow } from '../service/borrowing/borrowing';
import { Observable, catchError, map, startWith } from 'rxjs';
import { BorrowingService } from '../service/borrowing/borrowing.service';
import { BorrowUpdate } from '../service/borrowing/borrowUpdate';
import { StockService } from '../service/stock/stock.service';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Stock } from '../service/stock/stock';


import { Category} from '../service/stock/stock';

import { ReaderService } from '../service/readers/reader.service';
import { AsyncPipe } from '@angular/common';
import { Location } from '@angular/common';

import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIcon } from '@angular/material/icon';
import { MatCard } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {NgModule } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReturnDialogComponent } from '../return-dialog/return-dialog.component';

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrl: './return-book.component.css',
  // standalone:true,
  // imports:[MatFormField,MatLabel,MatInput,FormsModule,MatIcon,MatCard,MatOption,MatSelectModule,MatCardModule,CommonModule,MatFormFieldModule,FormsModule,
    
  //   RouterModule, // Include RouterModule in imports array
  //   MatDialogModule, // Include MatDialogModule if not already imported
  //   BrowserAnimationsModule ,
  //   MatInputModule,
  //   MatAutocompleteModule,
  //   ReactiveFormsModule,
  //   AsyncPipe
  
  // ]

})
export class ReturnBookComponent {
  bookId!: string;
  readers: Reader[] = [];; // Assuming you have a readers array to store the list of readers
  selectedReaderId!: number; 
  borrowForDialog!:Borrow;
  constructor(private location: Location
    ,private borrowingService: BorrowingService,
    private stockService: StockService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) {}

  myControl = new FormControl('');
  options:  Stock[] = [];

  filteredOptions!: Observable<Stock[]>;
  filterToGetBorrowForDialog!:Borrow[];
  bookForDialog!: Stock; 
  idReaderForDialog!: any;

ngOnInit() {
 
 this.fetchAllBooks()
 this.filteredOptions = this.myControl.valueChanges.pipe(
   startWith(''),
   map(value => this._filter(value as string))
 );

}
goBack(): void {
  this.location.back();
}

validateAndReturn(): void {
  if (!this.isFormValid()) {
    alert('Please fill in all the fields.');
    return;
  }}



private _filter(value: string | null): any[] {
  const filterValue = typeof value === 'string' ? value.toLowerCase() : '';
  return this.options.filter(option => {
    return option.bookName.toLowerCase().includes(filterValue) || option.idBook.toString().includes(filterValue);
  });
}
fetchAllBooks(): void {

 this.stockService.getAllBooks().subscribe(
   (books: any[]) => {
     this.options = books;
     console.log(this.options);
     
   },
   (error) => {
     console.error('Error fetching books:', error);
   }
 );
}


onBookSelected(book:Stock): void {
  this.bookId = book.idBook.toString();

  // this.fetchBorrowingRecordsReaders();
  this.fetchBorrowingRecordsReaders((data: Borrow[]) => {});
}


openDialog(): void {
  this.validateAndReturn()
  this.fetchBorrowingRecordsReaders((data: Borrow[]) => {
    console.log(this.filterToGetBorrowForDialog);
    const dialogRef = this.dialog.open(ReturnDialogComponent, {
      width: '500px',
      data: { borrowing: this.filterToGetBorrowForDialog[0]}
    });
  });
   


}

  fetchBorrowingRecordsReaders(callback: (data: Borrow[]) => void): void  {
    console.log(this.readers);
    console.log(this.bookId);
    if (this.bookId) {
      this.borrowingService.getBorrowingByBookId(this.bookId).subscribe(
        (data: Borrow[]) => {
          console.log(data);
          const filteredReturnNull = data.filter(borrow => borrow.dateReturn === null);
         
          this.readers = filteredReturnNull.map(borrow => borrow.idReader);
          this.filterToGetBorrowForDialog=filteredReturnNull.filter(borrow => borrow.idReader.idReader === this.selectedReaderId);
          if (this.filterToGetBorrowForDialog.length > 0) {
            console.log(this.filterToGetBorrowForDialog[0].idBook);
          } else {
            console.log('filterToGetBorrowForDialog is empty');
          }
          callback(filteredReturnNull);
        },
        (error) => {
          console.error('Error fetching borrowing records:', error);
        }
      );
    }
  }

  private getDateFromString(value: string | null): Date {
    return value ? new Date(value) : new Date();
  }



  isFormValid(): boolean {
    return !!this.selectedReaderId && !!this.myControl.value && this.myControl.valid;
  }
  
  returnBook(): void {
    console.log("return");
  }


  onDateReturnChange(): void {
    if (this.selectedReaderId && this.bookId) {
      this.borrowingService.getBorrowingByBookId(this.bookId).subscribe(
        (borrowings: Borrow[]) => {
          // Filter borrowings for the selected reader
          const borrowingsForSelectedReader = borrowings.filter(borrowing => borrowing.idReader.idReader === this.selectedReaderId);
  
          // Update return date to today's date for borrowings with null return date
          const currentDate = new Date(); // Get current date
          const borrowingsToUpdate = borrowingsForSelectedReader.filter(borrowing => !borrowing.dateReturn);
          borrowingsToUpdate.forEach(borrowing => {
            borrowing.dateReturn = currentDate; // Assign Date object directly
            this.updateAmountInLibrary(parseInt(this.bookId, 10));
  
            // Update borrowing record in the backend
            this.borrowingService.updateBorrowingDateReturn(borrowing.idBorrowing).subscribe(
              (response: string) => {
                // Handle successful update
                console.log('Borrowing updated successfully:', response);
                this.showSuccessMessage(); 
              },
              (error) => {
                console.error('Error updating borrowing:', error);
              }
            );
          });
        },
        (error) => {
          console.error('Error fetching borrowing records:', error);
        }
      );
    }
  }
  
  
  

  
  updateAmountInLibrary(bookId: number): void {
 
    // Call the service method to update amountInLibrary
    this.stockService.updateAmountInLibrary(bookId).pipe(
      catchError(error => {
        console.error('Error updating amount in Library:', error);
        throw error;
      })
    ).subscribe(
      () => {
        console.log('Amount in Library updated successfully');
      }
    );
  }



  showSuccessMessage(): void {
    this.snackBar.open('Return successful', 'Close', {
        duration: 2000, // Duration of the message display
    });}

}
