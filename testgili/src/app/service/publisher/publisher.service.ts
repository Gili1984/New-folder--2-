import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Publisher } from './publisher';
import { Stock } from '../stock/stock';

@Injectable({
  providedIn: 'root',
})
export class PublishersService {
  

  constructor(private http: HttpClient) {}

  getAllPublishers(): Observable<any[]> {

    return this.http.get<any[]>(`http://localhost:8080/getAllActivePublishers`)
      .pipe(
        catchError(error => {
          console.error('Error fetching Publishers:', error);
          throw error; 
        })
      );
  }

  getPublisherById(id: number): Observable<Publisher> {
    const url = `http://localhost:8080/getPublisherById/${id}`;
    return this.http.get<Publisher>(url);
  }
  findStocksByPublisherAndNotDeleted(id: number): Observable<Stock[]> {
    const url = `http://localhost:8080/findStocksByPublisherAndNotDeleted/${id}`;
    return this.http.get<Stock[]>(url);
  }

  addPublisher(newPublisher: Publisher): Observable<void> {
    return this.http.post<void>(`http://localhost:8080/addPublisher`, newPublisher);
  }

  softDeletePublisherIfNoStocks(publisherId: number): Observable<string> {
    return this.http.patch<string>(`http://localhost:8080/softDeletePublisherIfNoStocks/${publisherId}`, null);
  }
  
}