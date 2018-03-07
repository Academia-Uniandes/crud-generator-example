
import { Component, OnInit, Input,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SearchComboBoxGenericModel } from 'ngx-academia-uniandes-library';
import { EditorialModel } from '../editorial.model';
import { EditorialService } from '../editorial.service';
import { EditorialComponent } from '../editorial.component';
import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert2'





@Component({
  selector: 'app-editorial-crud-detail',
  templateUrl: './editorial-detail.component.html',
  styleUrls: ['./editorial-detail.component.css']
})
export class EditorialDetailComponent implements OnInit {


  @Input() editorialFromParent:EditorialModel;
  private formGroup: FormGroup;
  private currentId: number;
  private editorial: EditorialModel = new EditorialModel();
  private isEditForm: boolean = false;
  
  
  constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private editorialService: EditorialService, private location: Location, private translate: TranslateService) {
    this.formGroup = this._formBuilder.group({
nameCtrl: ['', Validators.compose([Validators.required])], officeCtrl: ['', Validators.compose([Validators.required])], phoneCtrl: ['', Validators.compose([Validators.required])], emailCtrl: ['', Validators.compose([])] 
    });
  }

  ngOnChanges(){
    if(this.editorialFromParent){
      this.editorial = this.editorialFromParent;
      this.isEditForm = true;
    }
  }
  
  ngOnInit() {
    this.currentId = Number(this.route.snapshot.params['id']);
    if(this.currentId) { 
    	this.getEditorialById(this.currentId); 
    	this.isEditForm = true;
    }       
  }
  
  
  

  getEditorialById(id: number){
    this.editorialService.getEditorialById(id).subscribe(data => this.editorial = data), 
    error => {
      console.error(error);
    };
  }

  saveEditorial(editorial: EditorialModel) {
    console.log(editorial);
    this.editorialService.saveEditorial(editorial).subscribe(success => {
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
