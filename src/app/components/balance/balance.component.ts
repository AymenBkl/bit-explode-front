import { Component, Input, OnInit } from '@angular/core';
import { Deposit } from 'src/app/interfaces/deposit';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit {

  @Input('deposits') deposits: Deposit[];
  totalDeposit: number = 0;
  constructor() { }

  ngOnInit() {
    this.calculateTotalDeposit();
  }

  calculateTotalDeposit() {
    this.deposits.map(deposit => {
      this.totalDeposit +=  deposit.currentBalance;
    })
  }

}
