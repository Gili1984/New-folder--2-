import { ComponentFixture, TestBed } from '@angular/core/testing';


import { AddNewReaderComponent } from './add-new-reader.component';

describe('AddNewReaderComponent', () => {
  let component: AddNewReaderComponent;
  let fixture: ComponentFixture<AddNewReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewReaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
