import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reader } from './reader';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReaderService {
  //private apiUrl = '/api/readers'; // Assuming your readers API endpoint

  constructor(private http: HttpClient) {}
  getReaders(): Observable<any[]> {

    return this.http.get<any[]>(`http://localhost:8080/getAllActiveReaders`)
      .pipe(
        catchError(error => {
          console.error('Error fetching books:', error);
          throw error; 
        })
      );
  }

  addReader(newReader: Reader): Observable<void> {
    return this.http.post<void>(`http://localhost:8080/addReader`, newReader);
  }

  getReaderById(id: number): Observable<Reader> {
    const url = `http://localhost:8080/getreaderById/${id}`;
    return this.http.get<Reader>(url);
  }

  softDeleteIfNoOpenBorrows(readerId: number): Observable<string> {
    return this.http.patch<string>(`http://localhost:8080/softDeleteReaderIfNoOpenBorrows/${readerId}`, null);
  }
  

}
