import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Category, Stock } from '../service/stock/stock';
import { StockService } from '../service/stock/stock.service';
import { BookDatailsComponent } from '../book-datails/book-datails.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { TopBorrowings } from '../service/borrowing/topBorrowings';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReturnDialogComponent } from '../return-dialog/return-dialog.component';
import { DeleteBookDialogComponent } from '../delete-book-dialog/delete-book-dialog.component';
import { EditAmpuntComponent } from '../edit-ampunt/edit-ampunt.component';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-books-veiw',
  templateUrl: './books-veiw.component.html',
  styleUrl: './books-veiw.component.css'
})
export class BooksVeiwComponent  implements OnInit,AfterViewInit {
  dataSource!: MatTableDataSource<Stock>;

  @Input() topBorrowingsBooks: Stock[] = [];

  allTop: Stock[] = [];
  isTop: boolean=false; 
  books: Stock[] = [];
  filteredBooks: Stock[] = [];
  //dataSource: MatTableDataSource<Stock>;
  searchForm: FormGroup;
  originalBooks: Stock[] = []; 
  isSearchAppProvided: boolean = false;
  starIcon: boolean = false;
  category: Category | undefined;
  constructor(private stockService: StockService,
    public dialog: MatDialog, 
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,) {
    this.dataSource = new MatTableDataSource<Stock>([]); 
    this.searchForm = new FormGroup({
      searchValue: new FormControl(''),  });
  }
  param!: string; 

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const categoryRoute = this.route.snapshot.routeConfig?.path === 'boooksAcordingToCategory/:category';
      if (categoryRoute) {
        this.fetchBooksByCategory(params.get('category'));
      } else {
        this.route.url.subscribe(urlSegments => {
          const isHomeRoute = urlSegments.find(segment => segment.path === 'home');
          if (isHomeRoute) {
            this.fetchTopBorrowings();
          } else {
            this.fetchBooks();
          }
        });
      }
    });
  }



  fetchBooksByCategory(param: string | null):void {
    if (param) {
      this.category = this.getCategoryByKey(param);
      if (!this.category) {
        console.error('Invalid category:', param);
        return;
      }
      this.getCategoryBooks(); 
   }
   else{
    console.log("category param not found");

   }
}

getCategoryByKey(categoryKey: string): Category | undefined {
  // Convert the categoryKey to lowercase
  const lowercaseKey = typeof categoryKey === 'string' ? categoryKey.toLowerCase() : '';

  // Check if the lowercaseKey exists in the enum values array
  if (Object.values(Category).map(val => typeof val === 'string' ? val.toLowerCase() : '').includes(lowercaseKey)) {
    // Iterate over the keys of the Category enum
    for (const key in Category) {
      if (typeof Category[key] === 'string' && Category[key].toLowerCase() === lowercaseKey) {
        // If a match is found, return the corresponding enum value
        return Category[key as keyof typeof Category];
      }
    }
  }

  return undefined; // Return undefined if no match is found
}



