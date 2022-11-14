import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})

export class CalendarPage {
  date: string;
  type: 'string';

  constructor() { }

  onChange($event) {
    console.log($event);
  }
}
