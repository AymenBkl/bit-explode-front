import { Component, OnInit } from '@angular/core';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.page.html',
  styleUrls: ['./deposit.page.scss'],
})
export class DepositPage implements OnInit {

  elementType: 'url' | 'canvas' | 'img' = 'url';
  value: string = 'bcrt1q6jhwfrax6c7ee5tj0g2l4r0ehppaq60dq3fyg8';
  constructor(private interactionService: InteractionService) { }

  ngOnInit() {
  }

  presentToast(){
    this.interactionService.createToast("Copied To Click Board","transparent",'center');
  }




}
