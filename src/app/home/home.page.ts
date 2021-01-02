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
  lose: boolean = false;
  next: number;
  validRoute: boolean = false;
  gameHash: string;
  games: any;
  constructor(private activatedRouter: ActivatedRoute,
              private storage: StorageServiceService,
              private router: Router) { }
  async ngOnInit() {
    this.checkRouter();
  }


  createMatrix() {
    this.map =  Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => Object.assign({ color: "green", value: 0, clicked: false })));
  }




  initGame() {
    if (this.validRoute){
      this.game = {
        gameId:this.gameHash + new Date().toISOString(),
        stake: 100,
        numberMines: 1,
        userClick: 0,
        playing: false,
        matrix:null,
        completed:false,
      }
    }
    
  }


  async createMine() {
    if (this.validRoute){
      this.createMatrix();
        let i = 0;
        while (i < this.game.numberMines) {
          let rowIndex = Math.floor(Math.random() * 6);
          let colIndex = Math.floor(Math.random() * 6);
          if (this.map[rowIndex][colIndex].color != "red") {
            this.map[rowIndex][colIndex] = { color: "red", value: 0, clicked: false }
            i++;
          }}
        };
    
  }

  clickCol(cel: Col) {
    if (!cel.clicked && !this.lose && this.game.playing && this.validRoute) {
      cel.clicked = true;
      if (cel.color == 'red') {
        this.loseGame();
      }
      else {
        cel.value = this.next;
        this.next = this.algorith();
        this.game.matrix = this.map;
        this.storage.saveGame(this.gameHash,this.game,this.games);
      }
    }
  }

  segmentChanged($event) {
    this.game.numberMines = Number($event.detail.value);
  }

  stakValidation(input: string) {
    if (input.match(/^[0-9]+$/) != null) {
      if (Number(input) < 100) {
        this.valid = false;
        this.game.stake = 100;
      }
      else {
        this.valid = true;
      }

    }
    else {
      this.valid = false;
    }
  }

  multiply() {
    this.valid = true;
    if (this.game.stake < 100) {
      this.game.stake = 100 * 2;
    }

    else {
      this.game.stake *= 2;
    }
  }

  addOne() {
    this.valid = true;
    if (this.game.stake < 100) {
      this.game.stake = 100 + 1;
    }

    else {
      this.game.stake += 1;
    }
  }

  play() {
    this.storage.saveGame(this.gameHash,this.game,this.games)
    this.createMine();
    this.gameIsPlaying();
  }

  gameIsPlaying(){
    this.lose = false;
    this.valid = false;
    this.game.playing = true;
    this.next = this.algorith();
  }

  algorith() {
    if (this.game.playing) {
      const A = this.game.stake;
      const X = this.game.numberMines + this.game.userClick;
      const Y = 25 - this.game.userClick;
      const Z = 0.97;
      this.game.userClick += 1;
      return Math.round(A * ((1 / ((25 - X) / Y) - 1) * Z));
    }
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
          this.checkIfAllGamesAreCompelted();
        }
        else {
          this.validRoute = false;
        }
      }
    })
  }

  generateHash(){
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const lengthOfCode = 128;
    this.createLink(lengthOfCode, possible);
  }

  loseGame(){
    this.lose = true;
    this.valid = true;
    this.game.playing = false;
    this.map.map(row => {
      row.map(col => {
        if (col.color == 'red'){
          col.clicked = true;
        }
      });
    })
    this.game.completed = true;
    this.game.matrix = this.map;
    this.storage.saveGame(this.gameHash,this.game,this.games)
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
}
