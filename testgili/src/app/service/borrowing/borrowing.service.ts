import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Borrow } from './borrowing';
import { catchError, map, tap } from 'rxjs/operators';
import { BorrowUpdate } from './borrowUpdate';
import { SharedService } from '../shared.serice';
//import { BorrowUpdate } from './borrowUpdate';

@Injectable({
  providedIn: 'root',
})
export class BorrowingService {
  //private apiUrl = '/api/readers'; // Assuming your readers API endpoint

  constructor(private http: HttpClient, private sharedService: SharedService) {}


  getBorrowing(): Observable<any[]> {

    return this.http.get<any[]>(`http://localhost:8080/getAllBorrowing`)
      .pipe(
        catchError(error => {
          console.error('Error fetching books:', error);
          throw error; 
        })
      );
  }


  // getBorrowing(): Observable<any[]> {
  //   return this.http.get<any[]>('http://localhost:8080/getAllBorrowing').pipe(
  //     tap(books => {
  //       this.sharedService.setBorrowings(books); // Set fetched books in SharedService
  //     }),
  //     catchError(error => {
  //       console.error('Error fetching books:', error);
  //       return throwError(error);
  //     })
  //   );
  // }



  getBorrowingsWithNullReturnDate(): Observable<any[]> {

    return this.http.get<any[]>(`http://localhost:8080/getBorrowingsWithNullReturnDate`)
      .pipe(
        catchError(error => {
          console.error('Error fetching getBorrowingsWithNullReturnDate:', error);
          throw error; 
        })
      );
  }
  addBorrow(borrowing: Borrow): Observable<string> {
    const url = `http://localhost:8080/addBorrowing`;

    return this.http.post<string>(url, borrowing)
      .pipe(
        catchError(error => {
          console.error('Error adding borrowing:', error);
          throw error;
        })
      );
  }

  // updateBorrowing(id: number, updatedBorrowing: Borrow): Observable<string> {
  //   const url = `http://localhost:8080/updateBorrowing/${id}`;

  //   return this.http.post<string>(url, updatedBorrowing)
  //     .pipe(
  //       catchError(error => {
  //         console.error('Error updating borrowing:', error);
  //         throw error;
  //       })
  //     );
  // }
  
  updateBorrowingDateReturn(id: number): Observable<string> {
    const url = `http://localhost:8080/return/${id}`;
  
    return this.http.patch<string>(url, {})
      .pipe(
        catchError(error => {
          console.error('Error updating borrowing:', error);
          throw error;
        })
      );
  }
  

  // updateBorrowingDateReturn(id: number, updatedBorrowing: BorrowUpdate): Observable<string> {
  //   const url = `http://localhost:8080/updateBorrowingDateReturn/${id}`;
  
  //   return this.http.put<string>(url, { dateReturn: updatedBorrowing.dateReturn })
  //     .pipe(
  //       catchError(error => {
  //         console.error('Error updating borrowing dateReturn:', error);
  //         throw error;
  //       })
  //     );
  // }
  
  getBorrowingById(id: number): Observable<Borrow> {
    const url = `http://localhost:8080/getBorrowingOptionalById/${id}`;

    return this.http.get<Borrow>(url)
      .pipe(
        catchError(error => {
          console.error(`Error fetching borrowing with id ${id}:`, error);
          throw error;
        })
      );
  }
  getBorrowingsWithNullReturnDateByIdReader(id: number): Observable<Borrow[]> {
    const url = `http://localhost:8080/getBorrowingsWithNullReturnDateByIdReader/${id}`;

    return this.http.get<Borrow[]>(url)
      .pipe(
        catchError(error => {
          console.error(`Error fetching borrowing with id ${id}:`, error);
          throw error;
        })
      );
  }
  getBorrowingByBookId(idBook: string): Observable<Borrow[]> {
    const url = `http://localhost:8080/byIdBook/${idBook}`;
  
    return this.http.get<Borrow[]>(url)
      .pipe(
        catchError(error => {
          console.error(`Error fetching borrowing records by book ID ${idBook}:`, error);
          throw error;
        })
      );
  }

  getBorrowingsByReaderId(readerId: number): Observable<Borrow[]> {
    const url = `http://localhost:8080/getBorrowingsByReaderId/${readerId}`;
  
    return this.http.get<Borrow[]>(url)
      .pipe(
        catchError(error => {
          console.error(`Error fetching borrowing records by reader ID ${readerId}:`, error);
          throw error;
        })
      );
  }

}
