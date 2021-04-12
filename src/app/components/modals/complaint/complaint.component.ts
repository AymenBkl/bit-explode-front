import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavParams } from '@ionic/angular';
import { HashService } from 'src/app/services/hash.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.scss'],
})
export class ComplaintComponent implements OnInit {

  compliantForm: FormGroup;
  formErrors: any;
  submitted = false;
  validationErrors: {errmsg , errcode};
  constructor(private formBuilder: FormBuilder,
              private navParams: NavParams,
              private hashService: HashService,
              private interactionService: InteractionService) { }

  ngOnInit() {
    this.buildCompliantForm();
  }


  buildCompliantForm() {
    let selectedType = this.navParams.get('type');
    this.compliantForm = this.formBuilder.group({
      description : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      type: [selectedType, [Validators.required, Validators.minLength(6)]],
      hashId:[this.navParams.get('hashId'),Validators.required]
    });
    
  }

  makeComplaint() {
    this.submitted = true;
    this.interactionService.createLoading('Creating Your Complaint. Please Wait !');
    this.hashService.makeComplaint(this.compliantForm.value)
      .then((result) => {
        this.submitted = false;
        this.interactionService.closeToast()
        if (result && result != false){
          this.interactionService.alertMsg('Complaint Created','We will respond as soon as possible','success');
        }
        else {
          this.interactionService.alertMsg('Complaint Failed','Something Went Wrong! Try Later','err');
        }
      })
      .catch(err => {
        this.submitted = false;
        this.interactionService.alertMsg('Complaint Failed','Something Went Wrong! Try Later','err');
      })
  }

}
