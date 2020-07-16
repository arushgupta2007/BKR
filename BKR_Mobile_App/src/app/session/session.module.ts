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
import { ChatModalComponent } from '../components/chat-modal/chat-modal.component';
import { EverybodyChatModelComponent } from '../components/everybody-chat-model/everybody-chat-model.component';
import { AutosizeModule } from 'ngx-autosize'
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@NgModule({
  declarations: [SessionPage, UserVideoComponent, OpenViduVideoComponent, ChatModalComponent, EverybodyChatModelComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SessionPageRoutingModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AutosizeModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AndroidPermissions,
    ScreenOrientation
  ],
})
export class SessionPageModule {}
