import { Injectable } from '@angular/core';
import { PersistenceService } from '../persistence/persistence.service';
import { LoggerService } from '../logger/logger.service';

import * as _ from 'lodash';

export interface Config {
  settings: {
    defaultLang: string;
    theme: string;
    color: string;
    font: string;
  }

  download: {
    apk: {
      url: string;
    };
    updateUrl: string;
  };

  appLock: {
    method: any;
    value: any;
    bannedUntil: any;
  };

  api: {
    url: string;
  };

  appInfo: {
    appName: string;
    versionCode: number;
    versionNumber: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public configCache: Config;
  public readonly configDefault: Config;

  constructor(
    private persistence: PersistenceService,
    private logger: LoggerService
  ) {
    this.logger.info('Config service initialized');
    this.configDefault = {
      settings: {
        defaultLang: 'zh',
        theme: 'primary',
        color: '',
        font: 'zhankuwenyiti'
      },
    
      download: {
        apk: {
          url: 'https://lianxicommunity.oss-cn-beijing.aliyuncs.com/wallet/MyApp.apk',
        },
        updateUrl: 'https://lianxicommunity.oss-cn-beijing.aliyuncs.com/wallet/ionic-download.xml'
      },
    
      appLock: {
        method: 'diabled',
        value: null,
        bannedUntil: null,
      },
    
      api: {
        url: '',
      },

      appInfo: {
        appName: 'MyApp',
        versionCode: 1,
        versionNumber: '0.0.1'
      }
    }
  }

  public load() {
    return new Promise((resolve, reject) => {
      this.persistence.getConfig().then((config: Config) => {
        if(!_.isEmpty(config)) {
          this.configCache = _.clone(config);
          this.backwardCompatibility();
        } else {
          this.configCache = _.clone(this.configDefault);
        }
        this.logImportantConfig(this.configCache);
        return resolve(this.configCache);
      }).catch(err => {
        this.logger.error('Error Loading Config');
        return reject(err)
      })
    })
  }

  private logImportantConfig(config: Config): void {
    const lockMethod = config && config.appLock ? config.appLock.method : null;
    const currentlang = config && config.settings.defaultLang ? config.settings.defaultLang : null;
    this.logger.debug('Config: ' + 'currentlang: ' + currentlang + ' - lockMethod: ' + lockMethod);
  }

  /**
   * @param newOpts object or string (JSON)
   */
  public set(newOpts) {
    const config = _.cloneDeep(this.configDefault);

    if (_.isString(newOpts)) {
      newOpts = JSON.parse(newOpts);
    }
    _.merge(config, this.configCache, newOpts);
    this.configCache = config;
    this.persistence.storeConfig(this.configCache).then(() => {
      this.logger.info('Config saved');
    });
  }

  public get(): Config {
    return this.configCache;
  }

  public getDefaults(): Config {
    return this.configDefault;
  }

  public backwardCompatibility() {
    // these ifs below are to avoid migration and/or updating problems
    if(!this.configCache.settings.defaultLang) {
      this.configCache.settings.defaultLang = this.configDefault.settings.defaultLang;
    }
    if(!this.configCache.settings.theme) {
      this.configCache.settings.theme = this.configDefault.settings.theme;      
    }
    if(!this.configCache.settings.color) {
      this.configCache.settings.color = this.configDefault.settings.color;      
    }
    if(!this.configCache.settings.font) {
      this.configCache.settings.font = this.configDefault.settings.font;      
    }
    if(!this.configCache.download.apk) {
      this.configCache.download.apk = this.configDefault.download.apk;      
    }
    if(!this.configCache.appLock) {
      this.configCache.appLock = this.configDefault.appLock;      
    }
    if(this.configCache.api) {
      this.configCache.api = this.configDefault.api;
    }
  }
  
}
