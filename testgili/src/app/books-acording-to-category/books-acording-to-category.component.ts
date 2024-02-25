import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Category, Stock } from '../service/stock/stock';
import { MatTableDataSource } from '@angular/material/table';
import { StockService } from '../service/stock/stock.service';
import { BookDatailsComponent } from '../book-datails/book-datails.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-books-acording-to-category',
  templateUrl: './books-acording-to-category.component.html',
  styleUrl: './books-acording-to-category.component.css',
  standalone:true,
  imports:[MatCardModule,MatGridListModule,MatIconModule,MatDialogModule,MatButtonModule,CommonModule],
  providers: [Location],
})
export class BooksAcordingToCategoryComponent implements OnInit {
  category: Category | undefined;
  dataSource!: MatTableDataSource<Stock>;
  originalBooks: Stock[] = []; 
  books: Stock[] = [];
  //dataSource: MatTableDataSource<Stock>;
  
  constructor(private stockService: StockService,private route: ActivatedRoute,public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Stock>([]); 
   }

   
  //  goBack(): void {
  //   this.location.back();
  // }
   ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      // Retrieve the category from the route parameters
      const categoryId = params.get('category');
      console.log('categoryId:', categoryId); 
      if (categoryId) {
        this.category = this.getCategoryByKey(categoryId);
        if (!this.category) {
          console.error('Invalid category:', categoryId);
          return;
        }
        this.getBooks(); 
        console.log('category:', this.category); 
      }
    });
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
  
  

  getBooks() {
    if (this.category) { // Check if this.category is defined
      this.stockService.getBooksByCategory(this.category).subscribe(
        (data: Stock[]) => {
          this.books = data;
          console.log(data[0]);
          console.log(this.books);
          this.dataSource.data = this.books;
        },
        (error) => {
          console.error('Error fetching getBooksByCategory:', error);
        }
      );
    } else {
      console.error('Category is undefined');
    }
  }


  
openDialog(book: Stock): void {
  const dialogRef = this.dialog.open(BookDatailsComponent, {
    width: '500px',
    data: { book }
  });
}



}