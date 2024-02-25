import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddNewReaderComponent } from './add-new-reader/add-new-reader.component';
import { AddNewBookComponent } from './add-new-book/add-new-book.component';
import { BorrowingComponent } from './borrowing/borrowing.component';
import { ReturnBookComponent } from './return-book/return-book.component';
import { ReadersComponent } from './readers/readers.component';
import { PublishersComponent } from './publishers/publishers.component';
import { AddNewPublisherComponent } from './add-new-publisher/add-new-publisher.component';
import { AddNewBorrowingComponent } from './add-new-borrowing/add-new-borrowing.component';
import { AllBooksComponent } from './all-books/all-books.component';
import { BookDatailsComponent } from './book-datails/book-datails.component';
import { TestComponent } from './test/test.component';
import { BooksAcordingToCategoryComponent } from './books-acording-to-category/books-acording-to-category.component';
import { BooksVeiwComponent } from './books-veiw/books-veiw.component';
import { PageAfterReturnComponent } from './page-after-return/page-after-return.component';
import { OneBookCardComponent } from './one-book-card/one-book-card.component';
const routes: Routes = [
  
  {path:'', component: HomeComponent},
  {path:'home', component: HomeComponent},
  {path:'home', component: BooksVeiwComponent},
  {path:'boooksAcordingToCategory/:category', component: BooksVeiwComponent},
  {path:'addNewReader', component: AddNewReaderComponent},
  {path:'addNewBookComponent', component: AddNewBookComponent},
  { path: 'borrowing', component: BorrowingComponent },
  { path: 'borrowingsWithNullReturnDate', component: BorrowingComponent },
  { path: 'byIdBook/:idBook', component: BorrowingComponent },
  {path:'returnBook', component: ReturnBookComponent},
  {path:'booksView', component: BooksVeiwComponent},
  {path:'readers', component: ReadersComponent},
  {path:'publishers', component: PublishersComponent},
  {path:'addNewPublisher', component: AddNewPublisherComponent},
  {path:'addNewBorrowing', component: AddNewBorrowingComponent},
  {path:'allBooks', component: AllBooksComponent},
  {path:'bookDatails', component: BookDatailsComponent},
  {path:'test', component: TestComponent},
  {path:'pageAfterReturn', component: PageAfterReturnComponent},
  { path: 'bookDetails/:idBook', component: BookDatailsComponent },
  { path: 'oneBookCard/:book', component: OneBookCardComponent },
  { path: 'BooksAcordingToCategoryComponent/:category', component: BooksAcordingToCategoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
