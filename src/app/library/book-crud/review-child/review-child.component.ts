import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchComboBoxGenericModel } from 'ngx-academia-uniandes-library'
import { ValidatorFn } from '@angular/forms/src/directives/validators';
import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert2'

@Component({
  selector: 'app-review-child',
  templateUrl: './review-child.component.html',
  styleUrls: ['./review-child.component.css']
})
export class ReviewChildComponent implements OnInit {

  private formGroup: FormGroup;
 
  private isShowedCreateReviewForm: boolean;  @Input() parent: any;
  @Input() reviewInputItems: any;

  

  constructor(private translate: TranslateService) {}

  ngOnInit() {
  }
  
  

  


}
