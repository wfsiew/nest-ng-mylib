import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BooksAvailableComponent } from './books/books-available/books-available.component';
import { BooksBorrowComponent } from './books/books-borrow/books-borrow.component';
import { BooksBorrowHistoryComponent } from './books/books-borrow-history/books-borrow-history.component';
import { BooksBorrowAllComponent } from './books/books-borrow-all/books-borrow-all.component';
import { ReturnBookComponent } from './book/return-book/return-book.component';
import { RegisterBookComponent } from './book/register-book/register-book.component';

import { AuthGuardService } from 'src/app/shared/services/auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'main',
    component: IndexComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'books/available',
        component: BooksAvailableComponent
      },
      {
        path: 'books/borrow/current',
        component: BooksBorrowComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'books/borrow/history',
        component: BooksBorrowHistoryComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'books/borrow/all',
        component: BooksBorrowAllComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'book/register',
        component: RegisterBookComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'book/return',
        component: ReturnBookComponent,
        canActivate: [AuthGuardService]
      }
    ]
  },
  { path: '**', redirectTo: '/main/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
