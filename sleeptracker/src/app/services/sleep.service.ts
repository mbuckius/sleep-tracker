import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Storage } from '@ionic/storage-angular'; 


export class SleepinessLog {
	date:Date;
	loggedSleepinessLevels:Object;
	constructor(date, sleepinessDict){
		this.date = date;
		this.loggedSleepinessLevels = sleepinessDict
	}
}

export class OvernightSleepLog {
	date:Date;
	loggedSleepData:OvernightSleepData;
	constructor(date, overnightSleepData){
		this.date = date;
		this.loggedSleepData = overnightSleepData
	}
}

@Injectable({
	providedIn: 'root'
  })
export class SleepService { // Using this service as the communication between storage and other pages
	private _storage: Storage | null = null;
	keys = [];
	constructor(private storage: Storage) {

		this.init();
	}

	async init() {
		const storage = await this.storage.create();
		this._storage = storage;
	}

	// logs sleepiness data into storage
	public async logSleepiness(sleepData:StanfordSleepinessData){
		var today = (new Date()).toLocaleDateString();
		var logTime = sleepData.getLoggedAt().toLocaleTimeString();
		var sleepinessLevel = sleepData.getLoggedValue();
		var key = `sleepiness-${today}`;

		this.keys = await this.getKeys()
		if (this.keys.includes(key)) { 
			// if the key is already there, we need to update the values for that date
			// rather than just reset it
			var curVal = await this.get(key);
			curVal[logTime] = sleepinessLevel;
			this.set(key, curVal);
		}
		else {
			var value = {};
			value[logTime] = sleepinessLevel;
			this.set(key, value);
		}
	}

	// Returns the dictionary of time logged as akey and the sleepiness score as the value, given a date as a string
	public async getSleepinessLogFor(date:string){
		return await this.get(`sleepiness-${date}`);
	}

	// Returns all the sleepiness logs as an array of SleepinessLog objects
	public async getAllSleepinessLogs() {
		this.keys = await this.getKeys();
		var sleepinessKeys = this.keys.filter(key => key.startsWith('sleepiness'));
		var sleepinessLogs = []
		for (let i=0; i < sleepinessKeys.length; i++){
			var sleepinessDate = sleepinessKeys[i].substring(11);
			var val = await this.get(sleepinessKeys[i]);
			sleepinessLogs.push(new SleepinessLog(sleepinessDate, val))
		}
		
		return sleepinessLogs
	}

	// Given OvernightSleepData, stores in storage using the sleepstart date as key 
	// and the data itself as the value
	public async logOvernightSleep(overnightSleepData: OvernightSleepData) {
		var sleepStartDate = overnightSleepData.getSleepStart().toLocaleDateString();
		var key = `overnightSleep-${sleepStartDate}`; // stored by the date that they fell asleep

		// Actually, how do we want to handle if they try to
		//  log overnight sleep twice for the same night?
		this.set(key, overnightSleepData);
	}

	// this may be something we want to implement later
	public async loggedOvernightSleepFor(date) {
		// check if they logged overnight sleep for that day
		// get all keys
		// check if 'overnightSleep-date' is in the array or not
	}

	// Returns all overnight sleep logs as an array of OvernightSleepLog
	public async getAllOvernightSleepLogs() {
		this.keys = await this.getKeys();
		var sleepinessKeys = this.keys.filter(key => key.startsWith('overnightSleep'));
		var overnightSleepLogs = []
		for (let i=0; i < sleepinessKeys.length; i++){
			var overnightSleepDate = sleepinessKeys[i].substring(15);
			var val = await this.get(sleepinessKeys[i]);
			overnightSleepLogs.push(new OvernightSleepLog(overnightSleepDate, val));
		}
		
		return overnightSleepLogs
	}

	// given the sleep start date as a string, retreives the associated data for overnight sleep data
	public async getOvernightSleepLogFor(date:string)
	{
		return await this.get(`overnightSleep-${date}`); // Returns an OvernightSleepData Object
	}

	// Set Key in Storage
	private set(key: string, value:any) {
		this.storage.set(key, value);
	}

	// Get Key in Storage
	private get(key: string) {
		return this.storage.get(key);
	}

	// Clear all keys in Storage
	public clear(){
		this.storage.clear();
	}

	// get all Keys in Storage
	public getKeys() {
		return this.storage.keys();
	}
}
