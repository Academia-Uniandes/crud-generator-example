/*
  Mock Service Enabled
*/
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthorModel } from './author.model';
import { LocatorAuthorCrudService } from './author-crud-locator.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../environments/environment';
import { authorMockFormat } from '../../../assets/mocks-helpers/authorMockFormat';


@Injectable()
export class AuthorCrudService {

  private headers: HttpHeaders;
  constructor(private http: HttpClient, private urlService: LocatorAuthorCrudService) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json, text/plain' });
  }
  
  saveAuthor(author: AuthorModel){
    return author.id ? this.updateAuthor(author) : this.createAuthor(author);
  }
		
  private createAuthor(author:AuthorModel) {
    author.id = Math.floor(Math.random()*100 + 1);
    this.saveItemToListInLocalStorage(author);
    let observable = new Observable(observer => { observer.next(author), observer.complete() });
    return observable;
  }

  private updateAuthor(author:AuthorModel) {
    this.updateItemToListInLocalStorage(author);
    let observable = new Observable(observer => { observer.next(author), observer.complete() });
    return observable;
  }

  searchAuthors(start: number, limit: number, query?: string): Observable<Array<AuthorModel>> {
    if (!this.getListFromLocalStorage()) {
      let params = new HttpParams().set('key', environment.mockarooApi);
      params = params.append('count', '50');
      params = params.append('fields', JSON.stringify(authorMockFormat));
      return this.http.get<AuthorModel[]>(this.urlService.getUrlList(), { params: params });

    } else {
      let observable: Observable<Array<AuthorModel>> = new Observable(observer => { observer.next(this.getListFromLocalStorage().slice(start, start+limit)), observer.complete() });
      return observable;
    }
  }

  getAuthorById(id: number) {
    let observable: Observable<AuthorModel> = new Observable(observer => { observer.next(this.getItemFromList(id)), observer.complete() });
    return observable;
  }

  getNumTotalAuthor() {
    let observable: Observable<number> = new Observable(observer => { observer.next(this.getListFromLocalStorage() ? this.getListFromLocalStorage().length: 0), observer.complete() })
    return observable;
  }


  deleteAuthor(id: number) {
    this.deleteItemToListInLocalStorage(id);
    let observable: Observable<number> = new Observable(observer => { observer.next(id), observer.complete() });
    return observable;
  }


  getListFromLocalStorage(): AuthorModel[] {
    return localStorage.getItem('authors') ? JSON.parse(localStorage.getItem('authors')): undefined;
  }

  private getItemFromList(id: number): AuthorModel {
    let authorList: AuthorModel[] = this.getListFromLocalStorage();
    let authorInList = authorList.find(elm => elm.id == id);
    return authorInList;
  }

  private saveItemToListInLocalStorage(author: AuthorModel): void {
    let authorList: AuthorModel[] = this.getListFromLocalStorage();
    authorList.push(author);
    this.saveListInLocalStorage(authorList);
  }

  private deleteItemToListInLocalStorage(id: number): void {
    let authorList: AuthorModel[] = this.getListFromLocalStorage();
    let authorToDelete: AuthorModel = this.getItemFromList(id);
    let index = authorList.findIndex(elm => elm.id == authorToDelete.id);
    authorList.splice(index, 1);
    this.saveListInLocalStorage(authorList);
  }

  saveListInLocalStorage(authorList: AuthorModel[]) {
    let body = JSON.stringify(authorList);
    localStorage.setItem('authors', body);
  }

  private updateItemToListInLocalStorage(author: AuthorModel) {
    let authorList: AuthorModel[] = this.getListFromLocalStorage();
    if(this.getItemFromList(author.id)){
      let index = authorList.findIndex(elm => elm.id == author.id);
      authorList.splice(index, 1, author);
    };
    this.saveListInLocalStorage(authorList);
  }


}


