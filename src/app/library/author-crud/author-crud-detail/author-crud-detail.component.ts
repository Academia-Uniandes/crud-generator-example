
import { Component, OnInit, Input,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SearchComboBoxGenericModel } from 'ngx-academia-uniandes-library';
import { AuthorModel } from '../author.model';
import { AuthorCrudService } from '../author-crud.service';
import { AuthorCrudComponent } from '../author-crud.component';
import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert2'





@Component({
  selector: 'app-author-crud-detail',
  templateUrl: './author-crud-detail.component.html',
  styleUrls: ['./author-crud-detail.component.css']
})
export class AuthorCrudDetailComponent implements OnInit {


  @Input() authorFromParent:AuthorModel;
  private formGroup: FormGroup;
  private currentId: number;
  private author: AuthorModel = new AuthorModel();
  private isEditForm: boolean = false;
  
  
  constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authorCrudService: AuthorCrudService, private location: Location, private translate: TranslateService) {
    this.formGroup = this._formBuilder.group({
nameCtrl: ['', Validators.compose([Validators.required])], ageCtrl: ['', Validators.compose([Validators.required])], profileCtrl: ['', Validators.compose([])] 
    });
  }

  ngOnChanges(){
    if(this.authorFromParent){
      this.author = this.authorFromParent;
      this.isEditForm = true;
    }
  }
  
  ngOnInit() {
  }
  
  
  

  getAuthorById(id: number){
    this.authorCrudService.getAuthorById(id).subscribe(data => this.author = data), 
    error => {
      console.error(error);
    };
  }

  saveAuthor(author: AuthorModel) {
    console.log(author);
    this.authorCrudService.saveAuthor(author).subscribe(success => {
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
