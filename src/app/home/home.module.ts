import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ShareModule } from '../components/share/share.module';
import { ScrollbarThemeModule } from '../directives/scrollbar.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ShareModule,
    ReactiveFormsModule,
    ScrollbarThemeModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
