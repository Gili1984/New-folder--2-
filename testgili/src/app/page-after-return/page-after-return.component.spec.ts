import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAfterReturnComponent } from './page-after-return.component';

describe('PageAfterReturnComponent', () => {
  let component: PageAfterReturnComponent;
  let fixture: ComponentFixture<PageAfterReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageAfterReturnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageAfterReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
