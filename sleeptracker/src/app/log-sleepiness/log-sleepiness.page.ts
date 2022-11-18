import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import  {Preferences, SetOptions, GetOptions, RemoveOptions, KeysResult} from "@capacitor/preferences";
import { SleepService } from '../services/sleep.service';

import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-log-sleepiness',
  templateUrl: './log-sleepiness.page.html',
  styleUrls: ['./log-sleepiness.page.scss'],
})

export class LogSleepinessPage implements OnInit {
  keys = [];
  loggedValue: number = 1;
  standfordSleepinessData = StanfordSleepinessData.ScaleValues
  currentDate: Date = new Date();
  currentTime: String = this.currentDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

  // refreshTime() {
  //   this.currentDate = new Date(Date.now());
  //   this.currentTime = this.currentDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  // }

  constructor(private sleepService: SleepService) { 
    // setInterval(this.refreshTime, 1000);
  }

  ngOnInit() {
  }

  handleChange(e) {
    this.loggedValue = e.detail.value;
  }

  onClick() {
    if (this.loggedValue) {
      // Create and store loggedData from user chosen value
      var loggedData = new StanfordSleepinessData(this.loggedValue);
      console.log('logging data')
      this.sleepService.logSleepiness(loggedData);
    }
  }

  getValue(key){
    let options:GetOptions = {
      key:key
    }
    Preferences.get(options).then((val)=> {
      alert(val.value);
    })
  }

  deleteStorage(key) {
    let options:RemoveOptions = {
      key:key
    }
    Preferences.remove(options).then(()=>{
      alert("deleted");
      this.getKeys();
    })
  }

  clearAll(){
    Preferences.clear().then(()=> {
      this.getKeys();
    })
  }

  getKeys()
  {
    Preferences.keys().then((keys)=>{
      this.keys = keys.keys;
    })
  }
}
