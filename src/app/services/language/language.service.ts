import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'
import { LoggerService } from '../logger/logger.service';

import * as _ from 'lodash';
import * as moment from 'moment';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languages = [
    {
      name: '中文(简体)',
      isoCode: 'zh'
    },
    {
      name: 'English',
      isoCode: 'en'
    }
  ];
  private current;

  constructor(
    private translate: TranslateService,
    private logger: LoggerService,
    private config: ConfigService
  ) {
    this.logger.info('Language service initialized');
    this.translate.onLangChange.subscribe(event => {
      this.logger.info('Setting new default language to: ' + event.lang);
    })
  }

  public load() {
    let lang = this.config.get().settings.defaultLang;
    if (!_.isEmpty(lang)) this.current = lang;
    else {
      // Get from browser
      const browserLang = this.translate.getBrowserLang();
      this.current = this.getName(browserLang) ? browserLang : this.getDefault();
    }
    this.logger.info('Default language: ' + this.current);
    this.translate.setDefaultLang(this.current);
    moment.locale(this.current);
  }

  public set(lang: string): void {
    this.current = lang;
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    moment.locale(lang);
    this.config.set({
      settings: { defaultLang: lang }
    });
  }

  public getName(lang: string): string {
    return _.result(_.find(this.languages, {isoCode: lang}), 'name');
  }

  private getDefault(): string {
    return this.languages[0]['isoCode'];
  }

  public getCurrent() {
    return this.current;
  }

  public getAvailables() {
    return this.languages;
  }
}
