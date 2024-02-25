import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAmpuntComponent } from './edit-ampunt.component';

describe('EditAmpuntComponent', () => {
  let component: EditAmpuntComponent;
  let fixture: ComponentFixture<EditAmpuntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditAmpuntComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditAmpuntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
