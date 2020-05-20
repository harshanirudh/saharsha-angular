import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, AbstractControl } from '@angular/forms';
import { Observable, range } from 'rxjs';
import { map, startWith, filter, take } from 'rxjs/operators';
import { MatOptionSelectionChange } from '@angular/material';
import { AutoCompValidator } from 'src/app/Shared/AutoCompValidator';
import {  ActivatedRoute, Router } from '@angular/router';
import { IPayment } from '../paymentModel';
import { PaymentService } from '../payment.service';


@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit, OnDestroy {
  colspan = 2;
  /* For chit users name */
  users: string[] = ['harsha', 'anirudh', 'moti', 'choti', 'haritha'];
  filterusers: Observable<string[]>;
  /* For chit number */
  nos: string[] = ['1', '2', '3', '4', '56', '566', '32'];
  filterNums: Observable<string []>;
  /* For installment month*/
  months: string[] = [];
  gen = range(1, 100).subscribe(value => this.months.push('' + value));
  filterNoMonths: Observable<string []>;
  /* For Agent names */
  agent: string[] = ['Shankar', 'Umapathi', 'GRR'];
  filterAgents: Observable<string []>;
  hideTransNo: boolean = true;
  @ViewChild(FormGroupDirective,{static: false}) myForm: FormGroupDirective;
  editMode = false;
  id: string;
  paramSubs: any;
  paymentObj: IPayment = new IPayment();
  private paymObservable = this.service.getAllPayments().pipe(
    map(x => x.find( y => y.paymentId === this.id)),
  )
  constructor(private route: ActivatedRoute,private router: Router, private service: PaymentService) {
      this.paramSubs = route.params.subscribe(params => {
        this.id = params['id'];
        if ( this.id) {
        this.editMode = true;
        console.log('ID : ' + this.id + ' Is edit mode enabled: ' + this.editMode);
        const paymentSubs = this.paymObservable.subscribe(data => {
          this.paymentObj = data;
          this.setForm(this.paymentObj);
        });
        } else{
          this.editMode = false;
          console.log('ID : ' + this.id + ' Is edit mode enabled: ' + this.editMode)
        }
      });
      }


  paymentForm: FormGroup = new FormGroup ({
    paymntMode: new FormControl(this.paymentObj.paymentMode, Validators.required),   /* Formcontrol for payment mode*/
    paymntDt: new FormControl(this.paymentObj.paymentDt, Validators.required),    /* Formcontrol for payment date*/
    transRef: new FormControl({value: this.paymentObj.paymentTransRef, disabled: true}, Validators.required),
    memberName: new FormControl(this.paymentObj.paymentMemNm ,[Validators.required, AutoCompValidator.validator(this.users)] ),
    chitNum: new FormControl(this.paymentObj.paymentChitNum, [Validators.required, AutoCompValidator.validator(this.nos)]),
    monthNum: new FormControl(this.paymentObj.paymentInsMonNum, [Validators.required, AutoCompValidator.validator(this.months)]),
    agentNm: new FormControl(this.paymentObj.paymentAgentNm, [Validators.required, AutoCompValidator.validator(this.agent)])
  });
  pymntType(value) {
    if (value === 'cash' || value === '') {
      this.paymentForm.get('transRef').disable();
    } else {
      this.paymentForm.get('transRef').enable();
    }
  }
  ngOnInit() {
    this.filterusers = this.paymentForm.get('memberName').valueChanges.pipe(
      startWith(''),
      // map(value => this._filter(value))
      map(value => value ? this._genFilter(this.users, value) : this.users)
    );

    this.filterNums = this.paymentForm.get('chitNum').valueChanges.pipe(
      startWith(''),
      // map(value => this._filterNum(value))
      map(value => value ? this._genFilter(this.nos, value) : this.nos)
    );
    this.filterNoMonths = this.paymentForm.get('monthNum').valueChanges.pipe(
      startWith(''),
      // map(value => this._filterNoMon(value) )
      map(value => value ? this._genFilter(this.months, value) : this.months)
    );
    this.filterAgents= this.paymentForm.get('agentNm').valueChanges.pipe(
      startWith(''),
      map(value => value ? this._genFilter(this.agent, value) : this.agent)
    );
  }
  /* Returns filter observables*/
    private _genFilter(x: string[], name: string): string[]{
      const filterValue = name.toLowerCase();
      return x.filter(option => option.toLowerCase().indexOf(filterValue) === 0 );
    }
    onSubmit(){
      console.log(this.paymentForm.value);
      alert(' Do you want to submit the form?')
      this.myForm.resetForm(' ');
    }
    ngOnDestroy(): void {
      this.paramSubs.unsubscribe();
      this.paramSubs.unsubscribe();
    }

    setForm(payment: IPayment): void {
    /*   this.paymentForm.setValue({
        paymntMode: payment.paymentMode,
        paymntDt: payment.paymentDt,
        transRef: payment.paymentTransRef,
        memberName: payment.paymentMemNm,
        chitNum: payment.paymentChitNum,
        monthNum: payment.paymentInsMonNum,
        agentNm: payment.paymentAgentNm
      }) */
      this.paymentObj = payment;
      console.log(this.paymentObj)
    }
 /*  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();
    return this.users.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterNum(name: string): string[] {
    const filterValue = name;
    return this.nos.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterNoMon(name: string): string[] {
    const filterValue = name;
    return this.months.filter(option => option.toLowerCase().indexOf(filterValue) === 0 );
  } */
}
