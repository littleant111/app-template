import { Directive, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Clipboard } from '@ionic-native/clipboard/ngx'
import { PlatformService } from 'src/app/services/platform/platform.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { TranslateService } from '@ngx-translate/core';
import { CopyService } from 'src/app/services/copy/copy.service';

@Directive({
  selector: '[appCopyToClipboard]',
  inputs: ['value: appCopyToClipboard'],
  host: {
    '(click)': 'copy()'
  }
})
export class CopyToClipboardDirective {
  public value: string;
  // public hideToast: boolean;
  private dom: Document;

  constructor(
    @Inject(DOCUMENT) dom: Document,
    public clipboard: Clipboard,
    public platform: PlatformService,
    public logger: LoggerService,
    public translate: TranslateService,
    private copyService: CopyService
  ) { 
    this.dom = dom;
  }

  private copyBrowser() {
    let textarea = this.dom.createElement('textarea');
    this.dom.body.appendChild(textarea);
    textarea.value = this.value;
    textarea.select();
    this.dom.execCommand('copy');
    this.dom.body.removeChild(textarea);
  }

  public copy() {
    if(!this.value) return;
    try {
      this.copyService.copy(this.value);
    } catch(err) {
      if(err) this.logger.warn(err.message);
      this.copyBrowser();
    }
  }
}
