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

  createToast(msg, type, loading: boolean) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      width: 600,
      background: this.handleToastBar(type),
      timer:loading ? 60000 : 4000,
      didOpen: (toast) => {
        if (loading == true) Swal.showLoading();

      }
    })

    Toast.fire({
      icon: type,
      title: msg
    })
    
  }


  async createLoading(msg?) {
      Swal.fire({
        title: 'Loading !',
        html: msg,// add html attribute if you want or remove
        allowOutsideClick: false,
        showConfirmButton: false,
        backdrop: false,
        allowEscapeKey: false,
        onBeforeOpen: () => {
            Swal.showLoading()
        },
    });
  }

  async hide() {
    if (this.presentingLoadingController) {
      this.presentingLoadingController.dismiss();
      this.presentingLoadingController = null;
    }
    this.presentingLoadingController = null;
  }

  alertWithHandler(msg: string, text: string, icon: string, confirmBtn: string, cancelBtn: string) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
        Swal.fire({
          title: msg,
          text: text,
          icon: icon,
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonText: confirmBtn,
          cancelButtonText: cancelBtn,
          backdrop: false,
          showLoaderOnConfirm:false,
        }).then((result) => {
          console.log(result);
          if (result.value || result.isConfirmed) {
            resolve({ status: true });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            resolve({ status: false });
          }
        })
      },500);
      })
      
  }


  confirmBox(msg: string, text: string, icon: string, confirmBtn: string, cancelBtn: string) {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: msg,
        text: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonText: confirmBtn,
        cancelButtonText: cancelBtn,
        showLoaderOnConfirm:false,

      }).then((result) => {
        console.log(result);
        if (result.value || result.isConfirmed) {
          resolve({ status: true });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          resolve({ status: false });
        }
      })
    })

  }


  alertMsg(header: string, msg: string, type) {
    if (type != 'win' && type != 'lose') {
      Swal.fire({
        title: header,
        text: msg,
        icon: type,
        timer: 500000,
        allowOutsideClick: false,
        allowEscapeKey: false
      });
    }
    else {
      const imageUrl = type == 'win' ? '../../assets/imgs/happy.svg' : '../../assets/imgs/sad-sleepy-emoticon-face-square.svg';
      Swal.fire({
        title: header,
        text: msg,
        imageUrl: imageUrl,
        timer: 500000,
        allowOutsideClick: false,
        allowEscapeKey: false,
        backdrop: false,
      });
    }


  }

  showValidationError(error) {
    Swal.showValidationMessage(
      `Request failed: ${error}`
    )
  }

  private handleToastBar(type: string): string {
    if (type == 'error') {
      return '#d9534f';
    }
    else if (type == 'success') {
      return '#5cb85c';
    }
    else if (type == 'warning') {
      return '#f0ad4e';
    }
    else if (type == 'info') {
      return '';
    }
    else {
      return '';
    }
  }
  closeToast() {
    Swal.close();
  }
}
