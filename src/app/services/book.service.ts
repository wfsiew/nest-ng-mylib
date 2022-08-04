import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  listAvailable(page: any, limit: any) {
    let prm: HttpParams = new HttpParams()
      .set('_page', page)
      .set('_limit', limit);
    return this.http.get(`${this.baseUrl}/book/available`, { params: prm, observe: 'response' });
  }

  listBorrowCurrent(page: any, limit: any) {
    let prm: HttpParams = new HttpParams()
      .set('_page', page)
      .set('_limit', limit);
    return this.http.get(`${this.baseUrl}/book/borrow/current`, { params: prm, observe: 'response' });
  }

  listBookBorrowHistory(page: any, limit: any) {
    let prm: HttpParams = new HttpParams()
      .set('_page', page)
      .set('_limit', limit);
    return this.http.get(`${this.baseUrl}/book/borrow/history`, { params: prm, observe: 'response' });
  }

  listBookBorrowAll(page: any, limit: any) {
    let prm: HttpParams = new HttpParams()
      .set('_page', page)
      .set('_limit', limit);
    return this.http.get(`${this.baseUrl}/book/borrow/all`, { params: prm, observe: 'response' });
  }

  registerBook(o: any) {
    return this.http.post(`${this.baseUrl}/book/borrow/register`, o);
  }

  returnBook(o: any) {
    return this.http.post(`${this.baseUrl}/book/borrow/return`, o);
  }

  renewBook(id: number, book_id: number) {
    return this.http.post(`${this.baseUrl}/book/borrow/renew/${id}/${book_id}`, {});
  }
}
