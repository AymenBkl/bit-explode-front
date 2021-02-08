import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  passwordChanged:boolean;
  submitted:boolean;
  hashId:string;
  password:string = '';
  incorrectPassword: boolean = false;
  constructor(private navParams: NavParams,
              private interactionService: InteractionService,
              private authService: AuthServiceService,
              private modalController: ModalController) { }

  ngOnInit() {
    this.getData();
    console.log(this.passwordChanged);
  }

  getData(){
    this.passwordChanged = this.navParams.get('passwordchanged');
    this.hashId = this.navParams.get('hashId');
  }

  login(){
    this.submitted = true;
    this.authService.login(this.password,this.hashId)
      .then((result: any) => {
        this.submitted = false;
        if (result && result != false){
          this.modalController.dismiss({loggedIn: true});
          this.interactionService.createToast('WELCOM BACK !','success','bottom')
        }
        else {
          this.interactionService.createToast('Wrong Password !','danger','bottom')
        }
      })
      .catch(err => {
        this.submitted = false;
        console.log(err,err.error)
        if (err && err.error && err.error.err.name == 'IncorrectPasswordError'){
          this.incorrectPassword = true;
          this.interactionService.createToast('Wrong Password !','danger','bottom')
        }
        else {
          this.interactionService.createToast('Something Went Wrong !','danger','bottom')
        }
      })
  }
}
