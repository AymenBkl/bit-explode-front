import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepositPageRoutingModule } from './deposit-routing.module';

import { DepositPage } from './deposit.page';
import { ShareModule } from 'src/app/components/share/share.module';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ClipboardModule } from 'ngx-clipboard';
import { ScrollbarThemeModule } from 'src/app/directives/scrollbar.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepositPageRoutingModule,
    ShareModule,
    NgxQRCodeModule,
    ClipboardModule,
    ScrollbarThemeModule
  ],
  declarations: [DepositPage]
})
export class DepositPageModule {}
