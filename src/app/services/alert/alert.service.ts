import { Injectable } from '@angular/core';
import { AlertInput, Mode, AlertButton } from '@ionic/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LoggerService } from '../logger/logger.service';

export interface AlertOpts {
  title?: string;
  subTitle?: string;
  okText?: string; 
  cancelText?: string; 
  message?: string;
  cssClass?: string | string[];
  inputs?: AlertInput[];
  buttons?: (string | AlertButton)[];
  backdropDismiss?: boolean;
  translucent?: boolean;
  animated?: boolean;
  mode?: Mode;
  keyboardClose?: boolean;
  id?: string;
}

@Injectable({
  providedIn: 'root'
})

export class AlertService {

  constructor(
    private alertCtrl: AlertController, 
    private logger: LoggerService, 
    private translate: TranslateService
  ) { 

  }

  public alert(opts: AlertOpts): Promise<any> {
    return new Promise(async (resolve) => {
      const alert = await this.alertCtrl.create({
        'header': opts.title,
        'subHeader': opts.subTitle,
        'message': opts.message,
        'cssClass': '',
        'buttons': [
          {
            text: opts.okText ? opts.okText : this.translate.instant('Ok'),
            handler: () => {
              this.logger.info('Ok clicked');
              resolve(true);
            }
          },
        ],
        'mode': opts.mode
      });
      await alert.present()
    })
  }

  public confirm(opts: AlertOpts): Promise<any> {
    return new Promise(async resolve => {
      let confirm = await this.alertCtrl.create({
        'header': opts.title,
        'message': opts.message,
        'subHeader': opts.subTitle,
        'cssClass': '',
        'buttons': [
          {
            text: opts.cancelText ? opts.cancelText : this.translate.instant('Cancel'),
            handler: () => {
              this.logger.info('Disagree clicked');
              resolve(false);
            }
          },
          {
            text: opts.okText ? opts.okText : this.translate.instant('Ok'),
            handler: () => {
              this.logger.info('Agree clicked');
              resolve(true);
            }
          }
        ],
        'backdropDismiss': false,
        'mode': opts.mode
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
        'mode': 'ios',
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
