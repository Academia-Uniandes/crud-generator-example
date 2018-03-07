import { Component, OnInit, DoCheck, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { ReviewModel } from '../review.model';
import { ReviewService } from '../review.service';
import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert2'

@Component({
  selector: 'app-review-crud-list',
  templateUrl: './review-list-gallery.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit, OnChanges {
  
  private reviews:any[];
  private start: number = 0;
  private totalRecords: number;
  private page: number = 1;
  private pageSize: number = 9;
  @Input() isOnlyRead: boolean = false;
  @Input() filtersFetch: any;
  @Input() reviewInputItems : ReviewModel[];
  @Output() reviewOutputItems: EventEmitter<any> = new EventEmitter<any>(); 
  
  constructor(private reviewService: ReviewService, private translate: TranslateService) { 
  }
	
	
  ngOnInit() {
    this.getReviews(this.start, this.pageSize);
    this.getReviewNum();
  }
  ngOnChanges(){
    if(this.reviewInputItems){
      this.reviews = this.reviewInputItems;
      this.isOnlyRead = true;
    }
  }
  
  
	
	
	
  getReviews(start: number, pageSize: number, query?: number){
    this.reviewService.searchReviews(start, pageSize).subscribe(data => { 
      this.reviews = data; 
      this.reviewOutputItems.emit(this.reviews);
    },
    error => {
      console.error(error);
    })
  }

	
  deleteReview(id: number){
    this.reviewService.deleteReview(id).subscribe(result => { 
    console.log("Deleted item succesfully");
    this.translate.get('SUCCESS_DELETE').subscribe((res: string) => { swal('Ok!',res,'success') });   
    },
     error => {
       console.error(error);
       this.translate.get('ERROR_DELETE').subscribe((res: string) => { swal('Error!',res,'error') });   
     });
  }

  getReviewNum(){
    this.reviewService.getNumTotalReview().subscribe(num => this.totalRecords = num, error => console.log(error));
  }
  
  
  private pageChanged(obj: any){
    this.start = obj.page * obj.pageSize - obj.pageSize;
    this.pageSize = obj.pageSize;
  }
  





}

