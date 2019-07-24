import { Component } from '@angular/core';

import { LoggerService } from '../services/logger/logger.service'
import { LanguageService } from '../services/language/language.service';
import { TranslateService } from '@ngx-translate/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

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
  testLogger() {
    this.logger.debug('test logger: success!', this.translate.instant('Wallet'));
  }

  ChangeLanguage() {
    let currentLang = this.language.getCurrent();
    currentLang == 'zh' ? this.language.set('en') : this.language.set('zh');
  }

  private openSideMenu() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
}
