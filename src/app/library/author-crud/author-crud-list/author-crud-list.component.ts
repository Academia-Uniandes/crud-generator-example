import { Component, OnInit, DoCheck, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { AuthorModel } from '../author.model';
import { AuthorCrudService } from '../author-crud.service';
import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert2'

@Component({
  selector: 'app-author-crud-list',
  templateUrl: './author-crud-list-gallery.component.html',
  styleUrls: ['./author-crud-list.component.css']
})
export class AuthorCrudListComponent implements DoCheck {
  
  private authors:any[];
  private start: number = 0;
  private totalRecords: number;
  private page: number = 1;
  private pageSize: number = 9;
  @Input() isOnlyRead: boolean = false;
  @Input() filtersFetch: any;
  @Input() authorInputItems : AuthorModel[];
  @Output() authorOutputItems: EventEmitter<any> = new EventEmitter<any>(); 
@Output() authorSelected: EventEmitter<any> = new EventEmitter<any>();  
  constructor(private authorCrudService: AuthorCrudService, private translate: TranslateService) { 
  }
	
  	ngDoCheck() {
  	if(this.authorInputItems){
  	  this.authors = this.authorInputItems;
      this.authorOutputItems.emit(this.authors);
      this.isOnlyRead = true;		
  	}else{
    	this.getAuthors(this.start, this.pageSize);
    	this.getAuthorNum();
    }
  }
  
  
	
	
	
  getAuthors(start: number, pageSize: number, query?: number){
    this.authorCrudService.searchAuthors(start, pageSize).subscribe(data => { 
   
      if(!this.authorCrudService.getListFromLocalStorage()) { this.authorCrudService.saveListInLocalStorage(data) };
      this.authors = data; 
      this.authorOutputItems.emit(this.authors);
    },
    error => {
      console.error(error);
    })
  }

	
  deleteAuthor(id: number){
    this.authorCrudService.deleteAuthor(id).subscribe(result => { 
    console.log("Deleted item succesfully");
    this.translate.get('SUCCESS_DELETE').subscribe((res: string) => { swal('Ok!',res,'success') });   
    },
     error => {
       console.error(error);
       this.translate.get('ERROR_DELETE').subscribe((res: string) => { swal('Error!',res,'error') });   
     });
  }

  getAuthorNum(){
    this.authorCrudService.getNumTotalAuthor().subscribe(num => this.totalRecords = num, error => console.log(error));
  }
  
  
  private pageChanged(obj: any){
    this.start = obj.page * obj.pageSize - obj.pageSize;
    this.pageSize = obj.pageSize;
  }
  
  onSelect(author: any){
    this.authorSelected.emit(author);
  }





}

