import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoinMeetingPage } from './join-meeting.page';

const routes: Routes = [
  {
    path: '',
    component: JoinMeetingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JoinMeetingPageRoutingModule {}
