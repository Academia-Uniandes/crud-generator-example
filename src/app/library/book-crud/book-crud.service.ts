/*
  Mock Service Enabled
*/
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BookModel } from './book.model';
import { LocatorBookCrudService } from './book-crud-locator.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../environments/environment';
import { bookMockFormat } from '../../../assets/mocks-helpers/bookMockFormat';


@Injectable()
export class BookCrudService {

  private headers: HttpHeaders;
  constructor(private http: HttpClient, private urlService: LocatorBookCrudService) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json, text/plain' });
  }
  
  saveBook(book: BookModel){
    return book.id ? this.updateBook(book) : this.createBook(book);
  }
		
  private createBook(book:BookModel) {
    book.id = Math.floor(Math.random()*100 + 1);
    this.saveItemToListInLocalStorage(book);
    let observable = new Observable(observer => { observer.next(book), observer.complete() });
    return observable;
  }

  private updateBook(book:BookModel) {
    this.updateItemToListInLocalStorage(book);
    let observable = new Observable(observer => { observer.next(book), observer.complete() });
    return observable;
  }

  searchBooks(start: number, limit: number, query?: string): Observable<Array<BookModel>> {
    if (!this.getListFromLocalStorage()) {
      let params = new HttpParams().set('key', environment.mockarooApi);
      params = params.append('count', '50');
      params = params.append('fields', JSON.stringify(bookMockFormat));
      return this.http.get<BookModel[]>(this.urlService.getUrlList(), { params: params });

    } else {
      let observable: Observable<Array<BookModel>> = new Observable(observer => { observer.next(this.getListFromLocalStorage().slice(start, start+limit)), observer.complete() });
      return observable;
    }
  }

  getBookById(id: number) {
    let observable: Observable<BookModel> = new Observable(observer => { observer.next(this.getItemFromList(id)), observer.complete() });
    return observable;
  }

  getNumTotalBook() {
    let observable: Observable<number> = new Observable(observer => { observer.next(this.getListFromLocalStorage() ? this.getListFromLocalStorage().length: 0), observer.complete() })
    return observable;
  }


  deleteBook(id: number) {
    this.deleteItemToListInLocalStorage(id);
    let observable: Observable<number> = new Observable(observer => { observer.next(id), observer.complete() });
    return observable;
  }


  getListFromLocalStorage(): BookModel[] {
    return localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')): undefined;
  }

  private getItemFromList(id: number): BookModel {
    let bookList: BookModel[] = this.getListFromLocalStorage();
    let bookInList = bookList.find(elm => elm.id == id);
    return bookInList;
  }

  private saveItemToListInLocalStorage(book: BookModel): void {
    let bookList: BookModel[] = this.getListFromLocalStorage();
    bookList.push(book);
    this.saveListInLocalStorage(bookList);
  }

  private deleteItemToListInLocalStorage(id: number): void {
    let bookList: BookModel[] = this.getListFromLocalStorage();
    let bookToDelete: BookModel = this.getItemFromList(id);
    let index = bookList.findIndex(elm => elm.id == bookToDelete.id);
    bookList.splice(index, 1);
    this.saveListInLocalStorage(bookList);
  }

  saveListInLocalStorage(bookList: BookModel[]) {
    let body = JSON.stringify(bookList);
    localStorage.setItem('books', body);
  }

  private updateItemToListInLocalStorage(book: BookModel) {
    let bookList: BookModel[] = this.getListFromLocalStorage();
    if(this.getItemFromList(book.id)){
      let index = bookList.findIndex(elm => elm.id == book.id);
      bookList.splice(index, 1, book);
    };
    this.saveListInLocalStorage(bookList);
  }


}


