import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksBorrowAllComponent } from './books-borrow-all.component';

describe('BooksBorrowAllComponent', () => {
  let component: BooksBorrowAllComponent;
  let fixture: ComponentFixture<BooksBorrowAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksBorrowAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksBorrowAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
