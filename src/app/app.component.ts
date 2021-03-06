import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { LanguageService } from './services/language/language.service';
import { ConfigService, Config } from './services/config/config.service';
import { PersistenceService } from './services/persistence/persistence.service';
import { NotificationService } from './services/notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private language: LanguageService,
    private config: ConfigService,
    private persistence: PersistenceService,
    private notification: NotificationService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then((readySource) => {
      this.loadProviders();
      if(this.platform.is('cordova')) {
        this.statusBar.show();
        this.statusBar.styleLightContent(); // 基础主题样式
        this.statusBar.backgroundColorByHexString('#2c3d51');
      }
    });
  }

  private async loadProviders() {
    this.persistence.load();
    await this.config.load().then((conf: Config) => {
      document.body.style.setProperty('--ion-font-family', conf.settings.font);
    });
    this.language.load();
    this.initNotification();
  }

  private initNotification() {
    this.notification.initJpush()
    this.notification.setTags(['user']);
    this.notification.setAlias("android");
  }

}
