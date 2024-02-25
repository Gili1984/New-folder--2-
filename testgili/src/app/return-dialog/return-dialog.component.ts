import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { BorrowingComponent } from '../borrowing/borrowing.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Borrow } from '../service/borrowing/borrowing';
import { BorrowUpdate } from '../service/borrowing/borrowUpdate';
import { BorrowingService } from '../service/borrowing/borrowing.service';
import { StockService } from '../service/stock/stock.service';
import { catchError } from 'rxjs';
import { DatePipe, Location } from '@angular/common';
import { Router } from '@angular/router';
import { PageAfterReturnComponent } from '../page-after-return/page-after-return.component';
@Component({
  selector: 'app-return-dialog',
  templateUrl: './return-dialog.component.html',
  styleUrl: './return-dialog.component.css'
})
export class ReturnDialogComponent  implements OnInit {
  borrowing: Borrow;

  constructor(  private borrowingService: BorrowingService,
     private router: Router,public dialog: MatDialog,
    private stockService: StockService, private location: Location,
    @Inject(MAT_DIALOG_DATA) public data: { borrowing: Borrow},
    public dialogRef: MatDialogRef<BorrowingComponent>
  ) { 
    this.borrowing = data.borrowing;
  }

  ngOnInit(): void {
    console.log("borrowing",this.borrowing);
    console.log("idBorrowing",this.borrowing.idBorrowing);
      }
      

    onDateReturnChange(event: any): void {
      this.dialogRef.close(true);
    //   const currentDate = new Date();
    //   console.log(event.idBorrowing);
    //   const year = currentDate.getFullYear().toString();
    //   const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if necessary
    //     const day = currentDate.getDate().toString().padStart(2, '0'); // Add leading zero if necessary

    // const formattedDate = year +'-'+ month +'-'+ day;
    //  console.log(formattedDate); 
      
        // const updatedDate: string = event.target.value;
        // const updatedBorrowingDateOnly: BorrowUpdate = { 
        //   dateReturn: formattedDate
        // };
        this.updateBorrowingDateReturn(event.idBorrowing);
       
    }
    
    
    goBack(): void {
      this.location.back();
    }
      
    updateBorrowingDateReturn(id: number): void {
      this.borrowingService.updateBorrowingDateReturn(id).subscribe(
        (response: any) => {
          if (response && response.message === 'Borrowing dateReturn updated successfully') {
            console.log('Borrowing dateReturn updated successfully');
            console.log(id);
    
            // Fetch the borrowing details by id
            this.borrowingService.getBorrowingById(id).subscribe(
              (borrow: Borrow) => {
               
                this.updateAmountInLibrary(borrow.idBook.idBook);
                //this.newBorrowChange.emit(this.borrowings);
                //console.log('Updated borrowings:', this.data.borrowings); 

                //this.dialogRef.close(this.data.borrowings);
                this.openDialog(borrow.idBorrowing)
              },
              (error) => {
                console.error('Error fetching borrowing details:', error);
              }
            );
          } else {
            console.error('Error updating borrowing dateReturn:', response ? response.message : 'Unknown error');
          }
        },
        (error) => {
          console.error('Error updating borrowing dateReturn:', error);
        }
      );

    }
    
    openDialog(idBorrowing:number):void{
      const dialogRef = this.dialog.open(PageAfterReturnComponent, {
        width: '500px',
        data: { idBorrowing:idBorrowing}
      });
    }
      

      updateAmountInLibrary(bookId: number): void {
     
        // Call the service method to update amountInLibrary
        this.stockService.updateAmountInLibrary(bookId).pipe(
          catchError(error => {
            console.error('Error updating amount in Library:', error);
            throw error;
          })
        ).subscribe(
          () => {
            console.log('Amount in Library updated successfully');
          }
        );
      }
     
  



  // borrowingList(idBook: number){
  //   console.log(idBook);
    
  // }
}
