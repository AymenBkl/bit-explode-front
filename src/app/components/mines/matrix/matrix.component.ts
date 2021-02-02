import { Component, OnInit,Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { ClickCel } from 'src/app/interfaces/clickCel';
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

  @Input('validRoute') validRoute:boolean;
  @Input('game') game: Game;
  @Output() nextValue: EventEmitter<number> = new EventEmitter<number>();
  @Output() isValid: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() newGame: EventEmitter<Game> = new EventEmitter<Game>();
  next: number;
  map: Array<Array<Col>> = [];
  activeGame: boolean = false;
  constructor(private storage: StorageServiceService,
              private gameService: GameService) { }

  async ngOnInit() {
    await this.initMap();
    this.checkGame();
  }

  async initMap() {
    this.map =  await Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => Object.assign({ color: "green", value: 0, clicked: false,submited:false })));
  }

  clickCol(col: Col, rowIndex: number, colIndex: number) {
    if (!col.clicked && !this.game.completed && this.game.playing && this.validRoute) {
      col.submitted = true;
      this.gameService.clickCol(this.storage.getCurrentHash()._id,this.game._id,rowIndex,colIndex,this.next)
        .then((result: any) => {
          col.submitted = false;
          if (result && result != false ) {
            this.affectValueToMap(col,result);
          }
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
    if (this.game && this.game.playing) {
      const A = this.game.stake;
      const X = this.game.numberMines + this.game.userClick;
      const Y = 25 - this.game.userClick;
      const Z = 0.97;
      this.next = Math.round(A * ((1 / ((25 - X) / Y) - 1) * Z))
      this.nextValue.emit(this.next);
    }
  }

  loseGame(indexMines : [{ indexRow: number, indexCol: number }]){
    this.isValid.emit(true);
    this.activeGame = false;
    this.game.completed = true;
    this.game.playing = false;
    this.storage.removeActiveGame();
    indexMines.map(col => {
      this.map[col.indexRow][col.indexCol] = {color: 'red',value:0,clicked: true,submitted:false};
    })
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
    if (!this.activeGame){
      this.initMap();
    }
    this.algorith();
  }

  affectValueToMap(col: Col,response: ClickCel){
    col.clicked = true;
    col.color = response.color;
    if (response.color != 'red'){
      this.game.userClick = response.userClick;
      col.value = this.next;
      this.algorith();
    }
    else {
      this.loseGame(response.indexMines)
    }
  }

  checkGame(){
    if (this.storage.getCurrentHash() != null && this.storage.getCurrentGame() != null){
      this.gameService.checkGame(this.storage.getCurrentHash()._id,this.storage.getCurrentGame())
      .then((result: any) => {
        if (result && result != null){
          this.game = result.game;
          this.affectValues(result.activeIndex);
          this.activeGame = true;
          this.newGame.emit(result);
        }
      })
    }
    
  }

  affectValues(activeIndex:[{col:Col,indexRow: number, indexCol: number }]){
    activeIndex.map(value => {
      this.map[value.indexRow][value.indexCol] = value.col;
    }) 
  }
}
