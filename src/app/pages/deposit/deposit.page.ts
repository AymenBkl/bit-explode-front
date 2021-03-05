import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.page.html',
  styleUrls: ['./deposit.page.scss'],
})
export class DepositPage implements OnInit {

  elementType: 'url' | 'canvas' | 'img' = 'url';
  value: string = 'Techiediaries';
  constructor() { }

  ngOnInit() {
  }

}
