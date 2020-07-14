import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateMeetingPage } from './create-meeting.page';

const routes: Routes = [
  {
    path: '',
    component: CreateMeetingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateMeetingPageRoutingModule {}
