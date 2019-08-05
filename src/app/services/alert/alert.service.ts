import { Injectable } from '@angular/core';
import { Mode } from '@ionic/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertCtrl: AlertController, private logger: LoggerService, private translate: TranslateService) { 

  }

  public alert(title: string, message: string, subTitle?: string, okText?: string, mode?: Mode): Promise<any> {
    return new Promise(async (resolve) => {
      const alert = await this.alertCtrl.create({
        'header': title,
        'subHeader': subTitle,
        'message': message,
        'cssClass': '',
        'buttons': [
          {
            text: okText ? okText : this.translate.instant('Ok'),
            handler: () => {
              this.logger.info('Ok clicked');
              resolve(true);
            }
          },
        ],
        'mode': mode
      });
      await alert.present()
    })
  }

  public confirm(title: string, message: string, subTitle?: string, okText?: string, cancelText?: string, mode?: Mode): Promise<any> {
    return new Promise(async resolve => {
      let confirm = await this.alertCtrl.create({
        'header': title,
        'message': message,
        'subHeader': subTitle,
        'cssClass': '',
        'buttons': [
          {
            text: cancelText ? cancelText : this.translate.instant('Cancel'),
            handler: () => {
              this.logger.info('Disagree clicked');
              resolve(false);
            }
          },
          {
            text: okText ? okText : this.translate.instant('Ok'),
            handler: () => {
              this.logger.info('Agree clicked');
              resolve(true);
            }
          }
        ],
        'backdropDismiss': false,
        'mode': mode
      });
      await confirm.present();
    });
  }

  /**
   * @param opts object
   */
  public ionicPrompt(title: string, message: string, opts?, okText?: string, cancelText?: string): Promise<any> {
    return new Promise(async resolve => {
      let defaultText = opts && opts.defaultText ? opts.defaultText : null;
      let placeholder = opts && opts.placeholder ? opts.placeholder : null;
      let inputType = opts && opts.type ? opts.type : 'text';
      let cssClass = opts && opts.useDanger ? 'alertDanger' : 'alert-choice-popup';
      let enableBackdropDismiss = !!(opts && opts.enableBackdropDismiss);

      let prompt = await this.alertCtrl.create({
        'header': title,
        'message': message,
        'cssClass': cssClass,
        'backdropDismiss': enableBackdropDismiss,
        'inputs': [
          {
            value: defaultText,
            placeholder,
            type: inputType
          }
        ],
        'buttons': [
          {
            text: cancelText ? cancelText : this.translate.instant('Cancel'),
            handler: () => {
              this.logger.info('Cancel clicked');
              resolve(null);
            }
          },
          {
            text: okText ? okText : this.translate.instant('Ok'),
            handler: data => {
              this.logger.info('Saved clicked');
              resolve(data[0]);
            }
          }
        ]
      });
      await prompt.present();
    });
  }
}
