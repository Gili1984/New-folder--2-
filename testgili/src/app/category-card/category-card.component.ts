import { Component } from '@angular/core';
import { Category, Stock } from '../service/stock/stock';
import { FormControl, FormGroup } from '@angular/forms';
import { StockService } from '../service/stock/stock.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {
  dataSource!: MatTableDataSource<Category>;


  src: string[] = [
    'https://images.pexels.com/photos/7956375/pexels-photo-7956375.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/764681/pexels-photo-764681.jpeg?auto=compress&cs=tinysrgb&w=600',
     'https://images.pexels.com/photos/3771129/pexels-photo-3771129.jpeg?auto=compress&cs=tinysrgb&w=600',

'https://images.pexels.com/photos/7540020/pexels-photo-7540020.jpeg?auto=compress&cs=tinysrgb&w=600',
'https://media.istockphoto.com/id/1015399630/photo/making-profile.jpg?b=1&s=612x612&w=0&k=20&c=U00a5IYD6peHMzd0BKDOId66w8NZHGq1bzHKzvDK3H0='

  ];

  categorys: Category[] = [];
  //dataSource: MatTableDataSource<Stock>;
  searchForm: FormGroup;
  originalCategorys: Category[] = []; 
  
  constructor(private stockService: StockService,public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Category>([]); 
    this.searchForm = new FormGroup({
      searchValue: new FormControl(''),  });
  }

  


  ngOnInit(): void {

    this.stockService.getAllCategories().subscribe(
      (data: Category[]) => {
        //this.categorys = data;
        console.log(data)
      

      // Filter out the categories PHILOSOPHY and PSYCHOANALYSIS
this.categorys = data.filter(category => {
  return category.toString() !== Category[Category.PHILOSOPHY] && category.toString() !== Category[Category.PSYCHOANALYSIS];
});
console.log(this.categorys);
      
        //this.dataSource.data = this.books;
        this.dataSource.data = this.originalCategorys; 
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
    //this.setupSearchListener();
  }

  




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goToAllBooksView(){
    
  }
}
