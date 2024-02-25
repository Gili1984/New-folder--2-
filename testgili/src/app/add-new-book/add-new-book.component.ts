
import { Component, OnInit } from '@angular/core';
import { Category, Stock } from '../service/stock/stock';
import { Publisher } from '../service/publisher/publisher';
import { FormBuilder, FormControl } from '@angular/forms';
import { PublishersService } from '../service/publisher/publisher.service';
import { StockService } from '../service/stock/stock.service';
import { Location } from '@angular/common';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.css']
})
export class AddNewBookComponent implements OnInit {

  quantityError: boolean = false;
  quantityErrorMessage: string = '';
  today: Date = new Date();

 minDate: string = new Date('1000-01-01').toISOString();

  categories:string[] = [
    "philosophy",
   "psychology",
    "Children",
    "Tension",
    "Judaism" ,
     "psychoanalyst"
  ];


  validateQuantity() {
    if (!Number.isInteger(this.newBook.amount) || this.newBook.amount < 0 || this.newBook.amount > 100) {
      this.quantityError = true;
      this.quantityErrorMessage = 'Please enter a valid quantity (a whole number between 0 and 100).';
    } else {
      this.quantityError = false;
      this.quantityErrorMessage = '';
    }
  }
 
  

  publishers: Publisher[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  newBook: Stock = {
    idBook: Math.floor(Math.random() * 90000000) + 10000000,
    bookName: '',
    idPublisher: {
      idPublishers: 1,
      publishersName: 'Sample Publisher',
      location: 'Sample Location',
    },
    category: Category.Children,
    publicationDate: new Date(),
    amount: 0,
    amountInLibrary: 0,
    img: '',
    description:'',
    price:0,
    isStar: false 
  };
  selectedCategory!:Category;
  constructor(private location: Location,
              private snackBar: MatSnackBar,
              private stockService: StockService,
              private publishersService: PublishersService,
              private _formBuilder: FormBuilder,
              private router: Router) {}

  ngOnInit() {
    this.getAllPublishers();
  
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
 

  goBack(): void {
    this.router.navigate(['/home']);

  }

  private showAlert(message: string): void {
    alert(message);
  }



  addBook(): void {
  // Check if any required field is missing
  if (!this.newBook.bookName || !this.newBook.category || !this.newBook.idPublisher || !this.newBook.publicationDate || !this.newBook.amount || !this.newBook.img) {
    // Display an error message
    alert('Please fill in all required fields.');
    return; // Exit the function early
  }
    this.newBook.amountInLibrary= this.newBook.amount;
    // this.newBook.category=this.newBook.category.label[1];
    console.log( this.newBook.idBook);
    console.log( this.newBook.category);
    
    // Call the stock service to add the new book
    this.stockService.addBook(this.newBook).subscribe(
      (res) => {
        console.log(res);
        this.goBack();
      this.openSnackBar()
      },
      (error: any) => {
        // Handle errors here
        console.error('Error adding new Stock:', error);
      }
    );
  }





  
  openSnackBar() {
 
    this.snackBar.open('Thhe book add seccessfuly', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['custom-snackbar'], // Apply custom CSS class
      duration: 2000, // Specify duration if needed
      announcementMessage: 'Custom announcement message', // Specify announcement message if needed
      politeness: 'assertive', // Specify politeness if needed
  
    });
  }
  
}
