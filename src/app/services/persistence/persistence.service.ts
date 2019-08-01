import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import * as _ from 'lodash';

import { LoggerService } from '../logger/logger.service';
import { PlatformService } from '../platform/platform.service';

import { FileStorage } from './storage/file-storage';
import { LocalStorage } from './storage/local-storage';

const Keys = {
  APP_IDENTITY: network => 'appIdentity-' + network,
  APPCONFIG: 'appConfig',
  PROFILE: 'profile',
};

interface Storage {
  get(k: string): Promise<any>;
  set(k: string, v): Promise<void>;
  remove(k: string): Promise<void>;
  create(k: string, v): Promise<void>;
}

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {
  public storage: Storage;
  constructor(
    private logger: LoggerService,
    private platform: PlatformService,
    private file: File
  ) { 
    this.logger.info('Persistence service initialized')
  };

  public load() {
    this.storage = this.platform.isCordova ? new FileStorage(this.file, this.logger) : new LocalStorage(this.logger);
  }

  setAppIdentity(network: string, data) {
    return this.storage.set(Keys.APP_IDENTITY(network), data);
  }

  getAppIdentity(network: string) {
    return this.storage.get(Keys.APP_IDENTITY(network));
  }

  removeAppIdentity(network: string) {
    return this.storage.remove(Keys.APP_IDENTITY(network));
  }

  getConfig() {
    return this.storage.get(Keys.APPCONFIG);
  }

  storeConfig(config: object) {
    return this.storage.set(Keys.APPCONFIG, config);
  }

  clearConfig() {
    return this.storage.remove(Keys.APPCONFIG);
  }

  storeProfile(profile): Promise<void> {
    return this.storage.set(Keys.PROFILE, profile);
  }

  getProfile(): Promise<any> {
    return new Promise(resolve => {
      this.storage.get(Keys.PROFILE).then(profile => {
        resolve(profile);
      });
    });
  }

  deleteProfile() {
    return this.storage.remove(Keys.PROFILE);
  }
}
