import { Component, OnInit } from '@angular/core';
import { Col } from '../interfaces/col';
import { Game } from '../interfaces/game';
import crypto from 'crypto-js';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageServiceService } from '../services/storage-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  col: Col = { color: "green", value: 1, clicked: false }
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
  constructor(private activatedRouter: ActivatedRoute,
              private storage: StorageServiceService,
              private router: Router) { }
  async ngOnInit() {
    this.checkRouter();
  }


  async createMatrix() {
    this.map = await Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => Object.assign({ color: "green", value: 0, clicked: false })));
  }




  initGame(minesNumber: number = 1, gamePlaying: boolean = false, stake: number = 100, matrix: Col[][] = null) {
    if (this.validRoute){
      this.game = {
        gameId:this.gameHash + new Date().toISOString(),
        stake: stake,
        numberMines: minesNumber,
        userClick: 0,
        playing: gamePlaying,
        matrix:null,
        completed:false,
      }
    }
    
  }


  async createMine() {
    if (this.validRoute){
      await this.createMatrix();
        let i = 0;
        while (i < this.game.numberMines) {
          let rowIndex = Math.floor(Math.random() * 5);
          let colIndex = Math.floor(Math.random() * 5);
          if (this.map[rowIndex][colIndex].color != "red") {
            this.map[rowIndex][colIndex] = { color: "red", value: 0, clicked: false }
            i++;
          }}
        };
        this.game.matrix = this.map;
  }

 

  segmentChanged($event) {
    this.game.numberMines = Number($event.detail.value);
  }

  isValid(valid){
    this.valid = valid;
  }

  

  play() {
    if (!this.game.playing){
      this.storage.saveGame(this.game)
      this.createMine();
      this.gameIsPlaying();
    }
    
  }

  gameIsPlaying(){
    this.valid = false;
    this.initGame(this.game.numberMines,true,this.game.stake,this.game.matrix);
  }

  

  createLink(lengthOfCode: number, possible: string) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.storage.saveHash(text);
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
      console.log(params);
      this.gameHash = params["url"];
      console.log(this.gameHash);
      if (this.gameHash != null){
        let games = this.storage.checkHash(this.gameHash);
        if (games && games != false){
          this.validRoute = true;
          this.games = JSON.parse(games);
          this.historyGames = Object.values(this.games);
          this.checkIfAllGamesAreCompelted();
        }
        else {
          this.validRoute = false;
        }
      }
    })
  }

  nextValue(next){
    this.next = next;
  }

  generateHash(){
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const lengthOfCode = 128;
    this.createLink(lengthOfCode, possible);
  }

  



  async checkIfAllGamesAreCompelted(){
    if (Object.values(this.games).length > 0){
      let check = false;
      await Object.values(this.games).map((game:Game) => {
        if (!game.completed){
          this.game = game;
          this.map = game.matrix;
          this.gameIsPlaying();
          check = true;
        }
      })
      if (!check){
        this.initGame();
        this.createMine();
      }
    }
    else {
      this.initGame();
      this.createMine();
    }
    
  }

  goToHistoryPage(game:Game){
    this.router.navigate(['/history'], {
      relativeTo: this.activatedRouter,
      queryParams: {
        url: this.gameHash,
        playingame: JSON.stringify(game)
      },
      queryParamsHandling: 'merge',
    });
  }
}
