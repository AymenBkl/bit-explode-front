import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepositPageRoutingModule } from './deposit-routing.module';

import { DepositPage } from './deposit.page';
import { ShareModule } from 'src/app/components/share/share.module';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepositPageRoutingModule,
    ShareModule,
    NgxQRCodeModule,
    ClipboardModule
  ],
  declarations: [DepositPage]
})
export class DepositPageModule {}
