import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'log-sleep',
        children: [
          {
            path: '',
            loadChildren: () => import('../log-sleep/log-sleep.module').then( m => m.LogSleepPageModule)
          }
        ] 
      },
      {
        path: 'calendar',
        children: [
          {
            path: '',
            loadChildren: () => import('../sleep-logs/sleep-logs.module').then( m => m.SleepLogsPageModule)
          }
        ] 
      },
      {
        path: 'log-sleepiness',
        children: [
          {
            path: '',
            loadChildren: () => import('../log-sleepiness/log-sleepiness.module').then( m => m.LogSleepinessPageModule)
          }
        ] 
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomePageRoutingModule { }
