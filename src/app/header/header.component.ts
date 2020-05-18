import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @HostBinding('class.show') open = false;
  constructor() { }

  ngOnInit() {
  }
  toggle() {
    this.open = !this.open;
  }
}
