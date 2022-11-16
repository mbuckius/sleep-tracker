import { Component, OnInit } from '@angular/core';
import  {Preferences, SetOptions, GetOptions, RemoveOptions, KeysResult} from "@capacitor/preferences"
import { IonSpinner } from '@ionic/angular';

@Component({
  selector: 'app-sleep-logs',
  templateUrl: './sleep-logs.page.html',
  styleUrls: ['./sleep-logs.page.scss'],
})
export class SleepLogsPage implements OnInit {
  keys = [];
  constructor() { }

  ngOnInit() {
    Preferences.clear().then(() =>{

      let i = 0;
      let ref = this;
      function inner()
      {
        let key = "key"+i.toString();
        let val = "value"+i.toString();

        let options:SetOptions = {
          key:key,
          value:val
        }
        
        Preferences.set(options).then(()=>{
          i++;
          if(i < 20)
          {
            inner();
          }
          else
          {
            ref.getKeys();
          }
        })
      }
      
      inner();
    })
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
