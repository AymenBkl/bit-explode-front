import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppHeaderComponent } from '../app-header/app-header.component';

import { MatrixComponent } from '../mines/matrix/matrix.component';
import { HistoryGamesComponent } from '../history-games/history-games.component';
import { FooterComponent } from '../footer/footer.component';

@NgModule({
  declarations: [
    AppHeaderComponent,
    MatrixComponent,
    HistoryGamesComponent,
    FooterComponent
  ],
  exports: [
    AppHeaderComponent,
    MatrixComponent,
    HistoryGamesComponent,
    FooterComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ShareModule { }
