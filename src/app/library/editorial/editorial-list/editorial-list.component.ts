import { Component, OnInit, DoCheck, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { EditorialModel } from '../editorial.model';
import { EditorialService } from '../editorial.service';
import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert2'

@Component({
  selector: 'app-editorial-crud-list',
  templateUrl: './editorial-list-gallery.component.html',
  styleUrls: ['./editorial-list.component.css']
})
export class EditorialListComponent implements DoCheck {
  
  private editorials:any[];
  private start: number = 0;
  private totalRecords: number;
  private page: number = 1;
  private pageSize: number = 9;
  @Input() isOnlyRead: boolean = false;
  @Input() filtersFetch: any;
  @Input() editorialInputItems : EditorialModel[];
  @Output() editorialOutputItems: EventEmitter<any> = new EventEmitter<any>(); 
  
  constructor(private editorialService: EditorialService, private translate: TranslateService) { 
  }
	
  	ngDoCheck() {
  	if(this.editorialInputItems){
  	  this.editorials = this.editorialInputItems;
      this.editorialOutputItems.emit(this.editorials);
      this.isOnlyRead = true;		
  	}else{
    	this.getEditorials(this.start, this.pageSize);
    	this.getEditorialNum();
    }
  }
  
  
	
	
	
  getEditorials(start: number, pageSize: number, query?: number){
    this.editorialService.searchEditorials(start, pageSize).subscribe(data => { 
   
      if(!this.editorialService.getListFromLocalStorage()) { this.editorialService.saveListInLocalStorage(data) };
      this.editorials = data; 
      this.editorialOutputItems.emit(this.editorials);
    },
    error => {
      console.error(error);
    })
  }


  getEditorialNum(){
    this.editorialService.getNumTotalEditorial().subscribe(num => this.totalRecords = num, error => console.log(error));
  }
  
  
  private pageChanged(obj: any){
    this.start = obj.page * obj.pageSize - obj.pageSize;
    this.pageSize = obj.pageSize;
  }
  





}

