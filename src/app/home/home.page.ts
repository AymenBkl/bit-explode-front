import { Component, OnInit } from '@angular/core';
import { Col } from '../interfaces/col';
import { Game } from '../interfaces/game';
import crypto from 'crypto-js';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageServiceService } from '../services/storage-service.service';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  map: Array<Array<Col>>;
  incrementBy: number = 2;
  game: Game;
  valid: boolean = true;
  next: number;
  validRoute: boolean = false;
  gameHash: string;
  games: any;
  historyGames: Game[];
  balance:number;
  submmited: boolean = false;
  constructor(private activatedRouter: ActivatedRoute,
              private storage: StorageServiceService,
              private router: Router,
              private gameService: GameService) { }
  async ngOnInit() {
    this.checkRouter();
  }

  createGame() {
    if (this.validRoute && this.valid){
      this.submmited = true;
      this.gameService.createGame(this.gameHash,this.game)
        .then((result: any) => {
          this.submmited = false;
          if (result && result != false){
            this.game = result;
            this.storage.saveCurrentGame(this.game.gameId);
          }
        });
    }
  }

  initGame() {
    if (this.validRoute){
      this.game = {
        gameId:'gameId',
        stake: 100,
        numberMines:1,
        userClick: 0,
        playing: false,
        completed:false,
      }
    }
  }


  segmentChanged($event) {
    this.game.numberMines = Number($event.detail.value);
  }

  isValid(valid){
    this.valid = valid;
  }

  

  async play() {
    this.createGame();
  }

  gameIsPlaying(){
    this.valid = false;
  }

  

  createLink(lengthOfCode: number, possible: string) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.storage.saveHash(text);
    this.storage.saveActiveHash(text);
    this.router.navigate([], {
      relativeTo: this.activatedRouter,
      queryParams: {
        url: text
      },
      queryParamsHandling: 'merge',
    });
     }

  checkRouter(){
    this.activatedRouter.queryParams.subscribe(params => {
      this.gameHash = params["url"];
      if (this.gameHash != null){  
        this.validRoute = true; 
        this.initGame();
      }
      else {
        this.validRoute = false;
      }
    })
  }

  nextValue(next){
    this.next = next;
  }

  newGame(game) {
    this.game = game;
  } 

  generateHash(){
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const lengthOfCode = 128;
    this.createLink(lengthOfCode, possible);
  }



  
}
