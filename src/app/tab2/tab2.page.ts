import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { LanguageService } from '../services/language/language.service';
import { LoggerService } from '../services/logger/logger.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public currentLang: string;

  constructor(
    private logger: LoggerService,
    private language: LanguageService,
    private translate: TranslateService,
    private menu: MenuController
  ) {
  }
  
  ngOnInit(): void {
    this.testLogger()
  }
  
  ionViewWillEnter() {
    this.currentLang = this.language.getCurrent();
  }

  testLogger() {
    this.logger.debug('test logger: success!', this.translate.instant('Wallet'));
  }

  changeLanguage() {
    this.currentLang == 'zh' ? this.language.set('en') : this.language.set('zh');
    this.currentLang = this.language.getCurrent();
  }

  public openSideMenu() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  public testPress($event) {
    console.log('press', $event);
  }

  public testPressup($event) {
    console.log('pressup', $event);
  }

  public testPan($event) {
    console.log('pan', $event);
  }

  public testRotate($event) {
    console.log('rotate', $event);
  }

  public testSwipe($event) {
    console.log('swipe', $event);
  }
}
