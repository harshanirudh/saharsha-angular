import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-chits-form',
  templateUrl: './chits-form.component.html',
  styleUrls: ['./chits-form.component.css']
})
export class ChitsFormComponent implements OnInit {

  constructor() { }
  chitForm: FormGroup = new FormGroup({
    chitName: new FormControl('',[Validators.required]),
    chitValue: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    regDate: new FormControl('', [Validators.required]),
    commDate: new FormControl('', [Validators.required]),
    maxUsers: new FormControl('',[Validators.required]),
    startMonth: new FormControl('', [Validators.required]),
    endMonth: new FormControl('', [Validators.required])
  });
  ngOnInit() {
  }

}
