import { Component, OnInit,Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { Col } from 'src/app/interfaces/col';
import { Game } from 'src/app/interfaces/game';
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
  constructor(private storage: StorageServiceService,) { }

  ngOnInit() {
  }

  clickCol(cel: Col) {
    if (!cel.clicked && !this.game.completed && this.game.playing && this.validRoute) {
      cel.clicked = true;
      if (cel.color == 'red') {
        this.loseGame();
      }
      else {
        cel.value = this.next;
        this.game.matrix = this.map;
        this.algorith();
        this.storage.saveGame(this.game);
      }
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
    if (this.game && this.game.playing) {
      const A = this.game.stake;
      const X = this.game.numberMines + this.game.userClick;
      const Y = 25 - this.game.userClick;
      const Z = 0.97;
      this.game.userClick += 1;
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
    this.game.matrix = this.map;
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
    this.algorith();
  }
}
