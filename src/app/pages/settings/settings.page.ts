import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language/language.service';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public currentLang: string;
  public currentFont: string;

  constructor(
    private nav: NavController,
    private language: LanguageService,
    private config: ConfigService
  ) { 
    this.currentLang = this.language.getCurrent();
    this.currentFont = this.config.get().settings.font;
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

  selectFont(font) {
    let currentFont = font.detail.value
    document.body.style.setProperty('--ion-font-family', currentFont);
    this.config.set({
      settings: { font: currentFont }
    })
  }
}
