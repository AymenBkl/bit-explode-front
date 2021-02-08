import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavParams } from '@ionic/angular';
import { MustMatch } from './must-matchValdiator';
import { onValueChanged } from './valueChanges';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {

  passwordChanged:boolean;
  changePasswordForm: FormGroup;
  formErrors: any;
  submitted = false;
  validationErrors: {errmsg , errcode};
  constructor(private navParams: NavParams,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildReactiveForm();
    this.getData();
  }

  getData(){
    this.passwordChanged = this.navParams.get('passwordchanged');
  }

  buildReactiveForm() {
    this.changePasswordForm = this.formBuilder.group({
      password : ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword : ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validators : MustMatch('password', 'confirmPassword')
    });
    this.changePasswordForm.valueChanges
      .subscribe(user => {
        this.formErrors = onValueChanged(user, this.changePasswordForm);
        console.log(this.formErrors);
      });
  }

  changePassword(){
    console.log("hello",this.changePasswordForm.value);
  }



}
