import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { BookService } from 'src/app/services/book.service';
import { AppConstant } from 'src/app/shared/constants/app.constant';
import { Helper } from 'src/app/shared/utils/helper';
import { BooksBorrow } from 'src/app/shared/models/book';

@Component({
  selector: 'app-books-borrow',
  templateUrl: './books-borrow.component.html',
  styleUrls: ['./books-borrow.component.scss']
})
export class BooksBorrowComponent implements OnInit {

  isLoading = false;
  list: BooksBorrow[] = [];
  totalCount = 0;
  totalPage = 0;
  pageSize = AppConstant.PAGE_SIZE;
  page = 1;
  bsModalRef!: BsModalRef;

  readonly isEmpty = Helper.isEmpty;
  readonly PAGE_SIZE = AppConstant.PAGE_SIZE;
  readonly MAX_PAGE_NUMBERS = AppConstant.MAX_PAGE_NUMBERS;

  constructor(
    private bookService: BookService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.isLoading = true;
    this.bookService.listBorrowCurrent(this.page, AppConstant.PAGE_SIZE).subscribe({
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

  onRenew(o: BooksBorrow) {
    const initialState = {
      title: 'Renew Book',
      message: `Are you sure to renew this Book <b>${o.book.isbn}</b> ?`
    };
    this.bsModalRef = this.modalService.show(ConfirmModalComponent, { class: 'modal-dialog-centered', initialState });
    this.bsModalRef.content.onClose.subscribe({
      next: (res: any) => {
        if (res.result === true) {
          this.bookService.renewBook(o.id, o.book_id).subscribe({
            next: (res: any) => {
              this.toastr.success('Book successfully renewed');
              this.load();
            }
          });
        }
      }
    });
  }
}
