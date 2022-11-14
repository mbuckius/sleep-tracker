import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-log-sleepiness',
  templateUrl: './log-sleepiness.page.html',
  styleUrls: ['./log-sleepiness.page.scss'],
})

export class LogSleepinessPage implements OnInit {
  loggedValue: number;
  currentDate: Date = new Date();
  currentTime: String = this.currentDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

  refreshTime() {
    this.currentDate = new Date(Date.now());
    this.currentTime = this.currentDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }

  constructor() { 
    setInterval(this.refreshTime, 1000);
  }

  ngOnInit() {
  }

  handleChange(e) {
    this.loggedValue = e.detail.value;
  }

  onClick() {
    if (this.loggedValue) {
      var loggedData = new StanfordSleepinessData(this.loggedValue);
      console.log(loggedData.summaryString());
    }
  }
}
