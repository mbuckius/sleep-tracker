import { Component } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import  { Preferences, SetOptions, GetOptions, RemoveOptions, KeysResult } from "@capacitor/preferences";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
	sleepinessLog = [];
	overnightSleepLog = [];
	todaysSleepiness = [];
	yesterdaysSleep: String;
	today: Date = new Date();

	constructor(private sleepService: SleepService) { }

	async ngOnInit() {
		this.sleepinessLog = await this.sleepService.getAllSleepinessLogs();
		this.overnightSleepLog = await this.sleepService.getAllOvernightSleepLogs();


		this.yesterdaysSleep = this.getLastNightsOvernightSleep();
		
		
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	// get allSleepData() {
	// 	return SleepService.AllSleepData;
	// }

	getTodaysSleepiness() {
		var today = new Date();
		
		for (var i = 0; i < this.sleepinessLog.length; i++) {
			if (today.toLocaleDateString() == this.sleepinessLog[i].date) {
				return(this.sleepinessLog[i]);
			}
		}
	}

	getLastNightsOvernightSleep() {
		const today = new Date();
		const yesterday = new Date(today);

		var found:Boolean = false;
		var todaysSleep;
		
		yesterday.setDate(yesterday.getDate() - 1);

		for (var i = 0; i < this.overnightSleepLog.length; i++) {
			if (yesterday.toLocaleDateString() == this.overnightSleepLog[i].date) {
				todaysSleep = this.overnightSleepLog[i];
				found = true;
			}
		}

		if (found) {
			console.log(todaysSleep);
		
			// Calculate the difference in milliseconds
			var difference_ms = todaysSleep.loggedSleepData.sleepEnd - todaysSleep.loggedSleepData.sleepStart;
				
			// Convert to hours and minutes
			return Math.floor(difference_ms / (1000*60*60)) + " hours, " + Math.floor(difference_ms / (1000*60) % 60) + " minutes";	
		}
		else {
			return null;
		}
		
	}
}
