import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchComboBoxGenericModel } from 'ngx-academia-uniandes-library'
import { ValidatorFn } from '@angular/forms/src/directives/validators';
import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert2'

@Component({
  selector: 'app-author-child',
  templateUrl: './author-child.component.html',
  styleUrls: ['./author-child.component.css']
})
export class AuthorChildComponent implements OnInit {

  private formGroup: FormGroup;
  private isShowedSearchBoxAUTHOR: boolean;
  private searchComboAUTHORModel: SearchComboBoxGenericModel;  
  private authorSelected: any;
  private authorsSelected: any =[];
  private authorItemsFromChild: any = [];  
  @Output() authorItems: EventEmitter<any[]> = new EventEmitter<any[]>();
  authorSearchBoxValidators: ValidatorFn[] = [Validators.compose([Validators.required, Validators.minLength(3)])]
  @Input() parent: any;
  @Input() authorInputItems: any;

  

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    //Only for demo purposes. Change url in the model.
    this.searchComboAUTHORModel = new SearchComboBoxGenericModel("https://academia.uniandes.edu.co/WebServicesAcademy/searchPersonsServlet",[{"name":"limit", "value":10}],"results","completeName", "Search Authors", 10);
  }
  
  
 
  addAuthor(){
    this.authorsSelected.push(this.authorSelected.item);
    this.authorItems.emit(this.authorsSelected.concat(this.authorItemsFromChild));
    this.translate.get('SUCCESS_ADD').subscribe((res: string) => { swal('Ok!',res,'success') });
    
  }

  


}
