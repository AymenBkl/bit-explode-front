import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppHeaderComponent } from '../app-header/app-header.component';
import { CashComponent } from '../mines/cash/cash.component';

import { MatrixComponent } from '../mines/matrix/matrix.component';


@NgModule({
  declarations: [
    AppHeaderComponent,
    MatrixComponent,
    CashComponent,
  ],
  exports: [
    AppHeaderComponent,
    MatrixComponent,
    CashComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class ShareModule { }
