
import { Component, OnInit, Input,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SearchComboBoxGenericModel } from 'ngx-academia-uniandes-library';
import { BookModel } from '../book.model';
import { BookCrudService } from '../book-crud.service';
import { BookCrudComponent } from '../book-crud.component';
import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert2'





@Component({
  selector: 'app-book-crud-detail',
  templateUrl: './book-crud-detail.component.html',
  styleUrls: ['./book-crud-detail.component.css']
})
export class BookCrudDetailComponent implements OnInit {


  @Input() bookFromParent:BookModel;
  private formGroup: FormGroup;
  private currentId: number;
  private book: BookModel = new BookModel();
  private isEditForm: boolean = false;
  private reviews : any[]; // if you want to send details to child, you don't forget to load data in this variable
  
  
  private searchComboEditorialModel: SearchComboBoxGenericModel;
  private editorialSearchBoxValidators: ValidatorFn[] = [Validators.required];
  constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private bookCrudService: BookCrudService, private location: Location, private translate: TranslateService) {
    this.formGroup = this._formBuilder.group({
nameCtrl: ['', Validators.compose([Validators.required])], authorCtrl: ['', Validators.compose([Validators.required])], priceCtrl: ['', Validators.compose([Validators.required])] 
    });
    //Url Demo only for debug proposes
    this.searchComboEditorialModel = new SearchComboBoxGenericModel("https://academia.uniandes.edu.co/WebServicesAcademy/searchPersonsServlet",[{"name":"limit", "value":10}],"results","completeName", "Search editorial", 10);
  }

  ngOnChanges(){
    if(this.bookFromParent){
      this.book = this.bookFromParent;
      this.isEditForm = true;
    }
  }
  
  ngOnInit() {
  }
  
  
  

  getBookById(id: number){
    this.bookCrudService.getBookById(id).subscribe(data => this.book = data), 
    error => {
      console.error(error);
    };
  }

  saveBook(book: BookModel) {
    console.log(book);
    this.bookCrudService.saveBook(book).subscribe(success => {
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
