import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

// export function forbiddenPriceValidator(price:number):ValidatorFn{
//    if(price<=0){
//      return 
//    }
//    return null;
// }

@Directive({
  selector: '[appPriceValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PriceValidatorDirective,
    multi: true
  }]
})
export class PriceValidatorDirective implements Validators{
  validate(control: AbstractControl) : {[key: string]: any} | null {
    if (control.value<= 10) {
      return { 'priceInvalid': true };
    }
    return null;
  }
}
