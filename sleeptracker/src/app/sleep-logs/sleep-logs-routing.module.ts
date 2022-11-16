import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SleepLogsPage } from './sleep-logs.page';

const routes: Routes = [
  {
    path: '',
    component: SleepLogsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SleepLogsPageRoutingModule {}
