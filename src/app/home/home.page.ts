import { Component, OnDestroy, OnInit } from '@angular/core';
import { Col } from '../interfaces/col';
import { Game } from '../interfaces/game';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageServiceService } from '../services/storage-service.service';
import { GameService } from '../services/game.service';
import { HashService } from '../services/hash.service';
import { Hash } from '../interfaces/hash';
import { EncryptedData } from '../interfaces/encryptedData';
import { ClickCel } from '../interfaces/clickCel';
import { AuthServiceService } from '../services/auth-service.service';
import { ModalController } from '@ionic/angular';
import { ChangePasswordComponent } from '../components/modal/change-password/change-password.component';
import { InteractionService } from '../services/interaction.service';
import { LoginComponent } from '../components/modal/login/login.component';
import { DepositPage } from '../pages/deposit/deposit.page';

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
  colClick: { col: Col, indexRow: number, indexCol: number, data: EncryptedData, mines: string }[] = [];
  constructor(private activatedRouter: ActivatedRoute,
    private storage: StorageServiceService,
    private router: Router,
    private gameService: GameService,
    private hashService: HashService,
    private authService: AuthServiceService,
    private modalCntrl: ModalController,
    private interactionService: InteractionService) { }
  async ngOnInit() {
    this.checkHash();
    this.checkRouter();
  }



  createGame() {
    console.log(this.game, this.valid);
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
        })
        .catch(err => {
          if (err && err.error == 'Unauthorized') {
            this.callLogin();
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
        matrix: null,
        data: null,
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
      matrix: this.game.matrix,
      data: this.game.data,
    }
  }

  isValid(game) {
    console.log(this.game);
    this.game = game;
    this.valid = game.completed;
  }



  celClick(clicked) {
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
              this.gameHash = result;
              //this.callChangePassword()
              this.authService.checkJWT(gameHash)
                .then((result: boolean) => {
                  this.validRoute = result;
                  if (result) {
                    this.initGame();
                  }
                  else {
                    this.callLogin();
                  }
                })
                .catch(err => {
                  this.callLogin();
                  this.validRoute = false;
                });
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

  colClicked(col: { col: Col, indexRow: number, indexCol: number, data: EncryptedData, mines: string }) {
    if (col.col && col.col.color == 'green') {
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


  async callChangePassword() {
    if (!this.gameHash.passwordChange) {
      const modal = await this.modalCntrl.create({
        component: ChangePasswordComponent,
        backdropDismiss: false,
        cssClass: 'changePassword',
        componentProps: {
          passwordchanged: this.gameHash.passwordChange,
          hashId: this.gameHash.hashId
        }
      });
      modal.onDidDismiss()
        .then(data => {
          console.log(data);
          this.gameHash.passwordChange = true;
        });
      return await modal.present();
    }
    else {
      this.interactionService.createToast('You have already changed the password', 'primary', 'bottom','toast-customize');
    }

  }

  async callLogin() {
    this.validRoute = false;
    this.valid = false;
    const modal = await this.modalCntrl.create({
      component: LoginComponent,
      backdropDismiss: false,
      cssClass: 'login',
      componentProps: {
        passwordchanged: this.gameHash.passwordChange,
        hashId: this.gameHash.hashId
      }
    });
    modal.onDidDismiss()
      .then(data => {
        console.log(data);
        if (data.data && data.data.loggedIn) {
          this.validRoute = true;
          this.initGame();
        }
      });
    return await modal.present();

  }

  async deposit() {
    const modal = await this.modalCntrl.create({
      component: DepositPage,
      cssClass: 'deposit',
      componentProps: {
        passwordchanged: this.gameHash.passwordChange,
        hashId: this.gameHash.hashId
      }
    });
    modal.onDidDismiss()
      .then(data => {
        console.log(data);
        if (data.data && data.data.loggedIn) {
          this.validRoute = true;
          this.initGame();
        }
      });
    return await modal.present();
  }

  display() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }



}
