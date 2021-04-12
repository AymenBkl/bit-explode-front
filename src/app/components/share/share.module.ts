import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppHeaderComponent } from '../app-header/app-header.component';

import { MatrixComponent } from '../mines/matrix/matrix.component';
import { HistoryGamesComponent } from '../history-games/history-games.component';
import { FooterComponent } from '../footer/footer.component';
import { LogComponent } from '../log/log.component';
import { ChangePasswordComponent } from '../modal/change-password/change-password.component';
import { LoginComponent } from '../modal/login/login.component';
import { BalanceComponent } from '../balance/balance.component';
import { ComplaintComponent } from '../modals/complaint/complaint.component';

@NgModule({
  declarations: [
    AppHeaderComponent,
    MatrixComponent,
    HistoryGamesComponent,
    FooterComponent,
    LogComponent,
    ChangePasswordComponent,
    LoginComponent,
    BalanceComponent,
    ComplaintComponent
  ],
  exports: [
    AppHeaderComponent,
    MatrixComponent,
    HistoryGamesComponent,
    FooterComponent,
    LogComponent,
    ChangePasswordComponent,
    LoginComponent,
    BalanceComponent,
    ComplaintComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ShareModule { }
