import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular'
import { Device } from '@ionic-native/device/ngx';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  public isAndroid: boolean;
  public isIOS: boolean;
  public isSafari: boolean;
  public isCordova: boolean;
  public isElectron: boolean;
  public ua: string;
  public isMobile: boolean;
  public isDevel: boolean;
  public platform_native: Platform;

  constructor(
    private device: Device,
    private platform: Platform,
    private logger: LoggerService
  ) { 
    let ua = navigator ? navigator.userAgent : null;
    if(!ua) {
      this.logger.info('Could not determine navigator.Using fixed string.');
      ua = 'dummy user-agent';
    }
    // fixes ios webkit UA;
    ua = ua.replace(/\(\d+\)$/, '');

    this.isAndroid = this.platform.is('android');
    this.isIOS = this.platform.is('ios');
    this.ua = ua;
    this.isCordova = this.platform.is('cordova');
    // this.isElectron = this.isElectronPlatform();
    this.isMobile = this.platform.is('mobile');
    this.isDevel = !this.isMobile && !this.isElectron;

    this.logger.info('Platform service initialized');
  }

  public getBrowserName() {
    let userAgent = window.navigator.userAgent;
    let browsers = {
      chrome: /chrome/i,
      safari: /safari/i,
      firefox: /firefox/i,
      ie: /internet explorer/i
    };

    for (let key in browsers) {
      if(browsers[key].test(userAgent)) {
        return key
      }
    }

    return 'unknown';
  }

  public isElectronPlatform(): boolean {
    const userAgent = navigator && navigator.userAgent ? navigator.userAgent.toLowerCase() : null;
    if (userAgent && userAgent.indexOf('electron/') > -1) {
      return true;
    } else {
      return false;
    }
  }

  public getOS() {
    let OS = {
      OSName: '',
      extension: ''
    };

    if (this.isElectron) {
      if (navigator.appVersion.indexOf('Win') != -1) {
        OS.OSName = 'Windows';
        OS.extension = '.exe';
      }
      if (navigator.appVersion.indexOf('Mac') != -1) {
        OS.OSName = 'MacOS';
        OS.extension = '.dmg';
      }
      if (navigator.appVersion.indexOf('Linux') != -1) {
        OS.OSName = 'Linux';
        OS.extension = '-linux.zip';
      }
    }

    return OS;
  }

  public getDeviceInfo(): string {
    let info: string;

    if (this.isElectron) {
      info = ' (' + navigator.appVersion + ')';
    } else {
      info = ' (' + this.device.platform + ' ' + this.device.version + ' - ' + this.device.model + ')';
    }

    return info;
  }

  public getDeviceId(): string {
    return this.device.uuid;
  }
}
