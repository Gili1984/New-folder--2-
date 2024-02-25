import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgModel } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrl: './search-book.component.css',

})
export class SearchBookComponent implements OnInit{
  @Input() dataSource!: MatTableDataSource<any>;
  searchForm: FormGroup;

  constructor() {
    this.searchForm = new FormGroup({
      searchValue: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.setupSearchListener();
  }

  setupSearchListener(): void {
    this.searchForm.get('searchValue')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.applyFilter(value);
      });
  }

  applyFilter(filterValue: string): void {
    if (!this.dataSource) {
      return;
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clearSearch(): void {
    this.searchForm.get('searchValue')?.setValue('');
    this.applyFilter('');
  }
}
