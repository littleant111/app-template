import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { AlertService } from '../alert/alert.service';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  private downloadURL: string;
  private apkVersion: string;
  private downloadProgress: any;

  constructor(
    private platform: Platform,
    private fileTransfer: FileTransfer,
    private fileOpener: FileOpener,
    private file: File,
    private translate: TranslateService,
    private alertService: AlertService,
    private logger: LoggerService,
  ) { 
    this.downloadURL = 'http://oss-cn-beijing.speedycloud.org/tenyun/com.wallet.namy.apk';
    this.apkVersion = '00001';
    this.downloadProgress = 0;
  }

  downloadApp() {
    if (this.platform.is('ios')) {
      window.location.href = 'itms-services://?action=download-manifest&url=' + this.downloadURL;
    } else {
      const fileTransfer: FileTransferObject = this.fileTransfer.create();
      fileTransfer.onProgress(progressEvent => {
        console.log(progressEvent);
        var present = new Number((progressEvent.loaded / progressEvent.total) * 100);
        this.downloadProgress = present.toFixed(0);;
        if(this.downloadProgress == '100') {
          setTimeout(() => {
            this.logger.info('Download App: 100%');
          }, 500)
        }
      });

      var savePath = this.file.externalRootDirectory + `com.wallet.namy${this.apkVersion}.apk`;
      fileTransfer.download(encodeURI(this.downloadURL), savePath).then((entry) => {
          this.fileOpener.open(entry.toURL(), "application/vnd.android.package-archive")
            .then(() => this.logger.info('Successfully open the apk!'))
            .catch(e => this.logger.info('Failed to open the apk!', e));
        }, (error) => {
          let title = this.translate.instant('Note!');
          let msg = this.translate.instant('Note-content');
          this.alertService.alert(title, msg);
          for(var item in error) {
            this.logger.error(item + ":" + error[item]);
          }
        });
    }
  }
}
