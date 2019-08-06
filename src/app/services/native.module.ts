import { NgModule } from '@angular/core';

/* Native Modules */
import { Device } from '@ionic-native/device/ngx';
import { File } from '@ionic-native/file/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@NgModule({
    providers: [
        Device,
        File,
        SplashScreen,
        StatusBar,
        AndroidPermissions
    ]
})

export class NativeModule {}