import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input('game') game: Game;
  @Output() stakeWon: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
    this.calculateTotalDeposit();
    this.calculateBalance();
  }

  calculateTotalDeposit() {
    this.totalDeposit = 0;
    this.deposits.map(deposit => {
      this.totalDeposit +=  deposit.currentBalance;
    })
  }



  ngOnChanges(changes) {
    this.calculateTotalDeposit();
    this.calculateBalance();
  }

  calculateBalance(){
    let balanceGame = 0;
    let loseGame : boolean = false;
    if (this.game && this.game.matrix) {
      this.game.matrix.map(rowMatrix => {
        rowMatrix.map(colMatrix => {
          balanceGame += colMatrix.value;
          loseGame = colMatrix.color == 'red' ? true : loseGame;
        })
      })
      this.stakeWon.emit(loseGame ? 0 : balanceGame);
    }
  }

}
