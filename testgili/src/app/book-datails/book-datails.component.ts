import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Stock } from '../service/stock/stock';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-book-datails',
  templateUrl: './book-datails.component.html',
  styleUrls: ['./book-datails.component.css'] // Fix the typo here, should be styleUrls instead of styleUrl
})
export class BookDatailsComponent  implements OnInit {


  constructor(private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: { book: Stock },
    public dialogRef: MatDialogRef<BookDatailsComponent>
  ) { }

  ngOnInit(): void {
  }
  borrowingList(idBook: number){
    console.log(this.data.book.publicationDate);
    
  }
  formatDate(date: any): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }
}
