import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import  { Preferences, SetOptions, GetOptions, RemoveOptions, KeysResult } from "@capacitor/preferences";

@Injectable({
  providedIn: 'root'
})
export class SleepService {
	keys = [];
	dates = [];
	private static LoadDefaultData:boolean = true;
	// public static AllSleepData:SleepData[] = [];
	public static AllSleepData = [];
	public static AllOvernightData:OvernightSleepData[] = [];
	public static AllSleepinessData = [];
	// public status 
	constructor() {
		if(SleepService.LoadDefaultData) {
			this.addDefaultData();
			SleepService.LoadDefaultData = false;
		}
	}

	private addDefaultData() {
		this.logOvernightData(new OvernightSleepData(new Date('February 18, 2021 01:03:00'), new Date('February 18, 2021 09:25:00')));
		// this.logSleepinessData(new StanfordSleepinessData(4, new Date('February 19, 2021 14:38:00')));
		this.logOvernightData(new OvernightSleepData(new Date('February 20, 2021 23:11:00'), new Date('February 21, 2021 08:03:00')));
	}

	public logOvernightData(sleepData:OvernightSleepData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllOvernightData.push(sleepData);
	}

	// public logSleepinessData(sleepData:StanfordSleepinessData) {
	// 	var today = new Date();

	// 	let options:SetOptions = {
	// 		key: today.toString() + '-Sleepiness',
	// 		value: sleepData.summaryString()
	// 	  }
	  
	// 	  Preferences.set(options);
	// 	// SleepService.AllSleepData.push(sleepData);
	// 	// SleepService.AllSleepinessData.push(sleepData);
	// }

	async logDate(loggedDate: String) {
		this.getKeys();

		if (this.keys.includes('dates')){
			var curVal = await this.getValue('dates');

			if (!curVal.includes(loggedDate)) {
				curVal.push(loggedDate);
				this.setKey('dates', curVal);
			}
		}
		else {
			this.setKey('dates', [loggedDate]);
		}
	}

	async logSleepiness(sleepData:StanfordSleepinessData) {
		var date = sleepData.getLoggedAt().toLocaleDateString();
		var time = sleepData.getLoggedAt().toLocaleTimeString();
		var value = sleepData.getLoggedValue();

		this.getKeys();
		console.log('keys', this.keys);
		this.logDate(date);

		if (this.keys.includes('sleepiness')){
			var curVal = await this.getValue('sleepiness');

			if (curVal.has(date)) {
				curVal[date][time] = value;
			}
			else {
				curVal[date] = { time : value };
			}
			
			this.setKey('sleepiness', curVal);
		}
		else {
			this.setKey('sleepiness', { date : { time : value }});
		}
	}

	getDates() {
		return this.getValue('dates');
	}

	getSleepinessOn(date) {
		return this.getValue('sleepiness')[date];
  	}
	
	setKey(key, val) {

        let options:SetOptions = {
          key:key,
          value:JSON.stringify(val)
        }

		Preferences.set(options);
	}

	private async getKeys() {
		await Preferences.keys().then((keys)=>{
			this.keys = keys.keys;
		})
	}

	private getValue(key) {
		let options:GetOptions = {
			key:key
		}
		return Preferences.get(options).then((val)=> {
			return JSON.parse(val.value);
		});
	}
}
