import { Component, OnInit } from '@angular/core';
import { BookModel } from './';

@Component({
  selector: 'app-book-crud',
  templateUrl: './book-crud.component.html',
  styleUrls: ['./book-crud.component.css']
})
export class BookCrudComponent implements OnInit {
	

  bookSelected: BookModel;
  showDetail: boolean = false;
	
  
  constructor() { }

  ngOnInit() {
  }
  
	
  setBook(event: any){
    this.bookSelected=event;
    this.showDetail = !this.showDetail;
  }

}
