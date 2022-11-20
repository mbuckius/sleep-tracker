import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import  { Preferences, SetOptions, GetOptions, RemoveOptions, KeysResult } from "@capacitor/preferences";

import { Storage } from '@ionic/storage-angular';



export class SleepinessLog {
	date:Date;
	loggedSleepinessLevels:Object;
	constructor(date, sleepinessDict){
		this.date = date;
		this.loggedSleepinessLevels = sleepinessDict
	}
}

@Injectable({
	providedIn: 'root'
  })
export class SleepService {
	private _storage: Storage | null = null;

	keys = [];
	dates = [];
	private static LoadDefaultData:boolean = true;
	// public static AllSleepData:SleepData[] = [];
	public static AllSleepData = [];
	public static AllOvernightData:OvernightSleepData[] = [];
	public static AllSleepinessData = [];
	// public status 
	constructor(private storage: Storage) {
		// if(SleepService.LoadDefaultData) {
		// 	this.addDefaultData();
		// 	SleepService.LoadDefaultData = false;
		// }
		this.init();
	}

	async init() {
		const storage = await this.storage.create();
		this._storage = storage;
		// console.log(this._storage)
	}

	public async logSleepiness(sleepData:StanfordSleepinessData){
		var today = (new Date()).toLocaleDateString();
		var logTime = sleepData.getLoggedAt().toLocaleTimeString();
		var sleepinessLevel = sleepData.getLoggedValue();
		var key = `sleepiness-${today}`;

		this.keys = await this.getKeys()
		if (this.keys.includes(key)) { // Need to check if key is already
			var curVal = await this.get(key);
			curVal[logTime] = sleepinessLevel;
			console.log('adding val to day', curVal);
			this.set(key, curVal);
		}
		else {
			var value = {};
			value[logTime] = sleepinessLevel;
			// var value = {logTime : sleepinessLevel};
			// console.log('logging sleepiness of ', sleepinessLevel, 'at', logTime);
			this.set(key, value);
		}
	}

	// This should return a dictionary of dictionaries {'date': {'logTime': 'sleepiness'}}
	// that is then turned into a list of Sleepiness Log Objects
	public async getAllSleepinessLogs() {
		this.keys = await this.getKeys();
		var sleepinessKeys = this.keys.filter(key => key.startsWith('sleepiness'));
		var sleepinessLogs = []
		for (let i=0; i < sleepinessKeys.length; i++){
			var sleepinessDate = sleepinessKeys[i].substring(11);
			var val = await this.get(sleepinessKeys[i]);
			sleepinessLogs.push(new SleepinessLog(sleepinessDate, val))
			// console.log(val)
			// sleepinessLogs[sleepinessDate] = val;
		}
		// sleepinessKeys.forEach((key))

		// console.log(sleepinessKeys);
		// var sleepinessLogs = Object.assign({}, ...sleepinessKeys.map(async (key) => ({[key.substring(11)]: await this.get(key)})))
		// console.log('sleepiness logs:', sleepinessLogs);
		
		return sleepinessLogs

	}

	// Set Key in Storage
	public set(key: string, value:any) {
		// console.log('from service set', this._storage)
		// this._storage?.set(key, value);
		this.storage.set(key, value);
		// console.log('from service set', this._storage)
	}

	// Get Key in Storage
	public get(key: string) {
		// return this._storage?.get(key);
		return this.storage.get(key);
	}

	// Clear all keys in Storage
	public clear(){
		// this._storage?.clear();
		this.storage.clear();
	}

	// get stored Keys
	public getKeys() {
		// console.log('from service', this._storage)
		// return this._storage?.keys();
		return this.storage.keys();
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

	// async logDate(loggedDate: String) {
	// 	this.getKeys();

	// 	if (this.keys.includes('dates')){
	// 		var curVal = await this.getValue('dates');
	// 		// console.log(curVal);

	// 		if (!curVal.includes(loggedDate)) {
	// 			curVal.push(loggedDate);
	// 			this.setKey('dates', curVal);
	// 		}
	// 	}
	// 	else {
	// 		this.setKey('dates', [loggedDate]);
	// 	}
	// }

	// async logSleepiness(sleepData:StanfordSleepinessData) {
	// 	console.log(sleepData);
	// 	var date = sleepData.getLoggedAt().toLocaleDateString();
	// 	var time = sleepData.getLoggedAt().toLocaleTimeString();
	// 	var value = sleepData.getLoggedValue();

	// 	this.getKeys();
	// 	// console.log('keys', this.keys);
	// 	this.logDate(date);

	// 	if (this.keys.includes('sleepiness')){
	// 		var curVal = await this.getValue('sleepiness');

	// 		if (date in curVal) {
	// 			// console.log("date already added")
	// 			curVal[date][time] = value;
	// 		}
	// 		else {
	// 			// console.log("no date yet");
	// 			curVal[date] = { time : value };
	// 		}
			
	// 		this.setKey('sleepiness', curVal);
	// 		// console.log(curVal);
	// 	}
	// 	else {
	// 		// console.log("no sleepiness data yet");
	// 		var temp = new Map();
	// 		var timeTemp = new Map();

	// 		timeTemp.set(time, value);
	// 		temp.set(date, timeTemp);
	// 		// console.log(temp);

	// 		this.setKey('sleepiness', temp);
	// 		var curVal = await this.getValue('sleepiness');
	// 		console.log(curVal);
	// 	}
	// }

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
		console.log(options);
		Preferences.set(options);
	}

	// private async getKeys() {
	// 	await Preferences.keys().then((keys)=>{
	// 		this.keys = keys.keys;
	// 	})
	// }

	private getValue(key) {
		let options:GetOptions = {
			key:key
		}
		return Preferences.get(options).then((val)=> {
			return JSON.parse(val.value);
		});
	}
}
