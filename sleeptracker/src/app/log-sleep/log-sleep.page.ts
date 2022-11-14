import { Component, OnInit } from '@angular/core';
import { OvernightSleepData } from '../data/overnight-sleep-data';

@Component({
  selector: 'app-log-sleep',
  templateUrl: './log-sleep.page.html',
  styleUrls: ['./log-sleep.page.scss'],
})
export class LogSleepPage implements OnInit {
  startTime: Date= new Date();
  endTime: Date= new Date();
  currentDate: Date = new Date();

  constructor() { 
  }

  ngOnInit() {
  }

  handleChangeSleep(e) {
    this.startTime = new Date(e.detail.value);
  }

  handleChangeWake(e) {
    this.endTime = new Date(e.detail.value);
  }

  onClick() {
    var sleep = new OvernightSleepData(this.startTime, this.endTime);
    console.log(sleep.summaryString());
    console.log(sleep.dateString());
  }
}
