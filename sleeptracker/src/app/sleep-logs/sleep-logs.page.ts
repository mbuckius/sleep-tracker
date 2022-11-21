import { Component, OnInit, ViewChild } from '@angular/core';
import  { Preferences, SetOptions, GetOptions, RemoveOptions, KeysResult } from "@capacitor/preferences";
import { SleepService } from '../services/sleep.service';
import { IonSpinner } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';


@Component({
  selector: 'app-sleep-logs',
  templateUrl: './sleep-logs.page.html',
  styleUrls: ['./sleep-logs.page.scss'],
  providers: [SleepService]
})
export class SleepLogsPage implements OnInit {
  isModalOpen = false;
  today = new Date();
  info;

  

 
  keys = [];
  // sleepinessLogs = {};
  // overnightSleepLogs = {};
  currLogView = null;

  constructor(private sleepService: SleepService, private alertController: AlertController) { }

  async ngOnInit() {}

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

  async getValue(key){
    var message = "hi \n" + key.date;

    if (this.currLogView == 'sleepiness-logs') {
      // Create alert to confirm succcessful storage
      const SleepinessAlert = await this.alertController.create({
        message: `${message}`,
        buttons: ['OK']
      });

      // Display alert
      await SleepinessAlert.present();
      

    }
    else {
      // Calculate the difference in milliseconds
      var difference_ms = key.loggedSleepData.sleepEnd - key.loggedSleepData.sleepStart;
              
      // Convert to hours and minutes
      let message =  `On ${key.date}, you slept for ` + (Math.floor(difference_ms / (1000*60*60))).toString() + " hours, " + (Math.floor(difference_ms / (1000*60) % 60)).toString() + " minutes";	

      const overnightSleepAlert = await this.alertController.create({
        message: `${message}`,
        buttons: ['OK']
      });

      // Display alert
      await overnightSleepAlert.present();
    }

  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  showView(key) {
    this.info = key;
    this.setOpen(true);
    console.log(key);
  }

  async clearAll(){
    await this.sleepService.clear();
    this.keys = await this.sleepService.getKeys();
  }
}
