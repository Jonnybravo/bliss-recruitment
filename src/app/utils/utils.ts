import {Injectable} from '@angular/core';
import * as _ from 'lodash';

@Injectable()

export class UtilsService {

  getFormattedDate(date){
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    let d = new Date(date);

    return d.toLocaleDateString('en-EN', options);
  }
}
