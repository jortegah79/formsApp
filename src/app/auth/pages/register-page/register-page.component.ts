import { Component } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
//import * as customValidators from 'src/app/shared/validators/validators';


@Component({
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name:     ['', [Validators.required,Validators.pattern(this.validatorServices.firstNameAndLastnamePattern)]],
  //  email:    ['', [Validators.required,Validators.pattern(this.validatorServices.emailPattern)],[new EmailValidatorService()]],
  email:    ['', [Validators.required,Validators.pattern(this.validatorServices.emailPattern)],[this.emailValidatorService]],
    userName: ['', [Validators.required,this.validatorServices.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2:['', [Validators.required]],
  },{
    validators:[
      this.validatorServices.isFieldOneEqualFieldTwo('password','password2'),
    ]
  });

  constructor(
    private fb: FormBuilder,
    private validatorServices:ValidatorsService,
    private emailValidatorService:EmailValidatorService){}


  isValidField(field:string) {
    return this.validatorServices.isValidField(this.myForm,field);
  }
  onSubmit() {
   // console.log(this.myForm.value);
    this.myForm.markAllAsTouched();

  }


}
