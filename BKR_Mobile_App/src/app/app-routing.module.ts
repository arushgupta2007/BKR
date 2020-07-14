import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'create-meeting',
    loadChildren: () => import('./create-meeting/create-meeting.module').then( m => m.CreateMeetingPageModule)
  },
  {
    path: 'join-meeting',
    loadChildren: () => import('./join-meeting/join-meeting.module').then( m => m.JoinMeetingPageModule)
  },
  {
    path: 'schedule-meeting',
    loadChildren: () => import('./schedule-meeting/schedule-meeting.module').then( m => m.ScheduleMeetingPageModule)
  },
  {
    path: 'join-us',
    loadChildren: () => import('./join-us/join-us.module').then( m => m.JoinUsPageModule)
  },
  {
    path: 'session',
    loadChildren: () => import('./session/session.module').then( m => m.SessionPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
