import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { environment } from '../../../environments/environment';

const API = environment.apiUrl;

@Injectable()
export class SignupService {

  constructor(private http: HttpClient) {}

  checkUserNameTaken(userName: string) {
    return this.http.get(API + '/user/exists/' + userName);
  }

  singup(newUser: NewUser) {
    return this.http.post(API + '/user/signup', newUser);
  }
}
