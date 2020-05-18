import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Users } from '../Users';
import { UserService } from '../User.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
//@Output() viewDetailsEvent = new EventEmitter<Users>();
userOutput: Users; //data to be sent to details page can be deleted after checking
  UserList = [
    {
    "uid" : 1,
    "uname" : 'Harsha Anirudh',
    "ucat" : 'Admin',
    "dob" : '27-02-1997'
  },
  {
    "uid" : 2,
    "uname" : 'GRR',
    "ucat" : 'Admin',
    "dob" : '03-06-1960'
  },
  {
    "uid" : 3,
    "uname" : 'Glml',
    "ucat" : 'User',
    "dob" : '03-06-1960'
  }
];
ucat = [ 'Admin', 'User'];
  constructor(private service: UserService) {
    this.service.user.subscribe(user => this.userOutput = user );
  }
  ngOnInit() {

  }
  onClickViewDetails() {

  }
  sendToUserDetails(user: Users) {
    //this.viewDetailsEvent.emit(user);
    this.service.changeUser(user);
  }

}
