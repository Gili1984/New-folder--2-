import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Reader } from '../service/readers/reader';
import { ReadersComponent } from '../readers/readers.component';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, merge, startWith, switchMap } from 'rxjs';
import { Borrow } from '../service/borrowing/borrowing';
import { BorrowingService } from '../service/borrowing/borrowing.service';
import { DatePipe } from '@angular/common';
import { ReturnDialogComponent } from '../return-dialog/return-dialog.component';

@Component({
  selector: 'app-borrowing-reader-list',
  templateUrl: './borrowing-reader-list.component.html',
  styleUrl: './borrowing-reader-list.component.css'
})
export class BorrowingReaderListComponent {
  data: Borrow[] = [];
  resultsLength = 0;
  displayedColumns: string[] = ['idBorrowing','bookName','dateBorrowing','dateReturn'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private borrowingService: BorrowingService,public dialog: MatDialog, private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data1: { reader: Reader },
    public dialogRef: MatDialogRef<ReadersComponent>
  ) { }
  formatDate(date: any): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }
  ngOnInit(): void {
    const readerId = this.data1.reader.idReader;
    this.getBorrowingsByReaderId(readerId);
  }
  
  

  getBorrowingsByReaderId(readerId: number): void {
    this.borrowingService.getBorrowingsByReaderId(readerId)
      .pipe(
        catchError(error => {
          console.error(`Error fetching borrowing records by reader ID ${readerId}:`, error);
          throw error;
        })
      )
      .subscribe(
        (data: Borrow[]) => {
          this.data = data;
          // Assuming you want to set up sorting and pagination after receiving the data
          //this.setupPaginatorAndSort();
        }
      );
  }

  openDialog(borrowing: Borrow): void {
    const dialogRef = this.dialog.open(ReturnDialogComponent, {
      width: '500px',
      data: {borrowing, borrowings: this.data }
    });

}
}



