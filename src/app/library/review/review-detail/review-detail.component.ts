
import { Component, OnInit, Input,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SearchComboBoxGenericModel } from 'ngx-academia-uniandes-library';
import { ReviewModel } from '../review.model';
import { ReviewService } from '../review.service';
import { ReviewComponent } from '../review.component';
import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert2'





@Component({
  selector: 'app-review-crud-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.css']
})
export class ReviewDetailComponent implements OnInit {


  @Input() reviewFromParent:ReviewModel;
  private formGroup: FormGroup;
  private currentId: number;
  private review: ReviewModel = new ReviewModel();
  private isEditForm: boolean = false;
  
  
  constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private reviewService: ReviewService, private location: Location, private translate: TranslateService) {
    this.formGroup = this._formBuilder.group({
nameCtrl: ['', Validators.compose([Validators.required])], descriptionCtrl: ['', Validators.compose([])] 
    });
  }

  ngOnChanges(){
    if(this.reviewFromParent){
      this.review = this.reviewFromParent;
      this.isEditForm = true;
    }
  }
  
  ngOnInit() {
    this.currentId = Number(this.route.snapshot.params['id']);
    if(this.currentId) { 
    	this.getReviewById(this.currentId); 
    	this.isEditForm = true;
    }       
  }
  
  
  

  getReviewById(id: number){
    this.reviewService.getReviewById(id).subscribe(data => this.review = data), 
    error => {
      console.error(error);
    };
  }

  saveReview(review: ReviewModel) {
    console.log(review);
    this.reviewService.saveReview(review).subscribe(success => {
      console.info(success);
      this.translate.get('SUCCESS_SAVE').subscribe((res: string) => { swal('Ok!',res,'success') });   
    }, error => {
      console.error(error);
      this.translate.get('ERROR_SAVE').subscribe((res: string) => { swal('Oups!',res,'error') });    
    }); 
  }
  
  
  goBack(){
    this.location.back();
  }


}
