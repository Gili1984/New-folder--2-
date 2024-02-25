import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Stock } from '../service/stock/stock';
import { StockService } from '../service/stock/stock.service';
import { CommonModule, Location } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrl: './all-books.component.css',

})
export class AllBooksComponent {
  panelOpenState = false;

  searchForm: FormGroup;

  books: Stock[] = [];

  displayedColumns: string[] = ['idBook', 'BookName', 'Publisher','Amount','category','details'];
  dataSource = new MatTableDataSource<Stock>();

  constructor(private location: Location,private stockService: StockService,) { 
       this.searchForm = new FormGroup({
      searchValue: new FormControl(''),  });}
 
  value = '';
 


  ngOnInit(): void {
    this.stockService.getAllBooks().subscribe(
      (data: Stock[]) => {
        console.log(data)
        this.dataSource.data = data; 
        this.setupSearchListener();
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }
  onClickBookDetails(idBook: number) {
    console.log('Clicked on book with ID:', idBook);
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

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clearSearch(): void {
    this.searchForm.get('searchValue')?.setValue('');
  }
  goBack(): void {
    this.location.back();
  }

}
