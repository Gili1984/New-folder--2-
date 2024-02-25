import { Component } from '@angular/core';
import { AppModule } from '../app.module';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  standalone:true,
   imports:[MatIcon,RouterLink,MatToolbar,MatToolbarModule]

})
export class NavComponent {


  constructor(){}
}
