import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { PlatformService } from '../platform/platform.service';
import { ElectronService } from '../electron/electron.service';
import { AlertService } from '../alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class ExternalLinkService {

  constructor(
    private logger: LoggerService,
    private platform: PlatformService,
    private electron: ElectronService,
    private alertService: AlertService,
  ) { 
    this.logger.info('ExternalLink service initialized');
  }

  private restoreHandleOpenURL(old: string): void {
    setTimeout(() => {
      (window as any).handleOpenURL = old;
    }, 500);
  }

  public open(url: string, optIn?: boolean, title?: string, message?: string, okText?: string, cancelText?: string) {
    return new Promise((resolve, reject) => {
      if(optIn) {
        this.alertService.confirm(title, message, '', okText, cancelText).then((res: boolean) => {
          this.openBrowser(res, url);
          return resolve();
        })
      } else {
        this.openBrowser(true, url);
        return resolve();
      }
    })
  }

  private openBrowser(res: boolean, url: string) {
    let old = (window as any).handleOpenURL;

    (window as any).handleOpenURL = url => {
      this.logger.debug('Skip: ' + url);
    };

    if (res)
      this.platform.isElectron
        ? this.electron.openExternalLink(url)
        : window.open(url, '_system');

    this.restoreHandleOpenURL(old);
  }
}
