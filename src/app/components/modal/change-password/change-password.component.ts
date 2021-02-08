import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {

  passwordChanged:boolean;
  password:string;
  confirmPassword:string;
  constructor(private navParams: NavParams) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.passwordChanged = this.navParams.get('passwordchanged');
  }

}
