import { Component, OnInit, ViewChild } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ConfigService } from 'src/app/services/config/config.service';

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

  constructor(private alertService: AlertService, private config: ConfigService) {
    this.currentFont = this.config.get().settings.font;
    this.link = 'https://code.yidianchaxun.com';
  }

  ngOnInit() {
  }

  testAlert() {
    this.alertService.alert('Alert', 'alert is running.alert is running.alert is running.alert is running.alert is running.alert is running.').then(cb => {
      console.log('fb', cb)
    })
  }

  testConfirm() {
    this.alertService.confirm('Alert', 'alert is running.alert is running.alert is running.alert is running.alert is running.alert is running.').then(cb => {
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
}
