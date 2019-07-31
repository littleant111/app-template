import { Component } from '@angular/core';
import { LanguageService } from '../services/language/language.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public currentLang: string;

  constructor(private language: LanguageService) {

  }

  ionViewWillEnter(){
    this.currentLang = this.language.getCurrent();
  }

  changeLanguage() {
    this.currentLang == 'zh' ? this.language.set('en') : this.language.set('zh');
    this.currentLang = this.language.getCurrent();
  }

}
