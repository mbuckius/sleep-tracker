import { Component, OnInit } from '@angular/core';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { SleepService } from '../services/sleep.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-log-sleep',
  templateUrl: './log-sleep.page.html',
  styleUrls: ['./log-sleep.page.scss'],
  providers: [ SleepService ]
})
export class LogSleepPage implements OnInit {
  startTime: Date= new Date();
  endTime: Date= new Date();
  currentDate: Date = new Date();

  constructor(private sleepService: SleepService, private alertController: AlertController) { 
  }

  ngOnInit() {
  }

  handleChangeSleep(e) {
    this.startTime = new Date(e.detail.value);
  }

  handleChangeWake(e) {
    this.endTime = new Date(e.detail.value);
  }

  async onClick() {
    var sleepData = new OvernightSleepData(this.startTime, this.endTime);

    // Call to service that stores data
    this.sleepService.logOvernightSleep(sleepData); 

    // Create alert to confirm succcessful storage
    var startSleepDate = this.startTime.toLocaleDateString();
    const overnightSleepinessLoggedAlert = await this.alertController.create({
      message: `Successfuly Logged Sleep for night of ${startSleepDate}`,
      buttons: ['OK']
    });

    // Display alert
    await overnightSleepinessLoggedAlert.present();

  }
}
