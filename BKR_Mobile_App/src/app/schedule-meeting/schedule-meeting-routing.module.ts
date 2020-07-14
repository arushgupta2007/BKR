import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleMeetingPage } from './schedule-meeting.page';

const routes: Routes = [
  {
    path: '',
    component: ScheduleMeetingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleMeetingPageRoutingModule {}
