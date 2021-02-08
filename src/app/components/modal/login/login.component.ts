import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
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
  constructor(private navParams: NavParams,
              private interactionService: InteractionService,
              private authService: AuthServiceService) { }

  ngOnInit() {}

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
          //this.modalController.dismiss({hash: result});
          this.interactionService.createToast('Password Has been reseted !','success','bottom')
        }
        else {
          this.interactionService.createToast('Something Went Wrong !','danger','bottom')
        }
      })
      .catch(err => {
        this.submitted = false;
        this.interactionService.createToast('Something Went Wrong !','danger','bottom')
      })
  }
}
