import { Injectable } from '@angular/core';
import { AppUpdate } from '@ionic-native/app-update/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { LoggerService } from '../logger/logger.service';
import { PlatformService } from '../platform/platform.service';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(
    private appUpate: AppUpdate,
    private appVersion: AppVersion,
    private logger: LoggerService,
    private platform: PlatformService,
    private config: ConfigService
  ) { 

  }

  public updateApp() {
    if(this.platform.isCordova) {
      const updateUrl = this.config.get().download.updateUrl;
      this.appUpate.checkAppUpdate(updateUrl).then(() => {
        this.logger.info('Update available!');
      }).catch(err => {
        this.logger.error(err)
      })
    } else {
      this.logger.debug('You not on an actual device.')
    }
  }

  public async getAppInfo() {
    let info: any = {}
    if(this.platform.isCordova) {
      await this.appVersion.getAppName().then((name: string) => {
        info.name = name;
      })
      await this.appVersion.getVersionCode().then(code => {
        info.code = code
      }).catch(err => {
        this.logger.error(err)
      })
      await this.appVersion.getVersionNumber().then(number => {
        info.number = number
      }).catch(err => {
        this.logger.error(err)
      })
      this.config.set({
        appInfo: { 
          appName: info.name,
          versionCode: info.code,
          versionNumber: info.number
        }
      })
    } else {
      this.logger.debug('You not on an actual device.')
    }
  }
}
