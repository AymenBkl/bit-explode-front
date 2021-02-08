import { Component, OnInit,Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { ClickCel } from 'src/app/interfaces/clickCel';
import { Col } from 'src/app/interfaces/col';
import { EncryptedData } from 'src/app/interfaces/encryptedData';
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
  @Output() isValid: EventEmitter<Game> = new EventEmitter<Game>();
  @Output() newGame: EventEmitter<Game> = new EventEmitter<Game>();
  @Output() colClick: EventEmitter<{col:Col,indexRow: number, indexCol: number,data:EncryptedData,mines: string}> = new EventEmitter<{col:Col,indexRow: number, indexCol: number,data:EncryptedData,mines: string }>();
  @Output() clickCel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() callLogin: EventEmitter<boolean> = new EventEmitter<boolean>();
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
        this.clickCel.emit(true);
          this.gameService.clickCol(this.storage.getCurrentHash()._id,this.game._id,rowIndex,colIndex,this.next)
          .then((result: any) => {
            col.submitted = false;
            if (result && result != false ) {
              this.affectValueToMap(col,result,rowIndex,colIndex);
            }
          })
          .catch(err => {
            col.submitted = false;
            if (err && err.error == 'Unauthorized'){
              this.callLogin.emit(true);
            }
          })
    };
    
  }

  multiply() {
    if (this.game.stake < 100) {
      this.game.stake = 100 * 2;
      this.algorith();
    }

    else {
      this.game.stake *= 2;
      this.algorith();
    }
  }

  addOne() {
    if (this.game.stake < 100) {
      this.game.stake = 100 + 1;
      this.algorith();
    }

    else {
      this.game.stake += 1;
      this.algorith();
    }
  }


  algorith() {
    if (this.game) {
      const A = this.game.stake;
      const X = this.game.numberMines + this.game.userClick;
      const Y = 25 - this.game.userClick;
      const Z = 0.97;
      this.next = Math.round(A * ((1 / ((25 - X) / Y) - 1) * Z))
      this.nextValue.emit(this.next);
    }
  }

  loseGame(indexMines : [{ indexRow: number, indexCol: number }]){
    this.activeGame = false;
    this.game.completed = true;
    this.game.playing = false;
    this.storage.removeActiveGame();
    this.isValid.emit(this.game);
    indexMines.map(col => {
      this.map[col.indexRow][col.indexCol] = {color: 'red',value:0,clicked: true,submitted:false};
    })
  }
  
  stakValidation(input: string) {
    if (input.match(/^[0-9]+$/) != null) {
      if (Number(input) < 100) {
        this.isValid.emit(this.game);
        this.game.stake = 100;
      }
      else {
        this.isValid.emit(this.game);
      }

    }
    else {
      this.isValid.emit(this.game);
    }
  }



  ngOnChanges(changes) {
    console.log("here");
    if (!this.activeGame){
      this.initMap();
    }
    this.algorith();
  }

  affectValueToMap(col: Col,response: ClickCel,indexRow:number,indexCol:number){
    col.clicked = true;
    col.color = response.color;
    if (response.color != 'red'){
      this.game.userClick = response.userClick;
      col.value = this.next;
      this.algorith();
      if (response.userClick + this.game.numberMines == 25){
        this.winGame(response.indexMines);
        this.colClick.emit({col:col,indexRow:indexRow,indexCol:indexCol,data:response.data,mines:response.mines});
      }
      else {
        
        this.colClick.emit({col:col,indexRow:indexRow,indexCol:indexCol,data:null,mines:null});
      }
      
    }
    else {
      this.loseGame(response.indexMines)
      this.colClick.emit({col:null,indexRow:indexRow,indexCol:indexCol,data:response.data,mines:response.mines});
    }
  }

  winGame(indexMines : [{ indexRow: number, indexCol: number }]){
    this.activeGame = false;
    this.game.completed = true;
    this.game.playing = false;
    this.storage.removeActiveGame();
    this.isValid.emit(this.game);
    indexMines.map(col => {
      this.map[col.indexRow][col.indexCol] = {color: 'red',value:0,clicked: true,submitted:false};
    })
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
      .catch(err => {
        if (err && err.error == 'Unauthorized'){
          this.callLogin.emit(true);
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
