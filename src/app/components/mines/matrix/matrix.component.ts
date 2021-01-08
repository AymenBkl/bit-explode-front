import { Component, OnInit,Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { Col } from 'src/app/interfaces/col';
import { Game } from 'src/app/interfaces/game';
import { GameService } from 'src/app/services/game.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss'],
})
export class MatrixComponent implements OnInit,OnChanges {

  @Input('matrix') map: Array<Array<Col>>;
  @Input('validRoute') validRoute:boolean;
  @Input('game') game: Game;
  @Output() nextValue: EventEmitter<number> = new EventEmitter<number>();
  @Output() isValid: EventEmitter<boolean> = new EventEmitter<boolean>();
  next: number;
  constructor(private storage: StorageServiceService,
              private gameService: GameService) { }

  ngOnInit() {
  }

  clickCol(rowIndex: number, colIndex: number) {
    console.log(rowIndex,colIndex);
    if (!this.game.completed && this.game.playing && this.validRoute) {
      this.gameService.clickCol(this.storage.getCurrentHash(),this.game.gameId,rowIndex,colIndex)
        .then((result) => {
          console.log(result);
        })
    }
  }

  multiply() {
    this.isValid.emit(true);
    if (this.game.stake < 100) {
      this.game.stake = 100 * 2;
    }

    else {
      this.game.stake *= 2;
    }
  }

  addOne() {
    this.isValid.emit(true);
    if (this.game.stake < 100) {
      this.game.stake = 100 + 1;
    }

    else {
      this.game.stake += 1;
    }
  }


  algorith() {
    console.log(this.game);
    if (this.game && this.game.playing) {
      const A = this.game.stake;
      const X = this.game.numberMines + this.game.userClick;
      const Y = 25 - this.game.userClick;
      const Z = 0.97;
      this.next = Math.round(A * ((1 / ((25 - X) / Y) - 1) * Z))
      this.nextValue.emit(this.next);
    }
  }

  loseGame(){
    this.isValid.emit(true);
    this.game.completed = true;
    this.game.playing = false;
    this.map.map(row => {
      row.map(col => {
        if (col.color == 'red'){
          col.clicked = true;
        }
      });
    })
    this.storage.saveGame(this.game)
  }
  
  stakValidation(input: string) {
    if (input.match(/^[0-9]+$/) != null) {
      if (Number(input) < 100) {
        this.isValid.emit(false);
        this.game.stake = 100;
      }
      else {
        this.isValid.emit(true);
      }

    }
    else {
      this.isValid.emit(false);
    }
  }

  ngOnChanges(changes) {
    console.log(this.game);
    this.algorith();
  }
}
