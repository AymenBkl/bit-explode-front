import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryPageRoutingModule } from './history-routing.module';

import { HistoryPage } from './history.page';
import { ShareModule } from 'src/app/components/share/share.module';
import { ScrollbarThemeModule } from 'src/app/directives/scrollbar.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryPageRoutingModule,
    ShareModule,
    ScrollbarThemeModule
  ],
  declarations: [HistoryPage]
})
export class HistoryPageModule {}
