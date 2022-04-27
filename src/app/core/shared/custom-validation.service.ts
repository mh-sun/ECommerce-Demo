import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

  constructor() { }
  nameValidator(userControl: AbstractControl){
    if (this.validateName(userControl.value)) {
      return null
    } else {
      return { userNameNotAvailable: true };
    }
  }
  userNameValidator(userControl: AbstractControl) {
    if (this.validateUserName(userControl.value)) {
      return null
    } else {
      return { userNameNotAvailable: true };
    }
  }
  numberValidator(userControl: AbstractControl) {
    if (this.validateNumber(userControl.value)) {
      return null
    } else {
      return { userNameNotAvailable: true };
    }
  }
  validateName(userName: string) {
    const re = /^[A-Za-z]+$/;
    return re.test(userName)
  }

  validateUserName(input:string){
    const re = /^[A-Za-z0-9_-]+$/;
    return re.test(input)
  }
  validateNumber(input:string){
    const re = /^[0-9]+$/;
    return re.test(input)
  }
}
