import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  presentingLoadingController: HTMLIonLoadingElement;
  constructor(private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController) { }

  async createToast(msg, clr, pos,appliedclass) {
    const toast = await this.toastController.create({
      message: msg,
      color: clr,
      position: pos,
      duration: 1500,
      animated: true,
      cssClass: appliedclass,
    });
    return await toast.present();
  }


  async createLoading(msg?) {
    return new Promise((resolve, reject) => {
      console.log(this.presentingLoadingController);
      if (!this.presentingLoadingController) {
        this.loadingController.create({
          message: msg,
          cssClass: 'loading-customize',
          duration: 100000,
          spinner: 'circles'
        }).then((loading) => {
          this.presentingLoadingController = loading;
          this.presentingLoadingController.present()
          .then(() => {
            resolve(true);
          });
        });
      }
    });
  }

  async hide() {
    if (this.presentingLoadingController) {
      this.presentingLoadingController.dismiss();
      this.presentingLoadingController = null;
    }
    this.presentingLoadingController = null;
  }

  alertWithHandler(msg, hdr, cancelBtn, confirmBtn) {
    return new Promise((resolve, reject) => {
      this.alertController.create({
        header: hdr,
        message: msg,
        animated: true,
        buttons: [
          {
            text: cancelBtn,
            role: 'cancel',
            handler: () => {
              resolve(false);
            }
          },
          {
            text: confirmBtn,
            cssClass: 'danger',
            handler: () => {
              resolve(true);
            }
          }
        ]
      }).
        then((alert) => {
          alert.present();
        });
    });
  }


  confirmBox(msg:string,text:string,icon:string,confirmBtn:string,cancelBtn:string,handler) {
    return new Promise((resolve,reject) => {
      Swal.fire({
        title: msg,
        text: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonText: confirmBtn,
        cancelButtonText: cancelBtn,
      }).then((result) => {
        console.log(result);
        if (result.value || result.isConfirmed) {
          resolve({status:true});
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            resolve({status:false});
        }
      })
    })

  }


  alertMsg(header:string,msg:string,type) {
    Swal.fire(
      header,
      msg,
      type
    )
  }

  showValidationError(error) {
    Swal.showValidationMessage(
      `Request failed: ${error}`
    )
  }

  private handleSnackBar(type: string): string {
    if (type == 'error'){
      return '#d9534f';
    }
    else if (type == 'success'){
      return '#5cb85c';
    }
    else if (type == 'warning'){
      return '#f0ad4e';
    }
    else if (type == 'info'){
      return '';
    }
    else {
      return '';
    }
  }

  displayToast(msg:string,loading:boolean,type:string) {
    const Toast = Swal.mixin({
      toast: true,
      target: '#custom-target',
      position: 'bottom-start',
      showConfirmButton: false,
      className: "pos-toast-swt",
      background:this.handleSnackBar(type),
      didOpen: (toast) => {
        if (loading) Swal.showLoading();

      }
    })


    Toast.fire({
      icon: type,
      title: msg
    })
    if (!loading) {
      setTimeout(() => {
        Toast.close()
      },4000);
    }

  }

  closeToast() {
    Swal.close();

  }
}
