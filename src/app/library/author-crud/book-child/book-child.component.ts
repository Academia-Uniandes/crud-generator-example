import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchComboBoxGenericModel } from 'ngx-academia-uniandes-library'
import { ValidatorFn } from '@angular/forms/src/directives/validators';
import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert2'

@Component({
  selector: 'app-book-child',
  templateUrl: './book-child.component.html',
  styleUrls: ['./book-child.component.css']
})
export class BookChildComponent implements OnInit {

  private formGroup: FormGroup;
  private isShowedSearchBoxBOOK: boolean;
  private searchComboBOOKModel: SearchComboBoxGenericModel;  
  private bookSelected: any;
  private booksSelected: any =[];
  private bookItemsFromChild: any = [];  
  @Output() bookItems: EventEmitter<any[]> = new EventEmitter<any[]>();
  bookSearchBoxValidators: ValidatorFn[] = [Validators.compose([Validators.required, Validators.minLength(3)])]
  @Input() parent: any;
  @Input() bookInputItems: any;

  

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    //Only for demo purposes. Change url in the model.
    this.searchComboBOOKModel = new SearchComboBoxGenericModel("https://academia.uniandes.edu.co/WebServicesAcademy/searchPersonsServlet",[{"name":"limit", "value":10}],"results","completeName", "Search Books", 10);
  }
  
  
 
  addBook(){
    this.booksSelected.push(this.bookSelected.item);
    this.bookItems.emit(this.booksSelected.concat(this.bookItemsFromChild));
    this.translate.get('SUCCESS_ADD').subscribe((res: string) => { swal('Ok!',res,'success') });
    
  }

  


}
