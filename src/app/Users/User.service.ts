import { Injectable } from '@angular/core';
import { Users } from './Users';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService{
  user: BehaviorSubject<Users>;
  dummy: Users = {
    uid: null,
    dob: null,
    ucat: null,
    uname: null
  }
  constructor() {
    this.user = new BehaviorSubject<Users>(this.dummy);
  }
  changeUser(user: Users){
    this.user.next(user);
  }
}
