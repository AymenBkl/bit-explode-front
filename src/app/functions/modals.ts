import { ModalController } from "@ionic/angular";
import { ChangePasswordComponent } from "../components/modal/change-password/change-password.component";
import { LoginComponent } from "../components/modal/login/login.component";
import { Address } from "../interfaces/address";
import { DepositPage } from "../pages/deposit/deposit.page";

export async function changePassword(modalCntrl: ModalController,gameHashPasswordCahnged: boolean,gameHashId: string) {
    const modal = await modalCntrl.create({
        component: ChangePasswordComponent,
        backdropDismiss: false,
        cssClass: 'changePassword',
        componentProps: {
          passwordchanged: gameHashPasswordCahnged,
          hashId: gameHashId
        }
      });
      modal.onDidDismiss()
        .then(data => {
          this.gameHash.passwordChange = true;
        });
      return await modal.present();
} 


export async function loginModal(modalCntrl: ModalController,gameHashPasswordCahnged: boolean,gameHashId: string) {
    return new Promise(async (resolve,reject) => {
        const modal = await modalCntrl.create({
            component: LoginComponent,
            backdropDismiss: false,
            cssClass: 'login',
            componentProps: {
              passwordchanged: gameHashPasswordCahnged,
              hashId: gameHashId
            }
          });
          modal.onDidDismiss()
            .then(data => {
              console.log(data);
              if (data.data && data.data.loggedIn) {
                resolve(true);
              }
              else {
                  resolve(false);
              }
            });
        await modal.present();
    })
    
}


export async function depositModal(modalCntrl: ModalController,gameHashAddress: Address,gameHashId: string) {
    return new Promise(async (resolve,reject) => {
        const modal = await modalCntrl.create({
            component: DepositPage,
            cssClass: 'deposit',
            componentProps: {
              hashId: gameHashId,
              address: gameHashAddress
            }
          });
          modal.onDidDismiss()
            .then(data => {
              console.log(data);
              if (data.data && data.data.loggedIn) {
                resolve(true);
              }
              else {
                  resolve(false);
              }
            });
         await modal.present();
    })
}