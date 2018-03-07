import { Component, OnInit } from '@angular/core';
import { AuthorModel } from './';

@Component({
  selector: 'app-author-crud',
  templateUrl: './author-crud.component.html',
  styleUrls: ['./author-crud.component.css']
})
export class AuthorCrudComponent implements OnInit {
	

  authorSelected: AuthorModel;
  showDetail: boolean = false;
	
  
  constructor() { }

  ngOnInit() {
  }
  
	
  setAuthor(event: any){
    this.authorSelected=event;
    this.showDetail = !this.showDetail;
  }

}
