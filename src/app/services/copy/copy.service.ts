import { Injectable } from '@angular/core';
import { Clipboard } from '@ionic-native/clipboard/ngx'
import { TranslateService } from '@ngx-translate/core';

import { LoggerService } from '../logger/logger.service';
import { PlatformService } from '../platform/platform.service';

@Injectable({
  providedIn: 'root'
})
export class CopyService {
  private isCordova: boolean;

  constructor(
    private clipboard: Clipboard,
    private logger: LoggerService,
    private translate: TranslateService,
    private platform: PlatformService
  ) {
    this.logger.debug('Clipboard service initialized');
    this.isCordova = this.platform.isCordova;
  }

  public async getData(): Promise<any> {
    return this.paste();
  }

  public copy(value: string) {
    if(this.isCordova) {
      this.clipboard.copy(value);
    } else {
      this.logger.error('Copied to clipboard using a Web Browser');
    }
  }

  public async paste(): Promise<any> {
    if(this.isCordova) {
      this.clipboard.paste();
    } else {
      this.logger.error('Paste from clipboard not supported');
    }
  }

  public clear(): void {
    if(this.isCordova) {
      this.clipboard.copy(null);
    } else {
      this.logger.error('Nothing to clear on the clipboard');
    }
  }
}
