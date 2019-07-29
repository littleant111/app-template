/*
 * Example of use:
 * let message = this.replaceParametersProvider.replace(
 *    this.translate.instant('A total of {{amountBelowFeeStr}} {{coin}} were excluded.'), 
 *    { 
 *        amountBelowFeeStr: amountBelowFeeStr, 
 *        coin: this.tx.coin.toUpperCase() 
 *    }
 * );
 */

import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ReplaceParametersService {

  constructor() { }

  public replace(stringToReplace: string, params): string {
    let processedParams = [];
    for(let key in params) {
      processedParams.push({key, value: params[key]});
    }
    processedParams.forEach(param => {
      // 避免书写习惯差异造成bug
      stringToReplace = _.replace(stringToReplace, new RegExp('{{' + param.key + '}}', 'g'), param.value);
      stringToReplace = _.replace(stringToReplace, new RegExp('{{ ' + param.key + ' }}', 'g'), param.value);
    })

    return stringToReplace;
  }
}
