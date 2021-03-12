import { Component, Input, OnInit } from '@angular/core';
import { Col } from 'src/app/interfaces/col';
import { Deposit } from 'src/app/interfaces/deposit';
import { Game } from 'src/app/interfaces/game';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit {

  @Input('deposits') deposits: Deposit[];
  totalDeposit: number = 0;
  @Input('matrix') matrix: Col[][];
  constructor() { }

  ngOnInit() {
    console.log('matrix',this.matrix)
    this.calculateTotalDeposit();
    this.calculateBalance();
  }

  calculateTotalDeposit() {
    this.deposits.map(deposit => {
      this.totalDeposit +=  deposit.currentBalance;
    })
  }

  ngAfterViewInit(){
   
  }

  ngOnChanges(changes) {
    this.totalDeposit = 0;
    console.log("called balance");
    console.log('matrix',this.matrix)
    this.calculateTotalDeposit();
    this.calculateBalance();
  }

  calculateBalance(){
    if (this.matrix) {
      this.matrix.map(rowMatrix => {
        rowMatrix.map(colMatrix => {
          this.totalDeposit += colMatrix.value;
        })
      })
    }
  }

}
