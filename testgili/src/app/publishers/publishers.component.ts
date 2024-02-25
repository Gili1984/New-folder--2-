import { Component, ViewChild } from '@angular/core';
import { Publisher } from '../service/publisher/publisher';
import { MatTableDataSource,MatTableModule } from '@angular/material/table';
import { PublishersService } from '../service/publisher/publisher.service';
import { CommonModule, Location } from '@angular/common';
import { AppModule } from '../app.module';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { SoftDeleteComponent } from '../soft-delete/soft-delete.component';
import { MatSelectModule } from '@angular/material/select';
import { ReportComponent } from '../report/report.component';

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrl: './publishers.component.css',
  standalone:true,
  imports:[MatTableModule,RouterLink,FormsModule,MatFormFieldModule,
    MatInputModule,MatLabel,MatButtonModule, 
    MatTooltipModule, MatIconModule,CommonModule ,
    MatFormFieldModule, MatInputModule, 
    MatTableModule, MatSortModule, MatPaginatorModule,MatSelectModule]
})
export class PublishersComponent {
  publishers: Publisher[] = [];
  reportForPublisher!: Publisher;
  publishersForSelect: Publisher[] = [];
  displayedColumns: string[] = ['idPublishers', 'publishersName', 'location'];

  dataSource = new MatTableDataSource<Publisher>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private location: Location,
    public dialog: MatDialog ,
    private publisherService: PublishersService) { 
    this.dataSource = new MatTableDataSource(this.publishers);
  }
 
  goBack(): void {
    this.location.back();
  }

  openDialog(): void {
    console.log(this.reportForPublisher);
    const dialogRef = this.dialog.open(ReportComponent, {
      width: '900px',
      data: { publisher:this.reportForPublisher }
    });
    
  }

  openDeleteDialog(publisher: Publisher): void {
    const dialogData = {
      objectType: 'Publisher', // or 'Publisher' depending on the object type // Pass your reader object
      publisher: publisher // Pass your publisher object
    };
    const dialogRef = this.dialog.open(SoftDeleteComponent, {
      width: '500px',
      data: dialogData
    });
  
    // Subscribe to the afterClosed() method
    dialogRef.afterClosed().subscribe(result => {
      // If result is true (indicating "YES" was clicked)
      if (result) {
        this.ngOnInit(); // Fetch the updated list of books
      }
    });
  }




  ngOnInit(): void {
    this.publisherService.getAllPublishers().subscribe(
      (data: Publisher[]) => {
        console.log(data)
        this.dataSource.data = data; 
        this.publishersForSelect=data;
      },
      (error) => {
        console.error('Error fetching publishers:', error);
      }
    );
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    this.dataSource.filterPredicate = (data: Publisher, filter: string) => {
      // Check if filter is a number
      const isNumeric = !isNaN(parseFloat(filter)) && isFinite(parseFloat(filter));
      if (isNumeric) {
        // Filter by idBook or idReader if the input is a number
        return data.idPublishers.toString().includes(filter);
      } else {
        // Filter by bookName or readerName if the input is not a number
        return data.publishersName.toLowerCase().includes(filter);
      }
    };
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
