import { Component, ViewChild } from '@angular/core';
import { Reader } from '../service/readers/reader';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ReaderService } from '../service/readers/reader.service';
import { DatePipe, Location } from '@angular/common';
import { AppModule } from '../app.module';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { BorrowingReaderListComponent } from '../borrowing-reader-list/borrowing-reader-list.component';
import { DeleteBookDialogComponent } from '../delete-book-dialog/delete-book-dialog.component';
import { SoftDeleteComponent } from '../soft-delete/soft-delete.component';
@Component({
  selector: 'app-readers',
  templateUrl: './readers.component.html',
  styleUrl: './readers.component.css',
  standalone:true,
  imports:[MatTableModule,RouterLink,MatButtonModule, 
    MatDividerModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule]
})
export class ReadersComponent {

  readers: Reader[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['ID', 'Name', 'Phone', 'Email','BirthDate','details'];

   dataSource = new MatTableDataSource<Reader>();

  constructor(public dialog: MatDialog ,private datePipe: DatePipe,private location: Location,private readerService: ReaderService) {
    this.dataSource = new MatTableDataSource(this.readers);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog(reader: Reader): void {
    const dialogRef = this.dialog.open(BorrowingReaderListComponent, {
      width: '900px',
      data: { reader }
    });
  }
  
  formatDate(date: any): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }


  openDeleteDialog(reader: Reader): void {
    const dialogData = {
      objectType: 'Reader', // or 'Publisher' depending on the object type
      reader: reader, 
    };
    
    const dialogRef = this.dialog.open(SoftDeleteComponent, {
      width: '500px',
      data: dialogData
    });
  
    // Subscribe to the afterClosed() method
    dialogRef.afterClosed().subscribe(result => {
      // If result is true (indicating "YES" was clicked)
      if (result) {
        this.ngOnInit(); // Fetch the updated list of books
      }
    });
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    this.dataSource.filterPredicate = (data: Reader, filter: string) => {
      // Check if filter is a number
      const isNumeric = !isNaN(parseFloat(filter)) && isFinite(parseFloat(filter));
      if (isNumeric) {
        // Filter by idBook or idReader if the input is a number
        return data.idReader.toString().includes(filter);
      } else {
        // Filter by bookName or readerName if the input is not a number
        return data.readerName.toLowerCase().includes(filter);
      }
    };
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.readerService.getReaders().subscribe(
      (res) => {
        res.sort((a, b) => a.readerName.localeCompare(b.readerName));

        this.dataSource.data = res; 
       
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }



  getReaderById(id: number): void {
    this.readerService.getReaderById(id).subscribe(
      (data: Reader) => {
        // Assuming getStockById returns a single book (Stock) based on the provided id
        this.readers = [data];
        console.log(data);
      },
      (error: any) => {
        console.error('Error fetching book by id:', error);
      }
    );
  }
}
