import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import  * as customValidators from '../../../shared/validators/validators.helpers';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.pattern( this.validatorsService.firstNameAndLastnamePattern ) ]],
    // email: ['', [ Validators.required, Validators.pattern( this.validatorsService.emailPattern ) ], [ new EmailValidatorService() ]],
    email: ['', [ Validators.required, Validators.pattern( this.validatorsService.emailPattern ) ], [ this.emailValidatorService ]],
    username: ['', [ Validators.required, this.validatorsService.cantBeStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    repitedPassword: ['', [ Validators.required ]],
  }, {
    validators: [
      this.validatorsService.isFieldOneEqualToFieldTwo( 'password', 'repitedPassword' ),
    ]
  });

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidatorService: EmailValidatorService
  ){

  }

  isNotValidField( field: string ) {
    return this.validatorsService.isNotValidField( this.myForm, field );
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
