import { Component, OnInit } from '@angular/core';

import { BookService } from 'src/app/services/book.service';
import { AppConstant } from 'src/app/shared/constants/app.constant';
import { Helper } from 'src/app/shared/utils/helper';
import { Book } from 'src/app/shared/models/book';

@Component({
  selector: 'app-books-available',
  templateUrl: './books-available.component.html',
  styleUrls: ['./books-available.component.scss']
})
export class BooksAvailableComponent implements OnInit {

  isLoading = false;
  list: Book[] = [];
  totalCount = 0;
  totalPage = 0;
  pageSize = AppConstant.PAGE_SIZE;
  page = 1;

  readonly isEmpty = Helper.isEmpty;
  readonly PAGE_SIZE = AppConstant.PAGE_SIZE;
  readonly MAX_PAGE_NUMBERS = AppConstant.MAX_PAGE_NUMBERS;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.isLoading = true;
    this.bookService.listAvailable(this.page, AppConstant.PAGE_SIZE).subscribe({
      next: (res: any) => {
        this.list = res.body;
        const headers = res.headers;
        this.totalCount = Number(headers.get(AppConstant.HTTP_HEADER.X_TOTAL_COUNT));
        this.totalPage = Number(headers.get(AppConstant.HTTP_HEADER.X_TOTAL_PAGE));
        this.isLoading = false;
      }
    });
  }

  pageChanged(event: any) {
    this.page = event.page;
    this.load();
  }
}
