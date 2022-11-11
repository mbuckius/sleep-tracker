import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ComponentsModule } from '../components.module';
import { NavBarRoutingModule } from './nav-bar-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NavBarRoutingModule
  ],
  declarations: [NavBarComponent]
})
export class NavBarModule { }
