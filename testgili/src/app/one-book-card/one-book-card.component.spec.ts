import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneBookCardComponent } from './one-book-card.component';

describe('OneBookCardComponent', () => {
  let component: OneBookCardComponent;
  let fixture: ComponentFixture<OneBookCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OneBookCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OneBookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
