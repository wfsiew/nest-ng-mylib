import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';

import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

const components = [
  ConfirmModalComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  exports: components,
  entryComponents: [
    ConfirmModalComponent
  ],
  providers: []
})
export class SharedComponentsModule { }
