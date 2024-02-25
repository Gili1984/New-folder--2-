// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Stock } from './stock/stock';
import { Borrow } from './borrowing/borrowing';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private booksSubject: BehaviorSubject<Stock[]> = new BehaviorSubject<Stock[]>([]);
  public books$: Observable<Stock[]> = this.booksSubject.asObservable();


  private borrowingsSubject: BehaviorSubject<Borrow[]> = new BehaviorSubject<Borrow[]>([]);
  public borrowings$: Observable<Borrow[]> = this.borrowingsSubject.asObservable();


  constructor() {}


  setBorrowings(borrowings: Borrow[]): void {
    this.borrowingsSubject.next(borrowings);
  }

  setBooks(books: Stock[]): void {
    this.booksSubject.next(books);
  }
  

  getBooks(): Observable<Stock[]> {
    return this.books$;
  }



  getBorrowings(): Observable<Borrow[]> {
    return this.borrowings$;
  }
}
