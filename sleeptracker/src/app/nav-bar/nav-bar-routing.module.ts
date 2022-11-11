import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NavBarComponent } from './nav-bar.component';

const routes: Routes = [
    {
      path: 'tabs',
      component: NavBarComponent,
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
                loadChildren: () => import('../calendar/calendar.module').then( m => m.CalendarPageModule)
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
    exports: [RouterModule],
  })
  export class NavBarRoutingModule { }

// import { NgModule } from '@angular/core';
// import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   {
//     path: 'home',
//     loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
//   },
//   {
//     path: '',
//     redirectTo: 'home',
//     pathMatch: 'full'
//   },
// ];

// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
//   ],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
