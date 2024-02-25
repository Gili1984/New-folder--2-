import { Component } from '@angular/core';
import { Publisher } from '../service/publisher/publisher';
import { PublishersService } from '../service/publisher/publisher.service';
import { Location } from '@angular/common';
import { AppModule } from '../app.module';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import { MatIcon } from '@angular/material/icon';
import { MatCard } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';



@Component({
  selector: 'app-add-new-publisher',
  templateUrl: './add-new-publisher.component.html',
  styleUrl: './add-new-publisher.component.css',
  standalone:true,
  imports:[MatFormField,MatLabel,MatInput,FormsModule,MatIcon,MatCard,MatOption,MatSelectModule,MatCardModule]
})
export class AddNewPublisherComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(  private snackBar: MatSnackBar,
    private location: Location,
    private publishersService: PublishersService,)  { }

newPublisher:Publisher={
  idPublishers: 0,
  publishersName: '',
  location: ''
}

goBack(): void {
  this.location.back();
}

  
private showAlert(message: string): void {
  alert(message);
}


checkIfIdExists(): void {
 
 
  this.publishersService.getPublisherById(this.newPublisher.idPublishers).subscribe(
    (publisher: Publisher) => {
    
      this.showAlert('Error: idPublishers already exists in the database.');
    },
    (error: any) => {
      console.log("not exsist");
      
    
    }
  );
  console.log("checkIfIdExists");
  }


  addPublisher(): void {
      
    this.publishersService.getPublisherById(this.newPublisher.idPublishers).subscribe(
      (publisher: Publisher) => {
       
        this.showAlert('Error: idPublishers already exists in the database.');
        this.showAlert('Error: idPublishers already exists in the database.');
      },
      (error: any) => {
       
        this.publishersService.addPublisher(this.newPublisher).subscribe(
          () => {
            console.log('New Stock added successfully');
            this.goBack();
            this.openSnackBar()
          },
          (addError: any) => {
            console.error('Error adding new Stock:', addError);
          }
        );
      }
    );
    console.log(this.newPublisher);
    
  }
  openSnackBar() {
 
    this.snackBar.open('The publisher add seccessfuly', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['custom-snackbar'], // Apply custom CSS class
      duration: 2000, // Specify duration if needed
      announcementMessage: 'Custom announcement message', // Specify announcement message if needed
      politeness: 'assertive', // Specify politeness if needed
  
    });
  }
  

}
