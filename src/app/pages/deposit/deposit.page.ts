import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgxQrcodeElementTypes } from 'ngx-qrcode2';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.page.html',
  styleUrls: ['./deposit.page.scss'],
})
export class DepositPage implements OnInit {

  elementType = NgxQrcodeElementTypes.URL;
  value: string = 'bcrt1q6jhwfrax6c7ee5tj0g2l4r0ehppaq60dq3fyg8';
  constructor(private interactionService: InteractionService,
              private modalController: ModalController) { }

  ngOnInit() {
  }

  presentToast(){
    this.interactionService.createToast("Copied To Click Board","transparent",'bottom','toast-customize');
  }

  deposit(){
    this.interactionService.createToast('<ion-icon name="checkmark-outline"></ion-icon>',"light","middle",'toast-deposit');
  }

  cancel(){
    this.modalController.dismiss();
  }




}
