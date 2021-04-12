import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginComponent } from 'src/app/components/modal/login/login.component';
import { Complaint } from 'src/app/interfaces/complaint';
import { Hash } from 'src/app/interfaces/hash';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { HashService } from 'src/app/services/hash.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.page.html',
  styleUrls: ['./complaints.page.scss'],
})
export class ComplaintsPage implements OnInit {

  validRoute: boolean = false;
  gameHash: Hash;
  displayedColumns: string[] = ['_id', 'description', 'type', 'createdAt', 'status'];
  dataSource;
  complaints: Complaint[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  loaded: boolean = false;
  constructor(private activatedRouter: ActivatedRoute,
    private hashService: HashService,
    private authService: AuthServiceService,
    private modalCntrl: ModalController,
    private interactionService: InteractionService
  ) { }

  ngOnInit() {
    this.checkRouter(true);
  }

  getComplaints() {
    this.interactionService.createToast('Getting Your Complaints', 'info', true);
    this.hashService.complaints(this.gameHash._id)
      .then((result: any) => {
        this.interactionService.closeToast();
        if (result && result != false){
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
        this.interactionService.createToast('Something Went Wrong !', 'error', false);
      })
  }


  checkRouter(executeJWT: boolean) {
    this.activatedRouter.queryParams.subscribe(params => {
      const gameHash = params["url"];
      console.log('gameHash', gameHash);
      if (gameHash != null) {
        this.hashService.checkHash(gameHash)
          .then((result: any) => {
            console.log('home', result && result != false && result.status && result.status == 'blocked');

            if (result && result != false) {
              this.gameHash = result;
              this.getComplaints();
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

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
