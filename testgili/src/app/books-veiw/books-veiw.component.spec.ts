import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksVeiwComponent } from './books-veiw.component';

describe('BooksVeiwComponent', () => {
  let component: BooksVeiwComponent;
  let fixture: ComponentFixture<BooksVeiwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooksVeiwComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BooksVeiwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
