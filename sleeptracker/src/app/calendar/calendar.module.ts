import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CalendarPage } from './calendar.page';
// Calendar UI Module
import { CalendarModule } from 'ion2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: CalendarPage
      }
    ]),
    CalendarModule
  ],
  declarations: [CalendarPage]
})
export class CalendarPageModule {}