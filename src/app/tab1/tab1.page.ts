import { Component } from '@angular/core';
import { LanguageService } from '../services/language/language.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public currentLang: string;

  constructor(
    private language: LanguageService,
  ) { 
  }
  
  ionViewWillEnter(){
    this.currentLang = this.language.getCurrent();
  }
  
  changeLanguage() {
    this.currentLang == 'zh' ? this.language.set('en') : this.language.set('zh');
    this.currentLang = this.language.getCurrent();
  }
}
