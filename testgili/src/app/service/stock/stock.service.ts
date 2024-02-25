import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { catchError, map, tap } from 'rxjs/operators';
import { Category, Stock } from './stock';
import { SharedService } from '../shared.serice';
import { TopBorrowings } from '../borrowing/topBorrowings';



@Injectable({
  providedIn: 'root'
})
export class StockService {

    constructor(private http: HttpClient, private sharedService: SharedService) { }


    softDeleteIfNoOpenBorrows(stockId: number): Observable<string> {
      return this.http.patch<string>(`http://localhost:8080/softDeleteIfNoOpenBorrows/${stockId}`, null);
    }
    
  getAllBooks(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/getAllActiveStocks').pipe(
      tap(books => {
        this.sharedService.setBooks(books); // Set fetched books in SharedService
      }),
      catchError(error => {
        console.error('Error fetching books:', error);
        return throwError(error);
      })
    );
  }

  getTop5BorrowedBooks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`http://localhost:8080/getTop5BorrowedBooks`)
      .pipe(
        catchError(error => {
          console.error('Error fetching getTop5BorrowedBooks:', error);
          return throwError(error);
        })
      );
  }


      getAllCategories(): Observable<any[]> {

        return this.http.get<any[]>(`http://localhost:8080/getAllCategories`)
          .pipe(
            catchError(error => {
              console.error('Error fetching getAllCategories:', error);
              throw error; 
            })
          );
      }

      incrementAmount(id: number, amountToAdd: number): Observable<any> {
        return this.http.patch<any>(`http://localhost:8080/incrementAmount/${id}?amountToAdd=${amountToAdd}`, null)
          .pipe(
            catchError(error => {
              console.error('Error incrementing book amount:', error);
              return throwError(error);
            })
          );
      }

      
  getStockById(id: number): Observable<Stock> {
    const url = `http://localhost:8080/getBookById/${id}`;
    return this.http.get<Stock>(url);
  }
        

  getBooksByCategory(category: Category): Observable<Stock[]> {
    const url = `http://localhost:8080/getStockByCategoryAndNotDeleted/${category}`;
    return this.http.get<Stock[]>(url);
  }
  
  addBook(newBook: Stock): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/addBook`, newBook);
  }



  
  updateAmountInLibrary(id: number): Observable<string> {
    console.log('Updating amount in library for book ID:', id);
    const url = `http://localhost:8080/updateAmountInLibrary/${id}`;
  
    return this.http.put(url, null, { responseType: 'text' })
        .pipe(
            catchError(error => {
                console.error('Error updating amount in Library:', error);
                throw error;
            })
        );
  }

    

  updateTopBooks(id: number): Observable<any> {
    return this.http.patch<any>(`http://localhost:8080/updateTopBooks/${id}`, null)
      .pipe(
        catchError(error => {
          console.error('Error updateTopBooks book amount:', error);
          return throwError(error);
        })
      );
  }

}