import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { BookService } from 'src/app/services/book.service';
import { GeneralForm } from 'src/app/shared/classes/general.form';

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrls: ['./return-book.component.scss']
})
export class ReturnBookComponent extends GeneralForm {

  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private toastr: ToastrService
  ) {
    super();
    this.createForm();
  }

  createForm() {
    this.mform = this.fb.group({
      isbn: ['', [Validators.required]],
      username: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.mform.invalid) {
      this.mform.markAllAsTouched();
      return;
    }
    
    const f = this.mform.value;
    const o: any = {
      isbn: f.isbn,
      username: f.username
    }

    this.bookService.returnBook(o).subscribe({
      next: (res: any) => {
        this.toastr.success('Book successfully returned');
        this.mform.reset();
      }
    });
  }
}
