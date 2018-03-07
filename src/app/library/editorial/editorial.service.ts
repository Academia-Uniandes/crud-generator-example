/*
  Mock Service Enabled
*/
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EditorialModel } from './editorial.model';
import { LocatorEditorialService } from './editorial-locator.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../environments/environment';
import { editorialMockFormat } from '../../../assets/mocks-helpers/editorialMockFormat';


@Injectable()
export class EditorialService {

  private headers: HttpHeaders;
  constructor(private http: HttpClient, private urlService: LocatorEditorialService) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json, text/plain' });
  }
  
  saveEditorial(editorial: EditorialModel){
    return editorial.id ? this.updateEditorial(editorial) : this.createEditorial(editorial);
  }
		
  private createEditorial(editorial:EditorialModel) {
    editorial.id = Math.floor(Math.random()*100 + 1);
    this.saveItemToListInLocalStorage(editorial);
    let observable = new Observable(observer => { observer.next(editorial), observer.complete() });
    return observable;
  }

  private updateEditorial(editorial:EditorialModel) {
    this.updateItemToListInLocalStorage(editorial);
    let observable = new Observable(observer => { observer.next(editorial), observer.complete() });
    return observable;
  }

  searchEditorials(start: number, limit: number, query?: string): Observable<Array<EditorialModel>> {
    if (!this.getListFromLocalStorage()) {
      let params = new HttpParams().set('key', environment.mockarooApi);
      params = params.append('count', '50');
      params = params.append('fields', JSON.stringify(editorialMockFormat));
      return this.http.get<EditorialModel[]>(this.urlService.getUrlList(), { params: params });

    } else {
      let observable: Observable<Array<EditorialModel>> = new Observable(observer => { observer.next(this.getListFromLocalStorage().slice(start, start+limit)), observer.complete() });
      return observable;
    }
  }

  getEditorialById(id: number) {
    let observable: Observable<EditorialModel> = new Observable(observer => { observer.next(this.getItemFromList(id)), observer.complete() });
    return observable;
  }

  getNumTotalEditorial() {
    let observable: Observable<number> = new Observable(observer => { observer.next(this.getListFromLocalStorage() ? this.getListFromLocalStorage().length: 0), observer.complete() })
    return observable;
  }


  deleteEditorial(id: number) {
    this.deleteItemToListInLocalStorage(id);
    let observable: Observable<number> = new Observable(observer => { observer.next(id), observer.complete() });
    return observable;
  }


  getListFromLocalStorage(): EditorialModel[] {
    return localStorage.getItem('editorials') ? JSON.parse(localStorage.getItem('editorials')): undefined;
  }

  private getItemFromList(id: number): EditorialModel {
    let editorialList: EditorialModel[] = this.getListFromLocalStorage();
    let editorialInList = editorialList.find(elm => elm.id == id);
    return editorialInList;
  }

  private saveItemToListInLocalStorage(editorial: EditorialModel): void {
    let editorialList: EditorialModel[] = this.getListFromLocalStorage();
    editorialList.push(editorial);
    this.saveListInLocalStorage(editorialList);
  }

  private deleteItemToListInLocalStorage(id: number): void {
    let editorialList: EditorialModel[] = this.getListFromLocalStorage();
    let editorialToDelete: EditorialModel = this.getItemFromList(id);
    let index = editorialList.findIndex(elm => elm.id == editorialToDelete.id);
    editorialList.splice(index, 1);
    this.saveListInLocalStorage(editorialList);
  }

  saveListInLocalStorage(editorialList: EditorialModel[]) {
    let body = JSON.stringify(editorialList);
    localStorage.setItem('editorials', body);
  }

  private updateItemToListInLocalStorage(editorial: EditorialModel) {
    let editorialList: EditorialModel[] = this.getListFromLocalStorage();
    if(this.getItemFromList(editorial.id)){
      let index = editorialList.findIndex(elm => elm.id == editorial.id);
      editorialList.splice(index, 1, editorial);
    };
    this.saveListInLocalStorage(editorialList);
  }


}


