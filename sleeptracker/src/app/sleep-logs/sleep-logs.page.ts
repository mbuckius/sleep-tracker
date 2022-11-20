import { Component, OnInit } from '@angular/core';
import  { Preferences, SetOptions, GetOptions, RemoveOptions, KeysResult } from "@capacitor/preferences";
import { SleepService } from '../services/sleep.service';
import { IonSpinner } from '@ionic/angular';

@Component({
  selector: 'app-sleep-logs',
  templateUrl: './sleep-logs.page.html',
  styleUrls: ['./sleep-logs.page.scss'],
  providers: [SleepService]
})
export class SleepLogsPage implements OnInit {
  keys = [];
  // sleepinessLogs = {};
  // overnightSleepLogs = {};
  currLogView = null;

  constructor(private sleepService: SleepService) { }

  async ngOnInit() { 
    // await this.sleepService.set('hello', 'world');
    // console.log("Set key val");
    // this.keys = await this.sleepService.getKeys();
    // console.log(this.keys)
    // console.log(this.keys);
    // Promise.all([this.sleepService.getStoredKeys()]).then(([keys])=> {
    //   this.keys = keys;
    // }).catch(error => {
    //   console.log("StorageError")
    // })
    // console.log(this.sleepService.getStoredKeys());
    // this.getKeys();
    // this.keys = await this.sleepService.getDates();
    // this.keys = this.sleepService.getStoredKeys();
    // var sleepiness = await this.sleepService.getSleepinessOn(this.keys[0]);
    // console.log(sleepiness)
    // Preferences.clear().then(() =>{

    //   let i = 0;
    //   let ref = this;

    //   function inner()
    //   {
    //     let key = "key"+i.toString();
    //     let val = "value"+i.toString();

    //     let options:SetOptions = {
    //       key:key,
    //       value:val
    //     }
        
    //     Preferences.set(options).then(()=>{
    //       i++;
    //       if(i < 20)
    //       {
    //         inner();
    //       }
    //       else
    //       {
    //         ref.getKeys();
    //       }
    //     })
    //   }
      
    //   inner();
    // })
  }

  async handleChange(e) {
    var viewSelection = e.detail.value;
    this.currLogView = viewSelection;
    if (viewSelection == 'sleepiness-logs') {
      // await this.sleepService.set('world', 'help');
      // console.log("Set key val");
      // this.keys = await this.sleepService.getKeys(); // change to get sleepiness
      this.keys = await this.sleepService.getAllSleepinessLogs();
      console.log(this.keys);
    }
    else{
      this.keys = await this.sleepService.getAllOvernightSleepLogs();
      console.log(this.keys);
    }

  }


  getValue(key){
    // let options:GetOptions = {
    //   key:key
    // }
    // Preferences.get(options).then((val)=> {
    //   alert(val.value);
    // })

  }

  async clearAll(){
    await this.sleepService.clear();
    this.keys = await this.sleepService.getKeys();
  }
}
