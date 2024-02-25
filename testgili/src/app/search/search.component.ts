import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Publisher } from '../service/publisher/publisher';
import { PublishersService } from '../service/publisher/publisher.service';
import { Category, Stock } from '../service/stock/stock';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Input() books: Stock[] = [];
  @Output() filteredBooksChange = new EventEmitter<Stock[]>();
   
  value = 'Clear me';
  publishers: Publisher[] = [];
  selctPublisher!:Publisher;
  inputValue!:string;
  inputValueDate!:Date;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  categories: { value: Category, label: string }[] = [
    { value: Category.philosophy, label: 'Philosophy' },
    { value: Category.psychology, label: 'Psychology' },
    { value: Category.Children, label: 'Children' },
    { value: Category.Tension, label: 'Tension' },
    { value: Category.Judaism, label: 'Judaism' },
    { value: Category.psychoanalyst, label: 'Psychoanalyst' }
  ];
  selectCategory!: Category;
  constructor(private publishersService: PublishersService,private _snackBar: MatSnackBar) {}

  openSnackBar() {
    this.filerByReqwest()
    this._snackBar.open('A nice message!', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['custom-snackbar'], // Apply custom CSS class
      duration: 2000, // Specify duration if needed
      announcementMessage: 'Custom announcement message', // Specify announcement message if needed
      politeness: 'assertive', // Specify politeness if needed
  
    });
  }
  
  filerByReqwest(): void {
    console.log("c",   this.selctPublisher);
    
    // Check if a publisher is selected
    if (! this.selctPublisher) {
      // No publisher selected, emit the original books array
      this.filteredBooksChange.emit(this.books);
      return;
    }
    
    // Filter books based on publisher 
    let filteredBooks = this.books.filter(book => 
      book.idPublisher.idPublishers ===  this.selctPublisher.idPublishers
    );
  
    // Filter based on input value (book name)
    if (this.inputValue) {
      filteredBooks = filteredBooks.filter(book =>
        book.bookName.toLowerCase().includes(this.inputValue.toLowerCase())
      );
    }
  
    // Emit the filtered books array
    this.filteredBooksChange.emit(filteredBooks);
    console.log("filteredBooks", filteredBooks);
  }
  


  // applyFilterDate(): void {
  //   // Start with the original books list
  //   let filteredBooks = this.books;
    
  //   // Filter based on the selected inputValueDate
  //   if (this.inputValueDate) {
  //     // Convert inputValueDate to Date object
  //     const selectedDate = new Date(this.inputValueDate);
      
  //     // Filter books where publication date is after the selected date
  //     filteredBooks = filteredBooks.filter(book => {
  //       const publicationDate = new Date(book.publicationDate);
  //       return publicationDate > selectedDate;
  //     });
  //   }
    
  //   // Emit the filtered books array
  //   this.filteredBooksChange.emit(filteredBooks);
  // }





  applyFilter(): void {
    // Start with the original books list
    let filteredBooks = this.books;
  
    // Filter based on the selected publisher
    if (this.selctPublisher) {
      filteredBooks = filteredBooks.filter(book => book.idPublisher.idPublishers === this.selctPublisher.idPublishers);
    }
  
    // Further filter based on input value (book name or description)
    if (this.inputValue) {
      const searchTerm = this.inputValue.toLowerCase();
      filteredBooks = filteredBooks.filter(book => 
        book.bookName.toLowerCase().includes(searchTerm) || 
        (book.description && book.description.toLowerCase().includes(searchTerm)) // Include description in search if not null
      );
    }
  
    // Emit the filtered books array
    this.filteredBooksChange.emit(filteredBooks);
  }
  
  

  clearInput(): void {
    this.inputValue = '';
    this.applyFilter();
  }





  ngOnInit() {
    this.getAllPublishers();
    console.log("booksssss",this.books);
    
  
  }
  getAllPublishers() {
    this.publishersService.getAllPublishers().subscribe(
      (data: Publisher[]) => {
        this.publishers = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching Publishers:', error);
      }
    );
  }

  getCategoryLabel(category: Category): string {
    switch (category) {
      case Category.philosophy: return 'Philosophy';
      case Category.psychology: return 'Psychology';
      case Category.Children: return 'Children';
      case Category.Tension: return 'Tension';
      case Category.Judaism: return 'Judaism';
      case Category.psychoanalyst: return 'Psychoanalyst';
      default: return '';
    }
  }
 



}
