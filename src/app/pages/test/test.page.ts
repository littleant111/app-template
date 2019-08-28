import { Component, OnInit, ViewChild } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { TransferService } from 'src/app/services/transfer/transfer.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  public currentFont: string;
  public link: string;

  @ViewChild(MarkdownComponent)
  markdown: MarkdownComponent;

  constructor(
    private alertService: AlertService, 
    private config: ConfigService,
    private transfer: TransferService,
  ) {
    this.currentFont = this.config.get().settings.font;
    this.link = 'https://code.yidianchaxun.com';
  }

  ngOnInit() {
  }

  testAlert() {
    this.alertService.alert({
      'title': 'Alert', 
      'subTitle': 'alert is running.alert is running.alert is running.alert is running.alert is running.alert is running.'
    }).then(cb => {
      console.log('fb', cb)
    })
  }

  testConfirm() {
    this.alertService.confirm({
      'title': 'Alert', 
      'subTitle': 'alert is running.alert is running.alert is running.alert is running.alert is running.alert is running.'
    }).then(cb => {
      console.log('fb', cb)
    })
  }

  selectFont(font) {
    let currentFont = font.detail.value
    document.body.style.setProperty('--ion-font-family', currentFont);
    this.config.set({
      settings: { font: currentFont }
    })
  }

  public getAppInfo() {
    this.transfer.getAppInfo()
  }

  public updateApp() {
    this.transfer.updateApp()
  }

}
