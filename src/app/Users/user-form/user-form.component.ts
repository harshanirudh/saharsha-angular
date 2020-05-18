import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, NgForm, FormGroup } from '@angular/forms';
import { UserForm } from '../user-form.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @ViewChild('f', { static: true, read: NgForm}) userForm: NgForm;
  user: UserForm;
  userRForm: FormGroup;

  constructor() {
    this.userRForm = new FormGroup({
      fname: new FormControl('Harsha', [Validators.required, Validators.maxLength(60)]),
      lname: new FormControl('Anirudh', [Validators.required, Validators.maxLength(30)]),
      type:  new FormControl('', Validators.required),
      contact: new FormControl('', [Validators.required, Validators.pattern('^[+]*[0-9]{12}'), Validators.maxLength(13)]),
      dob: new FormControl('', [Validators.required,]),
      sex: new FormControl('', Validators.required),
      add1: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      add2: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      city: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      state: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      pincode: new FormControl('',[Validators.required,Validators.maxLength(6)]),
      country: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      pannum: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      aadharnum: new FormControl('', [Validators.required, Validators.pattern('[0-9]{12}')]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }
  userSelect = new FormControl('', Validators.required);

  ngOnInit() {

  }

 onSubmit() {
   console.log(this.userRForm.value);
  //  this.userRForm.value=

 }
 hasError(control: string, validator: string) {
  this.userRForm.controls[control].hasError(validator);
 }
}
