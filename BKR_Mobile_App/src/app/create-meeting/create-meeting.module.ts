import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateMeetingPageRoutingModule } from './create-meeting-routing.module';
import { CreateMeetingPage } from './create-meeting.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CreateMeetingPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [CreateMeetingPage]
})
export class CreateMeetingPageModule {}
