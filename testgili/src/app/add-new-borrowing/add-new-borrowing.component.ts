import { Component, ViewChild } from '@angular/core';
import { Reader } from '../service/readers/reader';
import { Category, Stock } from '../service/stock/stock';
import { Borrow } from '../service/borrowing/borrowing';
import { BorrowingService } from '../service/borrowing/borrowing.service';
import { StockService } from '../service/stock/stock.service';
import { ReaderService } from '../service/readers/reader.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { AppModule } from '../app.module';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIcon } from '@angular/material/icon';
import { MatCard } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import {MatAutocomplete, MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field'
import { Observable, map, startWith } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-new-borrowing',
  templateUrl: './add-new-borrowing.component.html',
  styleUrl: './add-new-borrowing.component.css',
  standalone:true,
  imports:[MatFormField,MatLabel,MatInput,FormsModule,MatIcon,MatCard,MatOption,MatSelectModule,MatCardModule,CommonModule,MatFormFieldModule,FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,]
})
export class AddNewBorrowingComponent {


  @ViewChild('autoReader') autoReader!: MatAutocomplete;
  @ViewChild('autoBook') autoBook!: MatAutocomplete;


  constructor(private location: Location,
    private borrowigService: BorrowingService,
    private stockService: StockService,
    private readerService: ReaderService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar,
   )  {
     }
     selectedBookId: string | null = null;
     bookSelectVisible: boolean = true;
     books: Stock[] = []; 

     myControl = new FormControl('');
     myControlReader = new FormControl('');
     options:  Stock[] = [];
     optionsReader:  Reader[] = [];
     filteredOptionsReader!: Observable<Reader[]>;
     filteredOptions!: Observable<Stock[]>;

   ngOnInit() {
    this.fetchAllBooks()
    this.fetchAllReaders()
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value as string))
    );
    console.log( "options",this.options );
    console.log( "filteredOptions",this.filteredOptions );
    
    this.filteredOptionsReader = this.myControlReader.valueChanges.pipe(
      startWith(''),
      map(value => this._filterReader(value as string))
    );
    console.log( "optionsReader",this.optionsReader );
    console.log( "filteredOptionsReader",this.filteredOptionsReader );
  }
  
  private _filter(value: string): any[] {
    const filterValue = (typeof value === 'string') ? value.toLowerCase() : '';
    return this.options.filter(option => {
      return option.bookName.toLowerCase().includes(filterValue) || option.idBook.toString().includes(filterValue);
    });
  }

  private _filterReader(value: string): any[] {
    const filterValue = (typeof value === 'string') ? value.toLowerCase() : '';
    return this.optionsReader.filter(optionsReader => {
      return optionsReader.readerName.toLowerCase().includes(filterValue) || optionsReader.idReader.toString().includes(filterValue);
    });
  }

  fetchAllBooks(): void {
    this.stockService.getAllBooks().subscribe(
      (books: any[]) => {
        this.options = books;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
    console.log( "options",this.options );
  }
  fetchAllReaders(): void {
    this.readerService.getReaders().subscribe(
      (readers: any[]) => {
        this.optionsReader = readers;
      },
      (error) => {
        console.error('Error fetching readers:', error);
      }
    );
    console.log( "optionsReader",this.optionsReader );
  }

  
     
  newBorrow: Borrow = {
    idBorrowing: Math.floor(Math.random() * 90000000) + 10000000,
    idReader: { idReader: 0, readerName: '', phone: '', email: '', birthDate: new Date() },
    idBook: { idBook: 0, bookName: '', 
    idPublisher: { idPublishers: 1,
                   publishersName: 'Sample Publisher',
                   location: 'Sample Location',},
                   category: Category.philosophy, 
                   publicationDate: new Date(), 
                   amount: 0, 
                   amountInLibrary: 0, 
                   img: '' ,
                   isStar: false 
                  },
                   dateBorrowing: this.getDateFromString(this.datePipe.transform(new Date(), 'yyyy-MM-dd')),
                   dateReturn: null 
  };

    
    onBookIdInputChange(): void {
      console.log("llll");
      
    }
      
  goBack(): void {
    this.location.back();
  }
 
  private getDateFromString(value: string | null): Date {
    return value ? new Date(value) : new Date();
  }


  selectReader(reader: Reader): void {

     this.borrowigService.getBorrowingsByReaderId(reader.idReader).subscribe(borrowings => {
        const unansweredBorrowings = borrowings.filter(borrowing => !borrowing.dateReturn);
     
        if (unansweredBorrowings.length > 1) {
            alert("You cannot borrow more than 2 books with pending return dates.");
        } else {
            console.log('Selected reader:', reader,unansweredBorrowings);
            this.newBorrow.idReader = reader;
        }
    });
  }


  selectBook(book: Stock): void {
    console.log('Selected Book:', book);
    this.newBorrow.idBook = book;
  }


  addBorrow(): void {
    console.log(this.newBorrow);
       this.stockService.getStockById(this.newBorrow.idBook.idBook).subscribe(
    (data: Stock) => {
      
    
      if (data.amountInLibrary <= 0) {
        window.alert('Error: No copies of the book are available in the library.');
        return; // Exit the method if the amount in library is zero or negative
      }
      //this.newBorrow.idBook = data;
     
    },
    (error: any) => {
      console.error('Error fetching book details by id:', error);
    }
  );
  this.readerService.getReaderById(this.newBorrow.idReader.idReader).subscribe(
    (readerData: Reader) => {
      console.log('Reader Details:', readerData);
      this.newBorrow.idReader = readerData;
      console.log('Updated Borrow:', this.newBorrow);
    
    },
    (error: any) => {
      console.error('Error fetching reader details by id:', error);
    }
  );
  this.newBorrow.dateBorrowing = this.getDateFromString(this.datePipe.transform(new Date(), 'yyyy-MM-dd'));
 
    this.borrowigService.addBorrow(this.newBorrow).subscribe(
          () => {
            console.log('New Stock added successfully');
            this.goBack();
            this.snackBar.open(' Borrow successfully', 'Close', {
              duration: 3000
            });
          },
          (addError: any) => {
            console.error('Error adding new Stock:', addError);
            console.log('Full response:', addError.error);
          }
        );


}
}
