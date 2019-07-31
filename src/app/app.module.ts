import { HttpClient, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import {
  // MissingTranslationHandler,
  // MissingTranslationHandlerParams,
  TranslateDefaultParser,
  TranslateLoader,
  TranslateModule,
  TranslateParser,
  TranslateService
} from '@ngx-translate/core'
import { TranslatePoHttpLoader } from '@biesbjerg/ngx-translate-po-http-loader'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CopyToClipboardDirective } from './directives/copy-to-clipboard/copy-to-clipboard.directive';

// Read translation files
export function transalteLoaderFactory(http: HttpClient) {
  return new TranslatePoHttpLoader(http, 'assets/i18n', '.po');
}

export function translateParserFactory() {
  return new InterpolatedTranslateParser();
}

export class InterpolatedTranslateParser extends TranslateDefaultParser {
  public templateMatcher: RegExp = /{\s?([^{}\s]*)\s?}/g;
}

// export class MyMissingTranslationHandler implements MissingTranslationHandler {
//   public parser: TranslateParser = new InterpolatedTranslateParser();
//   public handle(params: MissingTranslationHandlerParams) {
//     return this.parser.interpolate(params.key, params.interpolateParams)
//     // return params;
//   }
// }

@NgModule({
  declarations: [AppComponent, CopyToClipboardDirective],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      parser: { provide: TranslateParser, useFactory: translateParserFactory },
      // missingTranslationHandler: { provide: MissingTranslationHandler, useFactory: MyMissingTranslationHandler },
      loader: {
        provide: TranslateLoader,
        useFactory: (transalteLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    TranslateService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}




// 基础功能：
// 1、storage 👌
// 2、tabs   👌
// 3、side menu 👌
// 4、test module
// 5、environments module
// 6、国际化 👌
// 7、复制粘贴 👌
// 8、自适应
// 9、手势
// 10、跳转第三方网页或app
// 11、弹出框
// 12、版本更新
// 13、消息推送
// 14、应用锁
// 15、单位换算
// 16、时间格式化
// 17、排序和筛选
// 18、action-sheet
// 19、时间选择器
// 20、picker
// 21、获取设备信息 👌
// 22、分享
// 23、设置模块
// 24、下载模块
// 25、第三方字体、样式和icon
// 26、debug模块 👌
// 27、进度提示模块
// 28、平台模块  👌
// 29、扫码
// 30、上传图片
// 31、指纹模块
// 32、特定格式验证（邮箱，手机号，各类号码）
// 33、键盘配置
// 34、主题切换
