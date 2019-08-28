import { Injectable } from '@angular/core';
// import { Platform } from '@ionic/angular';
import { JPush } from '@jiguang-ionic/jpush/ngx'
import { LoggerService } from '../logger/logger.service';
import { PlatformService } from '../platform/platform.service';
import { AlertService } from '../alert/alert.service';
// import { BackgroundMode } from '@ionic-native/background-mode/ngx';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public sequence: number;

  constructor(
    private jpush: JPush,
    private logger: LoggerService,
    private platformService: PlatformService,
    private alertService: AlertService,
    // private backgroundMode: BackgroundMode,
    // private platform: Platform
  ) { 

  }

  public initJpush() {
    if(!this.platformService.isCordova) return;
    this.jpush.init();
    this.jpush.setDebugMode(true);
    this.jpushAddEventListener();
    this.setTags(['user']);
    // this.backgroundMode.enable();
  }

  public jpushAddEventListener() {
    try {
      this.jpush.getUserNotificationSettings().then(res => {
        if(res == 0) {
          this.logger.debug('App Push is turned of in system settings.');
          this.alertService.alert({
            'title': '提示',
            'message': '系统设置中已关闭了应用推送，请前往手机系统设置相关设置打开app推送权限',
          })
        } else if(res > 0) this.logger.debug('App Push is turned on in system settings');
      })
    } catch(err) {
      this.logger.error(err);
    }

    document.addEventListener('jpush.receiveRegistrationId', event => {
      console.log(JSON.stringify(event));
    }, false)


    //点击通知进入应用程序时会触发的事件
    document.addEventListener("jpush.openNotification", event => {
      let content = this.platformService.isIOS ? event['aps'].alert : event['alert'];
      console.log('event1', event)
      console.log('content1', content)
      console.log("点击通知事件" + JSON.stringify(event));
    }, false);

    //收到通知时会触发该事件
    document.addEventListener("jpush.receiveNotification", event => {
      let content = this.platformService.isIOS ? event['aps'].alert : event['alert'];
      console.log('event2', event)
      console.log('content2', content)
      console.log("收到通知事件 " + JSON.stringify(event));
      // let a = this.platform.pause.subscribe(() => {
      //   if(this.backgroundMode.isEnabled() && this.backgroundMode.isActive()) {
      //     console.log('background mode1')
      //     this.backgroundMode.moveToForeground()
      //   }
      //   a.unsubscribe()
      // })
      // let b = this.platform.resume.subscribe(() => {
      //   console.log('background mode2')
      //   b.unsubscribe()
      // })
    }, false);

    //收到自定义消息时触发这个事件
    document.addEventListener("jpush.receiveMessage", event => {
      let message = this.platformService.isIOS ? event['content'] : event['message'];
      alert("收到自定义通知事件" + JSON.stringify(event));
    }, false);


    //设置标签/别名回调函数
    document.addEventListener("jpush.setTagsWithAlias", event => {
      let result = "result code:" + event['resultCode'] + " ";
      result += "tags:" + event['tags'] + " ";
      result += "alias:" + event['alias'] + " ";
      this.logger.info('result', result)
    }, false);
  }

  setTags(items: string[]) {
    // this.jpush
    //   .setTags({ sequence: this.sequence++, tags: ["Tag1", "Tag2"] })
    //   .then(this.tagResultHandler)
    //   .catch(this.errorHandler);
    this.jpush.setTags({ sequence: this.sequence++, tags: items }).then(this.tagResultHandler)
    .catch(this.errorHandler);;
  }

  errorHandler = function (err) {
    var sequence: number = err.sequence;
    if(sequence==undefined){
      sequence=0;
    }
    var code = err.code;
    if(code==undefined){
      code=0;
    }
    console.error("Error!" + "\nSequence: " + sequence + "\nCode: " + code);
  };

  tagResultHandler = function (result) {
    var sequence: number = result.sequence;
    var tags: Array<string> = result.tags == null ? [] : result.tags;
    console.info(tags);
    console.info("Success!" + "\nSequence: " + sequence + "\nTags: " + tags.toString());
  };

  public setAlias(userId) {
    try {
      if (!this.platformService.isMobile) {
        return;
      }
      //ios设置setAlias有bug,值必须为string类型,不能是number类型
      this.jpush.setAlias({
        sequence: 0,
        alias: userId + ""
      });
    } catch (error) {
      this.logger.error(error);
    }

  }
}
