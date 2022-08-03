import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksBorrowHistoryComponent } from './books-borrow-history.component';

describe('BooksBorrowHistoryComponent', () => {
  let component: BooksBorrowHistoryComponent;
  let fixture: ComponentFixture<BooksBorrowHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksBorrowHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksBorrowHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
