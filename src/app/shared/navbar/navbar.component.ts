import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  currentLang: string;
  flag: string;
  constructor(private utilTranslate: TranslateService) { 
  }
  
  

  ngOnInit() {
    this.currentLang = this.utilTranslate.getBrowserLang();
    this.setFlag(this.currentLang);
  }

  changeLanguage() {
    this.utilTranslate.use(this.currentLang.match(/en/) ? this.currentLang = 'es' : this.currentLang = 'en');
    this.setFlag(this.currentLang);
  }


  setFlag(flag: string) {
    flag === 'es' ? this.flag = "co" : this.flag = "us";
  }

}
