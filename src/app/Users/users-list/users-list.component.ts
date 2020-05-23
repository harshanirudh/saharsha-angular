import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Users } from '../Users';
import { UserService } from '../User.service';
import { MatTableDataSource, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
//@Output() viewDetailsEvent = new EventEmitter<Users>();
userOutput: Users; //data to be sent to details page can be deleted after checking
displayedColumns = ['uid', 'uname', 'ucat', 'dob' , 'Edit'];

  UserList = [
    {
    "uid" : 1,
    "uname" : 'Harsha Anirudh',
    "ucat" : 'Admin',
    "dob" : '27-02-1997',
    "activechits": null
  },
  {
    "uid" : 2,
    "uname" : 'GRR',
    "ucat" : 'Admin',
    "dob" : '03-06-1960',
    "activechits": null
  },
  {
    "uid" : 3,
    "uname" : 'Glml',
    "ucat" : 'User',
    "dob" : '03-06-1960',
    "activechits": null
  }
];
userDataSource: MatTableDataSource<Users> = new MatTableDataSource(this.UserList);
ucat = [ 'Admin', 'User'];

constructor(private service: UserService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.service.user.subscribe(user => this.userOutput = user );
    iconRegistry.addSvgIcon(
      'edit',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/edit-black-24dp.svg'));
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
