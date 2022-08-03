import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  title!: string;
  message!: string;

  public onClose!: Subject<any>;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  onYes() {
    this.onClose.next({ result: true });
    this.bsModalRef.hide();
  }

  onHide() {
    this.onClose.next({ result: false });
    this.bsModalRef.hide();
  }
}
