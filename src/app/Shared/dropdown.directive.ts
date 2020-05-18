import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  exportAs: 'appDropdown'
})
export class DropdownDirective {

@HostBinding('class.show') open = false;
@HostListener('click') toggleOpen() {
  this.open = !this.open;
}
  constructor() { }

}
