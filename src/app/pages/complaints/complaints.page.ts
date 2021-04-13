import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginComponent } from 'src/app/components/modal/login/login.component';
import { Complaint } from 'src/app/interfaces/complaint';
import { Hash } from 'src/app/interfaces/hash';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { HashService } from 'src/app/services/hash.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.page.html',
  styleUrls: ['./complaints.page.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ComplaintsPage implements OnInit {

  validRoute: boolean = false;
  gameHash: Hash;
  displayedColumns: string[] = ['_id', 'description', 'type', 'createdAt', 'status'];
  dataSource;
  complaints: Complaint[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  expandedElement: any;
  loaded: boolean = false;
  constructor(
    private hashService: HashService,
    private authService: AuthServiceService,
    private modalCntrl: ModalController,
    private interactionService: InteractionService,
    private router: Router,
    private storageService: StorageServiceService,
  ) { }

  ngOnInit() {
    this.checkRouter(true);
  }

  getComplaints() {
    this.interactionService.createToast('Getting Your Complaints', 'info', true);
    this.hashService.complaints(this.gameHash._id)
      .then((result: any) => {
        console.log(result);
        this.loaded = true;
        this.interactionService.closeToast();
        if (result && !result.status && result != false){
          this.interactionService.createToast('Complaints Loadded', 'success', false);
          this.complaints = result;
          this.dataSource = new MatTableDataSource(result);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
        else if (result &&  result.status && result.status == 'NOT FOUND'){
          this.interactionService.createToast('You have no Complaints', 'warning', false);
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
          this.getComplaints();
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
        this.getComplaints();
      }
    });
  return await modal.present();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
}
