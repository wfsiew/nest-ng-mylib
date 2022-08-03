import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksBorrowComponent } from './books-borrow.component';

describe('BooksBorrowComponent', () => {
  let component: BooksBorrowComponent;
  let fixture: ComponentFixture<BooksBorrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksBorrowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksBorrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
