import { Injectable } from '@angular/core';

import * as _ from 'lodash';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    
    for (let key in user) {
      var result;
      if (user[key] !== undefined){
        result = true;
      } else {
        return false;
      }
    }
    return result;
  };

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

}
