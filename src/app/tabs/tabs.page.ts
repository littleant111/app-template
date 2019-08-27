import { Component, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular'

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  @ViewChild(IonTabs)
  ionTabs: IonTabs

  public tabSeletcted: string;

  constructor() {

  }

  ionViewDidEnter(){
    this.tabSeletcted = this.ionTabs.getSelected();
  }
}
// https://lianxicommunity.oss-cn-beijing.aliyuncs.com/wallet/ionic-download.xml