import { AfterViewInit, Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Borrow } from '../service/borrowing/borrowing';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BorrowingService } from '../service/borrowing/borrowing.service';
import { StockService } from '../service/stock/stock.service';
import { DatePipe, Location } from '@angular/common';
import { BorrowUpdate } from '../service/borrowing/borrowUpdate';
import { Subject, catchError } from 'rxjs';
import { AppModule } from '../app.module';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchBookComponent } from '../search-book/search-book.component';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ReturnDialogComponent } from '../return-dialog/return-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from '../service/shared.serice';



@Component({
  selector: 'app-borrowing',
  templateUrl: './borrowing.component.html',
  styleUrl: './borrowing.component.css',
  // standalone:true,
  // imports:[RouterLink,MatTableModule,FormsModule,CommonModule,SearchBookComponent ]
})
export class BorrowingComponent implements OnInit,AfterViewInit {
  newBorrowChange: Borrow[] = [];
  displayedColumns: string[] = ['idBorrowing', 'idReader','readerName','idBook','bookName','dateBorrowing','dateReturn'];
  dataSource: MatTableDataSource<Borrow>;
  borrowing: Borrow[] = [];

  showAddBorrowingButton: boolean = true; 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private location: Location,private borrowingService: BorrowingService,
    private stockService: StockService,  private route: ActivatedRoute,private sharedService: SharedService
    ,private datePipe: DatePipe,public dialog: MatDialog) {
   
      
    this.dataSource = new MatTableDataSource(this.borrowing);
  }

// Inside BorrowingComponent
// openDialog(borrowing: Borrow): void {
//   // Ensure borrowing data is available before opening the dialog
//   this.borrowingService.getBorrowing().subscribe(borrowings => {
//     const dialogRef = this.dialog.open(ReturnDialogComponent, {
//       width: '500px',
//       data: { borrowing, borrowings }
//     });
    
//   });
  
  
//}
openDialog(borrowing: Borrow): void {
  const dialogRef = this.dialog.open(ReturnDialogComponent, {
    width: '500px',
    data: { borrowing, borrowings: this.borrowing }
  });

   // Subscribe to the afterClosed() method
   dialogRef.afterClosed().subscribe(result => {
    // If result is true (indicating "YES" was clicked)
    if (result) {
      this.getAllBorrowing(); // Fetch the updated list of books
    }
  });
}
handleNewBorrowChange(updatedBorrowings: Borrow[]): void {
  this.dataSource.data = updatedBorrowings;
}
  ngOnInit(): void {
   
    this.route.params.subscribe(params => {
      const idBook = params['idBook'];
      if (idBook) {
        // If book ID is provided in the URL parameters, fetch borrowing records filtered by that book ID
        this.getBorrowingByBookId(idBook);
        //this.showAddBorrowingButton = false;
      } else {
        // If no book ID is provided, check the route path
        const urlSegments = this.route.snapshot.url.map(segment => segment.path);
        if (urlSegments.includes('borrowingsWithNullReturnDate')) {
          // If the route path contains 'borrowingsWithNullReturnDate', fetch borrowing records with null return date
          this.getBorrowingsWithNullReturnDate();
        } else {
          // Otherwise, fetch all borrowing records
          this.getAllBorrowing();
          //this.showAddBorrowingButton = true;
        }
      }
    });
  }
  getBorrowingsWithNullReturnDate(): void {
    this.borrowingService.getBorrowingsWithNullReturnDate().subscribe(
      (data: Borrow[]) => {
        // Sort the data by dateBorrowing in descending order
        data.sort((a, b) => new Date(b.dateBorrowing).getTime() - new Date(a.dateBorrowing).getTime());
        this.dataSource.data = data;
        this.newBorrowChange = data;
        this.dataSource.data = this.newBorrowChange;
      },
      (error) => {
        console.error('Error fetching borrowing records:', error);
      }
    );
  }

  getAllBorrowing(): void {
    this.borrowingService.getBorrowing().subscribe(
      (data: Borrow[]) => {
        // Sort the data by dateBorrowing in descending order
        data.sort((a, b) => new Date(b.dateBorrowing).getTime() - new Date(a.dateBorrowing).getTime());
        this.dataSource.data = data;
        this.newBorrowChange = data;
        this.dataSource.data = this.newBorrowChange;
      },
      (error) => {
        console.error('Error fetching borrowing records:', error);
      }
    );
  }

  getBorrowingByBookId(idBook: string): void {
    this.borrowingService.getBorrowingByBookId(idBook).subscribe(
      (data: Borrow[]) => {
        // Sort the data by dateBorrowing in descending order
        data.sort((a, b) => new Date(b.dateBorrowing).getTime() - new Date(a.dateBorrowing).getTime());
        this.dataSource.data = data;

      },
      (error) => {
        console.error(`Error fetching borrowing records for book ID ${idBook}:`, error);
      }
    );
  }

  goBack(): void {
    this.location.back();
  }


  formatDate(date: any): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    this.dataSource.filterPredicate = (data: Borrow, filter: string) => {
      // Check if filter is a number
      const isNumeric = !isNaN(parseFloat(filter)) && isFinite(parseFloat(filter));
      if (isNumeric) {
        // Filter by idBook or idReader if the input is a number
        return data.idBook.idBook.toString().includes(filter) || 
               data.idReader.idReader.toString().includes(filter)|| 
               data.idBorrowing.toString().includes(filter);
      } else {
        // Filter by bookName or readerName if the input is not a number
        return data.idBook.bookName.toLowerCase().includes(filter) || 
               data.idReader.readerName.toLowerCase().includes(filter);
      }
    };
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

 

  onDateReturnChange(event: any, borrowing: Borrow): void {
    // const updatedDate: string = event.target.value;
    // const updatedBorrowingDateOnly: BorrowUpdate = { 
    //   dateReturn: updatedDate
    // };
    this.updateBorrowingDateReturn(borrowing.idBorrowing);
}


  
updateBorrowingDateReturn(id: number): void {
  this.borrowingService.updateBorrowingDateReturn(id).subscribe(
    (response: any) => {
      if (response && response.message === 'Borrowing dateReturn updated successfully') {
        console.log('Borrowing dateReturn updated successfully');
        console.log(id);

        // Fetch the borrowing details by id
        this.borrowingService.getBorrowingById(id).subscribe(
          (borrow: Borrow) => {
           
            this.updateAmountInLibrary(borrow.idBook.idBook);
          },
          (error) => {
            console.error('Error fetching borrowing details:', error);
          }
        );
      } else {
        console.error('Error updating borrowing dateReturn:', response ? response.message : 'Unknown error');
      }
    },
    (error) => {
      console.error('Error updating borrowing dateReturn:', error);
    }
  );
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
 

  isLateReturn(borrowing: Borrow): boolean {
    // Calculate the difference in days between dateBorrowing and current date
    const borrowingDate = new Date(borrowing.dateBorrowing);
    const currentDate = new Date();
    const culculateOneDay=1000 * 3600 * 24;
    
    const differenceInDays = Math.floor((currentDate.getTime() - borrowingDate.getTime()) / (culculateOneDay));
  const numberOfDays=2;
    // Return true if more than 2 days have passed and dateReturn is still null
    return differenceInDays > numberOfDays && !borrowing.dateReturn;
  }


}


 



