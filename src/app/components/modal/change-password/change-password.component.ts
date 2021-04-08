import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { InteractionService } from 'src/app/services/interaction.service';
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
  hashId: string;
  constructor(private navParams: NavParams,
              private formBuilder: FormBuilder,
              private authService: AuthServiceService,
              private interactionService: InteractionService,
              private modalController:ModalController) { }

  ngOnInit() {
    this.buildReactiveForm();
    this.getData();
  }

  getData(){
    this.passwordChanged = this.navParams.get('passwordchanged');
    this.hashId = this.navParams.get('hashId');
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
    this.submitted = true;
    const toast = this.interactionService.createToast('Changing Password !','info',true);
    this.authService.securePassword(this.changePasswordForm.value.password,this.hashId)
      .then((result: any) => {
        this.submitted = false;
        this.interactionService.closeToast(toast);
        if (result && result != false){
          this.modalController.dismiss({hash: result});
          this.interactionService.createToast('Password Has been reseted !','success',false);
        }
        else {
          this.interactionService.createToast('Something Went Wrong !','error',false);
        }
      })
      .catch(err => {
        this.interactionService.closeToast(toast);
        this.submitted = false;
        this.interactionService.createToast('Something Went Wrong !','error',false);
      })
  }



}
