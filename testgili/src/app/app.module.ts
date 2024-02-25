// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule
//   ],
//   providers: [
//     provideAnimationsAsync()
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }

// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddNewReaderComponent } from './add-new-reader/add-new-reader.component';
import { BorrowingComponent } from './borrowing/borrowing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { ReturnBookComponent } from './return-book/return-book.component';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';

import { ReadersComponent } from './readers/readers.component';
import { MatListModule } from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';

import { PublishersComponent } from './publishers/publishers.component';
import { AddNewPublisherComponent } from './add-new-publisher/add-new-publisher.component';
import { CommonModule } from '@angular/common';
import { AddNewBookComponent } from './add-new-book/add-new-book.component';
import { DatePipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { AddNewBorrowingComponent } from './add-new-borrowing/add-new-borrowing.component';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { TestComponent } from './test/test.component';
import { AllBooksComponent } from './all-books/all-books.component';
import { BookDatailsComponent } from './book-datails/book-datails.component';
import { BooksVeiwComponent } from './books-veiw/books-veiw.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SearchBookComponent } from './search-book/search-book.component';
import { CategoryCardComponent } from './category-card/category-card.component';
import { SearchComponent } from './search/search.component';

import {MatTooltipModule} from '@angular/material/tooltip';
import { Location } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReturnDialogComponent } from './return-dialog/return-dialog.component';
import { BorrowingReaderListComponent } from './borrowing-reader-list/borrowing-reader-list.component';
import {HttpClient} from '@angular/common/http';
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortModule, SortDirection} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { RouterModule } from '@angular/router'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BooksAcordingToCategoryComponent } from './books-acording-to-category/books-acording-to-category.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DeleteBookDialogComponent } from './delete-book-dialog/delete-book-dialog.component';
import { PageAfterReturnComponent } from './page-after-return/page-after-return.component';
import { SoftDeleteComponent } from './soft-delete/soft-delete.component';
import { ReportComponent } from './report/report.component'; // Import MatAutocompleteModule

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EditAmpuntComponent } from './edit-ampunt/edit-ampunt.component';
import { OneBookCardComponent } from './one-book-card/one-book-card.component';




@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    AddNewBookComponent,
    AllBooksComponent,
    BookDatailsComponent,
    BooksVeiwComponent,
    HomeViewComponent,
    HomeComponent,
    ReturnBookComponent,
    CategoryCardComponent,
    SearchComponent,
    ReturnDialogComponent,
    BorrowingReaderListComponent,
    BorrowingComponent,
     AppComponent,
     SearchBookComponent,
     DeleteBookDialogComponent,
     PageAfterReturnComponent,
     SoftDeleteComponent,
     ReportComponent,    AddNewReaderComponent, EditAmpuntComponent, OneBookCardComponent,
  ],

  imports: [ BrowserModule,
    MatAutocompleteModule,
     RouterModule, 
      BooksAcordingToCategoryComponent,
    CommonModule,
    MatProgressSpinnerModule,
     MatTableModule, 
     MatSortModule,
      MatPaginatorModule,
       DatePipe,
    MatPaginatorModule,
    MatTooltipModule,
  
    FormsModule,
 
    BrowserModule,
   // AddNewReaderComponent,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatListModule,
    MatToolbarModule,
    MatOptionModule,
    MatSelectModule,
   
    MatExpansionModule,
    NavComponent,
   
    ReadersComponent,
    PublishersComponent,
    AddNewPublisherComponent,
    ReactiveFormsModule,
    AddNewBorrowingComponent,
    MatDatepickerModule,
    MatNativeDateModule,

  ],
  providers: [DatePipe,Location],
  bootstrap: [AppComponent],
  exports: [
    SearchBookComponent // Export the SearchBookComponent here
  ]
})
export class AppModule { }

