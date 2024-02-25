import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDatailsComponent } from './book-datails.component';

describe('BookDatailsComponent', () => {
  let component: BookDatailsComponent;
  let fixture: ComponentFixture<BookDatailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookDatailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookDatailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
