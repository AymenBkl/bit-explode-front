import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginComponent } from 'src/app/components/modal/login/login.component';
import { loginModal } from 'src/app/functions/modals';
import { Complaint } from 'src/app/interfaces/complaint';
import { Deposit } from 'src/app/interfaces/deposits';
import { Hash } from 'src/app/interfaces/hash';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { GameService } from 'src/app/services/game.service';
import { HashService } from 'src/app/services/hash.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.page.html',
  styleUrls: ['./deposits.page.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DepositsPage implements OnInit {
  validRoute: boolean = false;
  gameHash: Hash;
  displayedColumns: string[] = ['_id', 'txid', 'amount', 'currentBalance', 'active','createdAt'];
  dataSource;
  deposits: Deposit[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  expandedElement: any;
  loaded: boolean = false;
  constructor(private gameService: GameService,
    private hashService: HashService,
    private authService: AuthServiceService,
    private modalCntrl: ModalController,
    private interactionService: InteractionService,
    private router: Router,
    private storageService: StorageServiceService,) { }

    ngOnInit() {
      this.checkRouter(true);
    }
  
    getDeposits() {
      this.interactionService.createToast('Getting Your Deposits', 'info', true);
      if (this.gameHash && this.gameHash.address && this.gameHash.address._id){
        this.gameService.getDeposits(this.gameHash.address._id,this.gameHash.address.address)
        .then((result: any) => {
          console.log(result);
          this.loaded = true;
          this.interactionService.closeToast();
          if (result && !result.status && result != false) {
            this.interactionService.createToast('Deposits Loadded', 'success', false);
            this.deposits= result;
            this.dataSource = new MatTableDataSource(result);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }
          else if (result && result.status && result.status == 'NOT FOUND') {
            this.interactionService.createToast('You have no Deposits', 'warning', false);
          }
          else {
            this.interactionService.createToast('Something Went Wrong !', 'error', false);
          }
  
        })
        .catch(err => {
          this.loaded = true;
          this.interactionService.createToast('Something Went Wrong !', 'error', false);
        })
      }
      else {
        this.loaded = true;
        this.interactionService.createToast('You have no Address', 'warning', false);
      }
      
    }
  
  
    checkRouter(executeJWT: boolean) {
      const gameHash = this.storageService.getCurrentHash();
      console.log('gameHash', gameHash);
      if (gameHash && gameHash.hashId) {
        this.hashService.checkHash(gameHash.hashId)
          .then((result: any) => {
            console.log(result);
  
            if (result && result != false) {
              this.validRoute = true;
              this.gameHash = result;
              if (executeJWT) {
                this.checkJWT();
              }
            }
            else {
              this.validRoute = false;
              this.router.navigate(['/home']);
            }
          })
      }
      else {
        this.validRoute = false;
        this.router.navigate(['/home']);
      }
    }
  
  
    checkJWT() {
      this.authService.checkJWT(this.gameHash._id)
        .then((result: boolean) => {
          this.validRoute = result;
          if (result) {
            this.getDeposits();
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
  
    async callLogin() {
      this.validRoute = false;
      loginModal(this.modalCntrl, this.gameHash.passwordChange, this.gameHash.hashId)
        .then((result) => {
          if (result) {
            this.validRoute = true;
            this.getDeposits();
          }
        })
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
