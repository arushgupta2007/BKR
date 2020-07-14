import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SessionPageRoutingModule } from './session-routing.module';
import { SessionPage } from './session.page';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicRouteStrategy } from '@ionic/angular';
import { OpenViduVideoComponent } from '../ov-video.component'  
import { UserVideoComponent } from '../user-video.component';

// <config-file mode="merge" parent="/*" target="AndroidManifest.xml">
// <uses-permission android:name="android.permission.CAMERA" />
// <uses-permission android:name="android.permission.RECORD_AUDIO" />
// <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
// </config-file>

@NgModule({
  declarations: [SessionPage, UserVideoComponent, OpenViduVideoComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SessionPageRoutingModule,
    HttpClientModule,
    IonicModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AndroidPermissions
  ],
})
export class SessionPageModule {}
