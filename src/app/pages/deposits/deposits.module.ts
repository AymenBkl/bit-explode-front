import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepositsPageRoutingModule } from './deposits-routing.module';

import { DepositsPage } from './deposits.page';

import {  MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule} from '@angular/material/table'
import { MatSortModule } from "@angular/material/sort";
import {  MatPaginatorModule } from '@angular/material/paginator';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

const matModules = [
  MatFormFieldModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  NgxSkeletonLoaderModule,
  MatTooltipModule,
  MatIconModule,
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepositsPageRoutingModule,
    matModules,
  ],
  declarations: [DepositsPage]
})
export class DepositsPageModule {}
