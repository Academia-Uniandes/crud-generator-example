import { Component, OnInit, DoCheck, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { BookModel } from '../book.model';
import { BookCrudService } from '../book-crud.service';
import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert2'

@Component({
  selector: 'app-book-crud-list',
  templateUrl: './book-crud-list-gallery.component.html',
  styleUrls: ['./book-crud-list.component.css']
})
export class BookCrudListComponent implements DoCheck {
  
  private books:any[];
  private start: number = 0;
  private totalRecords: number;
  private page: number = 1;
  private pageSize: number = 9;
  @Input() isOnlyRead: boolean = false;
  @Input() filtersFetch: any;
  @Input() bookInputItems : BookModel[];
  @Output() bookOutputItems: EventEmitter<any> = new EventEmitter<any>(); 
@Output() bookSelected: EventEmitter<any> = new EventEmitter<any>();  
  constructor(private bookCrudService: BookCrudService, private translate: TranslateService) { 
  }
	
  	ngDoCheck() {
  	if(this.bookInputItems){
  	  this.books = this.bookInputItems;
      this.bookOutputItems.emit(this.books);
      this.isOnlyRead = true;		
  	}else{
    	this.getBooks(this.start, this.pageSize);
    	this.getBookNum();
    }
  }
  
  
	
	
	
  getBooks(start: number, pageSize: number, query?: number){
    this.bookCrudService.searchBooks(start, pageSize).subscribe(data => { 
   
      if(!this.bookCrudService.getListFromLocalStorage()) { this.bookCrudService.saveListInLocalStorage(data) };
      this.books = data; 
      this.bookOutputItems.emit(this.books);
    },
    error => {
      console.error(error);
    })
  }

	
  deleteBook(id: number){
    this.bookCrudService.deleteBook(id).subscribe(result => { 
    console.log("Deleted item succesfully");
    this.translate.get('SUCCESS_DELETE').subscribe((res: string) => { swal('Ok!',res,'success') });   
    },
     error => {
       console.error(error);
       this.translate.get('ERROR_DELETE').subscribe((res: string) => { swal('Error!',res,'error') });   
     });
  }

  getBookNum(){
    this.bookCrudService.getNumTotalBook().subscribe(num => this.totalRecords = num, error => console.log(error));
  }
  
  
  private pageChanged(obj: any){
    this.start = obj.page * obj.pageSize - obj.pageSize;
    this.pageSize = obj.pageSize;
  }
  
  onSelect(book: any){
    this.bookSelected.emit(book);
  }





}

