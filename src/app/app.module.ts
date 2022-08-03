import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule, POSITION } from 'ngx-ui-loader';

import { AppRoutingModule } from './app-routing.module';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { ErrorModalComponent } from './shared/components/error-modal/error-modal.component';
import { BooksAvailableComponent } from './books/books-available/books-available.component';
import { BooksBorrowComponent } from './books/books-borrow/books-borrow.component';
import { BooksBorrowHistoryComponent } from './books/books-borrow-history/books-borrow-history.component';
import { ReturnBookComponent } from './book/return-book/return-book.component';
import { RegisterBookComponent } from './book/register-book/register-book.component';

import { environment } from '../environments/environment';

import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { HttpTimeoutInterceptor } from './shared/interceptors/timeout.interceptor';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';

import { MessageService } from './shared/services/message.service';
import { AuthService } from './shared/services/auth.service';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { BookService } from './services/book.service';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    HomeComponent,
    ErrorModalComponent,
    BooksAvailableComponent,
    BooksBorrowComponent,
    BooksBorrowHistoryComponent,
    ReturnBookComponent,
    RegisterBookComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    NgxUiLoaderModule.forRoot({
      bgsPosition: POSITION.centerCenter,
      // bgsColor: '#dc143c',
      bgsType: 'square-jelly-box',
      // fgsColor: '#dc143c',
      fgsType: 'square-jelly-box'
    }),
    NgxUiLoaderHttpModule.forRoot({
      showForeground: false,
      exclude: [
        `${environment.baseUrl}/o/token/`,
        `${environment.baseUrl}/api/current-user`
      ]
    }),
  ],
  entryComponents: [
    ErrorModalComponent
  ],
  providers: [
    MessageService,
    AuthService,
    AuthGuardService,
    BookService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTimeoutInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
