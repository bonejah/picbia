import { Injectable } from '@angular/core';
import { SignupService } from './singup.service';
import { AbstractControl } from '@angular/forms';

import { debounceTime, switchMap, map, first } from 'rxjs/operators';

@Injectable()
export class UserNotTakenValidatorService {

  constructor(private singUpService: SignupService) { }

  checkUserNameTaken() {
    return (control: AbstractControl) => {
      return control
        .valueChanges
        .pipe(debounceTime(300))
        .pipe(switchMap(userName =>
          this.singUpService.checkUserNameTaken(userName)
        ))
        .pipe(map(isTaken => isTaken ? { userNameTaken : true } : null ))
        .pipe(first());
    }
  }
}
