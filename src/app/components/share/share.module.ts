import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppHeaderComponent } from '../app-header/app-header.component';
import { CashComponent } from '../mines/cash/cash.component';

import { MatrixComponent } from '../mines/matrix/matrix.component';
import { HistoryGamesComponent } from '../history-games/history-games.component';

@NgModule({
  declarations: [
    AppHeaderComponent,
    MatrixComponent,
    CashComponent,
    HistoryGamesComponent
  ],
  exports: [
    AppHeaderComponent,
    MatrixComponent,
    CashComponent,
    HistoryGamesComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class ShareModule { }
