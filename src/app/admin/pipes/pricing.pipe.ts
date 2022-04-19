import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pricing'
})
export class PricingPipe implements PipeTransform {

  transform(value: number): string {
    let transformedNumber =  new Intl.NumberFormat('en-IN',{ maximumSignificantDigits: 3 }).format(value)
    return transformedNumber;
  }

}
