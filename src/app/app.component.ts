import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	constructor(private translate: TranslateService){
	    translate.addLangs(["en", "es"]);
	    translate.setDefaultLang('es');
	    let browserLang: string = translate.getBrowserLang();//Get Browser Language
	    translate.use(browserLang.match(/en|es/) ? browserLang : 'en');
	}

}
