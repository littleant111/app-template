import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-internationalization',
  templateUrl: './internationalization.page.html',
  styleUrls: ['./internationalization.page.scss'],
})
export class InternationalizationPage implements OnInit {
  public currentLang: string;

  constructor(
    private router: Router, 
    private nav: NavController,
    private language: LanguageService
  ) { 
    this.currentLang = this.language.getCurrent();
  }

  ngOnInit() {
  }

  goBack() {
    this.nav.navigateBack('')
  }

  selectLang(lang) {
    this.currentLang = lang['detail']['value'];
    this.language.set(this.currentLang);
  }
}
