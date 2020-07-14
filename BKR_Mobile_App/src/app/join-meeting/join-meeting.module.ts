import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { JoinMeetingPageRoutingModule } from './join-meeting-routing.module';
import { JoinMeetingPage } from './join-meeting.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    JoinMeetingPageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [JoinMeetingPage]
})
export class JoinMeetingPageModule {}
