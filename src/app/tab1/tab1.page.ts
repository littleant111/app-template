import { Component } from '@angular/core';
import { LanguageService } from '../services/language/language.service';
import { AlertService } from '../services/alert/alert.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public currentLang: string;

  constructor(
    private language: LanguageService,
    private alertService: AlertService
  ) {
  }
  
  ionViewWillEnter(){
    this.currentLang = this.language.getCurrent();
    // setTimeout(() => {
    //   this.popAlert();
    // }, 1500)
  }
  
  changeLanguage() {
    this.currentLang == 'zh' ? this.language.set('en') : this.language.set('zh');
    this.currentLang = this.language.getCurrent();
  }

  popAlert() {
    this.alertService.alert({
      'title': 'Update Info', 
      'subTitle': 'you already update your app.',
      'mode': 'ios',
    });
  }

}
