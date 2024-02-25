import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksAcordingToCategoryComponent } from './books-acording-to-category.component';

describe('BooksAcordingToCategoryComponent', () => {
  let component: BooksAcordingToCategoryComponent;
  let fixture: ComponentFixture<BooksAcordingToCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooksAcordingToCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BooksAcordingToCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
