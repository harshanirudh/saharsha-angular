import { Component, OnInit, Input } from '@angular/core';
import { Users } from '../Users';
import { UserService } from '../User.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: Users = new Users();
  constructor(private service: UserService) {
    this.service.user.subscribe(i => this.user = i);
   }

  ngOnInit() {
  }
  receiveUserData() {

  }
}
