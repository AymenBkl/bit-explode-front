import { Component, OnInit } from '@angular/core';
import { Col } from '../interfaces/col';
import { Game } from '../interfaces/game';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageServiceService } from '../services/storage-service.service';
import { GameService } from '../services/game.service';
import { HashService } from '../services/hash.service';
import { Hash } from '../interfaces/hash';
import { EncryptedData } from '../interfaces/encryptedData';
import { ClickCel } from '../interfaces/clickCel';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  map: Array<Array<Col>>;
  incrementBy: number = 2;
  game: Game;
  valid: boolean = false;
  next: number;
  validRoute: boolean = false;
  gameHash: Hash;
  games: any;
  historyGames: Game[];
  balance: number;
  submmited: boolean = false;
  celClicked: string = 'click-cel';
  colClick: {col:Col,indexRow: number, indexCol: number,data:EncryptedData,mines: string }[] = [];
  constructor(private activatedRouter: ActivatedRoute,
    private storage: StorageServiceService,
    private router: Router,
    private gameService: GameService,
    private hashService: HashService) { }
  async ngOnInit() {
    this.checkHash();
    this.checkRouter();
  }

  createGame() {
    console.log(this.game,this.valid);
    if (this.validRoute && this.valid) {
      this.submmited = true;
      this.colClick = [];
      this.gameService.createGame(this.storage.currentHash._id, this.game)
        .then((result: any) => {
          this.submmited = false;
          if (result && result != false) {
            console.log(result);
            this.game = result;
            this.storage.saveCurrentGame(this.game._id);
          }
        });
    }
  }

  initGame() {
    if (this.validRoute) {
      this.game = {
        _id: 'id',
        stake: 100,
        numberMines: 1,
        userClick: 0,
        playing: false,
        completed: false,
        matrix:null,
        data:null,
      }
      this.valid = true;
      delete this.game.data;
    }
  }


  segmentChanged($event) {
    this.game = {
      _id: this.game._id,
      stake: this.game.stake,
      numberMines: Number($event.detail.value),
      userClick: this.game.userClick + this.game.numberMines == 25 ? 0 : this.game.userClick,
      playing: this.game.playing,
      completed: this.game.completed,
      matrix:this.game.matrix,
      data:this.game.data,
    }
  }

  isValid(game) {
    console.log(this.game);
    this.game = game;
    this.valid = game.completed;
  }



  celClick(clicked){
    this.celClicked = 'click-cel';
  }
  async play() {
    this.createGame();
  }

  gameIsPlaying() {
    this.valid = false;
  }

  checkHash() {
    const hash = this.storage.getCurrentHash();
    console.log("here");
    if (hash.hashId && hash.hashId != null && hash.hashId != '') {
      this.navigateHome(hash.hashId);
    }
  }

  checkRouter() {
    this.activatedRouter.queryParams.subscribe(params => {
      const gameHash = params["url"];
      if (gameHash != null) {
        this.hashService.checkHash(gameHash)
          .then((result: any) => {
            if (result && result != false) {
              this.validRoute = true;
              this.initGame();
            }
            else {
              this.validRoute = false;
            }
          })
      }
      else {
        this.validRoute = false;
      }
    })
  }

  nextValue(next) {
    this.next = next;
  }

  newGame(game) {
    this.game = game.game;
    this.colClick = game.activeIndex;
  }

  colClicked(col:{col:Col,indexRow: number, indexCol: number,data:EncryptedData,mines: string }){
    if (col.col && col.col.color == 'green'){
      this.celClicked = 'success-cel';
    }
    else {
      this.celClicked = 'lose-game';
    }
    this.colClick.push(col);
  }

  async generateHash() {
    this.hashService.createHash()
      .then((result: any | Hash) => {
        if (result && result != false) {
          delete result.games;
          this.storage.saveActiveHash(result);
          this.navigateHome(result.hashId);
        }
      })

  }

  navigateHome(hashId: string) {
    this.router.navigate([], {
      relativeTo: this.activatedRouter,
      queryParams: {
        url: hashId
      },
      queryParamsHandling: 'merge',
    });

  }

}
