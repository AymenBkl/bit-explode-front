import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildCompliantForm();
  }


  buildCompliantForm() {
    this.compliantForm = this.formBuilder.group({
      description : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      type: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.compliantForm.valueChanges
      .subscribe(user => {
        //this.formErrors = onValueChanged(user, this.compliantForm);
      });
  }

}
