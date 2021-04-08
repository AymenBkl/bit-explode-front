import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Address } from '../../interfaces/address';
import { NgxQrcodeElementTypes } from 'ngx-qrcode2';
import { BitcoinService } from 'src/app/services/bitcoin.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.page.html',
  styleUrls: ['./deposit.page.scss'],
})
export class DepositPage implements OnInit {

  elementType = NgxQrcodeElementTypes.URL;
  address: Address = null;
  hashId: string;
  constructor(private interactionService: InteractionService,
              private modalController: ModalController,
              private navParams: NavParams,
              private bitcoinService: BitcoinService) { }

  ngOnInit() {
    this.getHash();
  }

  getHash(){
    this.interactionService.createLoading("Getting Your Address Please Wait")
        this.hashId = this.navParams.get('hashId');
        this.address = this.navParams.get('address');
        console.log(this.address == null && (this.address != null && this.address.address == null))
        if (this.address == null){
          this.bitcoinService.getNewAddress(this.hashId)
          .then((result:any) => {
            this.interactionService.closeToast();
            if (result && result != false){
              this.address = result;
            }
            else {
              this.interactionService.createToast("Something Went Wrong !","error",false);
              this.cancel();
            }
          })
          .catch(err => {
            this.interactionService.hide();
            this.interactionService.createToast("Something Went Wrong !","error",false);
            this.cancel();
          })
        }
        else {
          this.interactionService.hide();
        }
    
  }

  presentToast(){
    this.interactionService.createToast("Copied To Click Board","success",false);
  }

  deposit(){
    this.interactionService.createToast('<ion-icon name="checkmark-outline"></ion-icon>',"info",false);
  }

  cancel(){
    this.modalController.dismiss();
  }




}
