import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class I18nService {
  translate: TranslateService;

  constructor(translate: TranslateService) { }

  translateArray(list:string[], root:string){
    let translatedList:string[] = [];
    for (var item in list) {
      if (list.hasOwnProperty(item)) {
        var element = list[item];
        this.translate.get(root + '.' + element).subscribe((res:string) =>{
            translatedList.push(res);    
        });        
      }
    }
    return translatedList;
  }

}
