import { Component, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  @ViewChild(IonTabs)
  ionTabs: IonTabs

  public tabSeletcted: string;

  constructor(private splashScreen: SplashScreen) {

  }

  ionViewDidEnter(){
    this.tabSeletcted = this.ionTabs.getSelected();
    this.splashScreen.hide();
  }
}
// https://lianxicommunity.oss-cn-beijing.aliyuncs.com/wallet/ionic-download.xml