getCategoryBooks() {
  if (this.category) { // Check if this.category is defined
    this.stockService.getBooksByCategory(this.category).subscribe(
      (data: Stock[]) => {
        this.filteredBooks = data;
      },
      (error) => {
        console.error('Error fetching getBooksByCategory:', error);
      }
    );
  } else {
    console.error('Category is undefined');
  }
}




  fetchBooks(): void {
    this.isSearchAppProvided=true
    this.stockService.getAllBooks().subscribe(
      (data: Stock[]) => {
        this.books = data;
        this.dataSource.data = this.books;
        this.filteredBooks = this.books; // Initialize filteredBooks with all books
        this.dataSource.data = this.filteredBooks;
       
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
    this.fetchTopBorrowings()
  }



 
  fetchTopBorrowings(): void {
    this.stockService.getTop5BorrowedBooks().subscribe(
      (data: Stock[]) => {
        console.log('TopBorrowings data:', data);
        this.allTop = data;
        this.filteredBooks=this.allTop
        for (const topBook of this.allTop) {
        this.updateStar(topBook)}
      },
      (error) => {
        console.error('Error fetching top borrowings:', error);
      }
    );


  }


  updateStar(topBook:Stock): void {
      this.stockService.updateTopBooks(topBook.idBook)
      .subscribe(response => {
        console.log('updateStarsuccessfully:', response);
      }, error => {
        // Handle error if needed
        console.error('Error updateStar:', error);
      });
    
  }



  // openDeleteDialog(book: Stock): void {
  //   const dialogRef = this.dialog.open(DeleteBookDialogComponent, {
  //     width: '500px',
  //     data: { book }
  //   });
  
  //   // Subscribe to the afterClosed() method
  //   dialogRef.afterClosed().subscribe(result => {
  //     // If result is true (indicating "YES" was clicked)
  //     if (result) {
  //       this.fetchBooks(); // Fetch the updated list of books
  //     }
  //   });
  // }

  

  // isTopBorrowing(book: Stock): boolean {
  //   return this.allTop.some(topBook => topBook.idBook === book.idBook);
  // }

  handleFilteredBooksChange(filteredBooks: Stock[]): void {
    this.filteredBooks = filteredBooks;
    this.dataSource.data = this.filteredBooks;
  }
  getBookById(id: number): void {
    this.stockService.getStockById(id).subscribe(
      (data: Stock) => {
        // Assuming getStockById returns a single book (Stock) based on the provided id
        this.books = [data];
        console.log(data);
      },
      (error) => {
        console.error('Error fetching book by id:', error);
      }
    );
  }

  ngAfterViewInit(): void {
    if (this.books.length === 0) {
      this.stockService.getAllBooks().subscribe(
        (data: Stock[]) => {
          this.books = data;
          this.dataSource.data = this.books; // Assign fetched books to dataSource
        },
        (error) => {
          console.error('Error fetching books:', error);
        }
      );
    }
  }

// openDialog(book: Stock): void {
//   const dialogRef = this.dialog.open(BookDatailsComponent, {
//     width: '500px',
//     data: { book }
//   });
// }


// editAmount(book: Stock): void {
//   const dialogRef = this.dialog.open(EditAmpuntComponent, {
//     width: '500px',
//     data: { book }
//   });
//      // Subscribe to the afterClosed() method
//      dialogRef.afterClosed().subscribe(result => {
//       // If result is true (indicating "YES" was clicked)
//       if (result) {
//         this.ngOnInit(); // Fetch the updated list of books
//       }
//     });
// }



trackByFn(index: number, item: Stock): number {
  return item.idBook; // Assuming idBook is unique for each book
}


setupSearchListener(): void {
  this.searchForm.get('searchValue')?.valueChanges
    .pipe(
      debounceTime(300), // wait for 300 milliseconds after each keystroke
      distinctUntilChanged() // only emit if the new value is different from the previous value
    )
    .subscribe((value) => {
      this.applyFilter(value);
    });
}

// applyFilter(filterValue: string): void {
//   this.books = this.books.filter(book => 
//     book.bookName.toLowerCase().includes(filterValue.trim().toLowerCase())
//   );
// }

applyFilter(filterValue: string): void {
  if (!filterValue || filterValue.trim() === '') {
    // If the filter value is empty or whitespace, reset to the original unfiltered list of books
    this.books = [...this.originalBooks];
  } else {
    // Otherwise, filter the books array based on the search value
    this.books = this.originalBooks.filter(book => 
      book.bookName.toLowerCase().includes(filterValue.trim().toLowerCase())
    );
  }}

clearSearch(): void {
  this.searchForm.get('searchValue')?.setValue('');
}
}





  // ngOnInit(): void {
  //   this.isSearchAppProvided = this.topBorrowingsBooks.length > 0;
  //   console.log(this.topBorrowingsBooks);
    
  //   if (!this.topBorrowingsBooks || this.topBorrowingsBooks.length === 0) {
      
  //     this.fetchBooks();
  //   } else {
  //     this.fetchTopBorrowingsBooks();
     
  //   }
  //   this.setupSearchListener();
  // }
  




  // fetchTopBorrowingsBooks(): void {
  //   console.log(this.topBorrowingsBooks);
  //   this.filteredBooks = this.topBorrowingsBooks; // Take the first 5 items
  //   this.dataSource.data = this.filteredBooks;
  //   this.starIcon=true;

  // }
 