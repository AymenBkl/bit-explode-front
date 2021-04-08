import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { MatrixComponent } from '../components/mines/matrix/matrix.component';
import { BalanceComponent } from '../components/balance/balance.component';

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
  submmitedCashout: boolean = false;
  celClicked: string = 'click-cel';
  colClick: { col: Col, indexRow: number, indexCol: number, data: EncryptedData, mines: string }[] = [];
  stakeWon: number = 0;
  gameType:string = 'bitcoin';
  @ViewChild('matrixComponent') matrixComponent: MatrixComponent;
  @ViewChild('appBalance') appBalance: BalanceComponent;
  constructor(private activatedRouter: ActivatedRoute,
    private storage: StorageServiceService,
    private router: Router,
    private gameService: GameService,
    private hashService: HashService,
    private authService: AuthServiceService,
    private modalCntrl: ModalController,
    private interactionService: InteractionService) { }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.keyCode == 32 && !this.submmited) {
      console.log("here");
      this.play();
    }
    else if (event.keyCode == 13 && !this.submmitedCashout) {
      this.cashOut();
    }
  }
  async ngOnInit() {
    this.checkHash();
    this.checkRouter(true);
  }

  ionViewDidEnter() {
    setInterval(() => {
      this.checkRouter(false);

    }, 5000);
  }


  createGame() {
    console.log(this.game, this.valid);
    if (this.validRoute && this.valid && !this.game.playing) {
      this.submmited = true;
      this.colClick = [];
      this.gameService.createGame(this.storage.getCurrentHash()._id, this.game, this.storage.getAddressId())
        .then((result: any) => {
          console.log(result);
          this.submmited = false;
          if (result && result != false && result.status != false) {
            console.log(result);
            this.game = result;
          }
          else if (result && result.status == false && result.type == 'addressId'){
            this.handleAlert();
          }
        })
        .catch(err => {
          this.submmited = false;
          if (err && err.error == 'Unauthorized') {
            this.callLogin();
          }
          else if (err && err.error.err == 'You don"t have enough balance') {
            this.interactionService.createToast('You don"t have enough balance', 'warning',false);
            this.handleAlert();
          }
        });
    }
  }

  handleAlert() {
    this.interactionService.alertWithHandler("Do you want to play for free",'You don"t have enough balance',"CANCEL","PLAY")
      .then((result) => {
        if (result && result != false){
          this.game.type = 'test';
          this.createGame();
        }
      })
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
        status: '',
        type:this.gameType,
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
      status: this.game.status,
      type:this.gameType
    }
  }

  isValid(game) {
    this.game = game;
    if (!this.game.completed && !this.game.playing) {
      this.valid = true;
    }
    else {
      this.valid = game.completed;
    }
  }


  onWinStake(winStake) {
    this.stakeWon = winStake;
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
    console.log("here", hash);
    if (hash && hash.hashId && hash.hashId != null && hash.hashId != '') {
      this.navigateHome(hash.hashId);
    }
  }

  checkRouter(executeJWT: boolean) {
    this.activatedRouter.queryParams.subscribe(params => {
      const gameHash = params["url"];
      console.log(gameHash);
      if (gameHash != null) {
        this.hashService.checkHash(gameHash)
          .then((result: any) => {
            if (result && result != false) {
              this.gameHash = result;
              this.storage.saveActiveHash(this.gameHash);
              //this.callChangePassword()
              if (executeJWT) {
                this.checkJWT();
              }
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


  checkJWT() {
    this.authService.checkJWT(this.gameHash._id)
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
    this.appBalance.calculateBalance();
  }

  async generateHash() {

    this.interactionService.createLoading('Genrating Your hash Please Wait !!')
      .then(() => {
        this.hashService.createHash()
          .then((result: any | Hash) => {
            this.interactionService.hide();
            if (result && result != false) {
              this.interactionService.createToast('Your hash Created : ' + result.hashId, 'success',false);
              delete result.games;
              this.storage.saveActiveHash(result);
              this.navigateHome(result.hashId);
            }
            else {
              this.interactionService.createToast('Something Went Wrong Try Again !', 'error',false);
            }
          })
          .catch(err => {
            this.interactionService.hide();
            this.interactionService.createToast('Something Went Wrong Try Again !', 'error',false);
          })
      })
  }



  cashOut() {
    if (this.game.type == 'bitcoin'){
      if (this.validRoute && this.valid && this.game && this.game.status == 'active') {
        this.submmitedCashout = true;
        this.gameService.cashOut(this.storage.getCurrentHash()._id, this.storage.getAddressId())
          .then((result: any) => {
            this.submmitedCashout = false;
            if (result && result != false) {
              this.matrixComponent.cashOut(result);
            }
          })
          .catch(err => {
            this.submmitedCashout = false;
            console.log(err);
          })
      }
    }
    
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
      this.interactionService.createToast('You have already changed the password', 'warning',false);
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
        hashId: this.gameHash.hashId,
        address: this.gameHash.address
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
