import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-after-return',
  templateUrl: './page-after-return.component.html',
  styleUrl: './page-after-return.component.css'
})
export class PageAfterReturnComponent   implements OnInit{

  idBorrowing!:number;
  constructor(  
     private router: Router,
   
    @Inject(MAT_DIALOG_DATA) public data: { idBorrowing: number},
    public dialogRef: MatDialogRef<PageAfterReturnComponent>
  ) { 
    this.idBorrowing = data.idBorrowing;
  }

  ngOnInit(): void {
   
      }
      
      backBorrowing(): void {
        this.router.navigate(['/borrowing']);
      }
      
      backHome(): void {
        this.router.navigate(['/home']);
      }
      
      
}
