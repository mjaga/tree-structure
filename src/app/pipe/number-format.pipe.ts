import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat',
})
export class NumberFormatPipe implements PipeTransform {
  transform(value: number, arg?: string) {
    return this.changeNumberFormat(value);
  }

  changeNumberFormat(
    number: number,
    decimals?: number,
    recursiveCall?: boolean
  ): string | number {
    const decimalPoints = decimals || 2;
    const noOfLakhs = number / 100000;
    let displayStr;
    let isPlural;

    if (noOfLakhs >= 1 && noOfLakhs <= 99) {
      const lakhs = this.roundOf(noOfLakhs, decimalPoints);
      isPlural = lakhs > 1 && !recursiveCall;
      displayStr = `${lakhs} Lakh${isPlural ? 's' : ''}`;
    } else if (noOfLakhs >= 100) {
      const crores = this.roundOf(noOfLakhs / 100, decimalPoints);
      const crorePrefix =
        crores >= 100000
          ? this.changeNumberFormat(crores, decimals, true)
          : crores;
      isPlural = crores > 1 && !recursiveCall;
      displayStr = `${crorePrefix} Crore${isPlural ? 's' : ''}`;
    } else {
      displayStr = number;
    }

    return displayStr;
  }

  roundOf(integer: number, decimalPoints: number) {
    return +integer.toLocaleString(undefined, {
      minimumFractionDigits: decimalPoints,
      maximumFractionDigits: decimalPoints,
    });
  }
}
