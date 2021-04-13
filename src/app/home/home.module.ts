import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ShareModule } from '../components/share/share.module';
import { ScrollbarThemeModule } from '../directives/scrollbar.directive';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ShareModule,
    ReactiveFormsModule,
    ScrollbarThemeModule,
    MatFormFieldModule,

  ],
  declarations: [HomePage]
})
export class HomePageModule {}
