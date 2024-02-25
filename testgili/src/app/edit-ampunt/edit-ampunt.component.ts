import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Stock } from '../service/stock/stock';
import { StockService } from '../service/stock/stock.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-ampunt',
  templateUrl: './edit-ampunt.component.html',
  styleUrl: './edit-ampunt.component.css'
})
export class EditAmpuntComponent implements OnInit {
  newAmount!:number;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  quantityError: boolean = false;
  quantityErrorMessage: string = '';
  constructor(private stockService: StockService,private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { book: Stock },
    public dialogRef: MatDialogRef<EditAmpuntComponent>
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    
  }

  edit(): void {
    console.log(this.newAmount);
    console.log(this.data.book.idBook);
      // Call incrementAmount function from StockService and pass parameters
      this.stockService.incrementAmount(this.data.book.idBook, this.newAmount)
      .subscribe(response => {
        // Handle success response if needed
        console.log('Amount incremented successfully:', response);
        this.dialogRef.close(true);
        //this.goBack();
        this.openSnackBar()
      }, error => {
        // Handle error if needed
        console.error('Error incrementing amount:', error);
      });
    
  }
  
  // goBack(): void {
  //   this.location.back();
  // }
  
  validateQuantity() {
    if (!Number.isInteger(this.newAmount) || this.newAmount < 0 || this.newAmount > 100) {
      this.quantityError = true;
      this.quantityErrorMessage = 'Please enter a valid quantity (a whole number between 0 and 100).';
    } else {
      this.quantityError = false;
      this.quantityErrorMessage = '';
    }
  }
 
  openSnackBar() {
 
    this.snackBar.open('The amount update seccessfuly', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['custom-snackbar'], // Apply custom CSS class
      duration: 2000, // Specify duration if needed
      announcementMessage: 'Custom announcement message', // Specify announcement message if needed
      politeness: 'assertive', // Specify politeness if needed
  
    });
  }
  



}
