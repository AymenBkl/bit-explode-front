import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginComponent } from 'src/app/components/modal/login/login.component';
import { Hash } from 'src/app/interfaces/hash';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { HashService } from 'src/app/services/hash.service';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.page.html',
  styleUrls: ['./complaints.page.scss'],
})
export class ComplaintsPage implements OnInit {

  validRoute:boolean = false;
  gameHash: Hash;
  constructor(private activatedRouter: ActivatedRoute,
              private hashService: HashService,
              private authService: AuthServiceService,
              private modalCntrl: ModalController
              ) { }

  ngOnInit() {
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
}
