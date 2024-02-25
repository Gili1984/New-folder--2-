import { Component } from '@angular/core';
import { Reader } from '../service/readers/reader';
import { ReaderService } from '../service/readers/reader.service';
import { CommonModule, Location } from '@angular/common';
import { AppModule } from '../app.module';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

import { MatIcon } from '@angular/material/icon';
import { MatCard } from '@angular/material/card';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-new-reader',
  templateUrl: './add-new-reader.component.html',
  styleUrl: './add-new-reader.component.css',
//   standalone:true,
//   imports:[MatInputModule,MatFormFieldModule,FormsModule,MatIcon,MatCard,MatOption,MatSelectModule,MatCardModule, MatInputModule,CommonModule,
// AppModule,
//     MatNativeDateModule,
//     MatDatepickerModule,
//     MatNativeDateModule,],
//   providers: [DatePipe],
})
export class AddNewReaderComponent {
  newReader: Reader = {
    idReader: 0,
    readerName: '',
    phone: '',
    email: '',
    birthDate: new Date(),
  };
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  successMessage: string | null = null;
  today: Date = new Date();
  constructor(private location: Location,
    private readerService: ReaderService,
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,) { 

  }

  goBack(): void {
    this.router.navigate(['/readers']);
  }
  
  
  private showAlert(message: string): void {
    alert(message);
  }

  checkIfIdExists(): void {
    // Check if the idReader already exists
    this.readerService.getReaderById(this.newReader.idReader).subscribe(
      (reader: Reader) => {
        // Reader with the specified idReader already exists
        this.showAlert('Error: idReader already exists in the database.');
      },
      (error: any) => {
        // Reader with the specified idReader does not exist
      }
    );
    }
    
  addReader(): void {
      // Check if any required field is missing
  if (!this.newReader.idReader || !this.newReader.readerName || !this.newReader.phone || !this.newReader.email) {
    // Display an error message
    alert('Please fill in all required fields.');
    return;}
  // Exit the function early
    this.readerService.getReaderById(this.newReader.idReader).subscribe(
      (reader: Reader) => {
        // Reader with the specified idReader already exists
        console.error('Error: idReader already exists in the database.');
        this.showAlert('Error: idReader already exists in the database.');
      },
      (error: any) => {
        // Reader with the specified idReader does not exist
        this.readerService.addReader(this.newReader).subscribe(
          () => {
            console.log('New reader added successfully');
            this.successMessage = 'New reader added successfully';
            this.goBack();
            this.openSnackBar()
          },
          (addError: any) => {
            console.error('Error adding new reader:', addError);
          }
        );
      }
    );
  }



  openSnackBar() {
 
    this.snackBar.open('The reader add seccessfuly', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['custom-snackbar'], // Apply custom CSS class
      duration: 2000, // Specify duration if needed
      announcementMessage: 'Custom announcement message', // Specify announcement message if needed
      politeness: 'assertive', // Specify politeness if needed
  
    });
  }
  


}
