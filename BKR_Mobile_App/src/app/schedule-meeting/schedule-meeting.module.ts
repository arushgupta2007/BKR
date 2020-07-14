import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScheduleMeetingPageRoutingModule } from './schedule-meeting-routing.module';

import { ScheduleMeetingPage } from './schedule-meeting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScheduleMeetingPageRoutingModule
  ],
  declarations: [ScheduleMeetingPage]
})
export class ScheduleMeetingPageModule {}
