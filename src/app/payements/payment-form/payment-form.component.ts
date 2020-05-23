import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, AbstractControl } from '@angular/forms';
import { Observable, range } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatOptionSelectionChange } from '@angular/material';
import { AutoCompValidator } from 'src/app/Shared/AutoCompValidator';
import {  ActivatedRoute, Router } from '@angular/router';
import { IPayment } from '../paymentModel';
import { PaymentService } from '../payment.service';
import { Users } from 'src/app/Users/Users';


@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute,private router: Router, private service: PaymentService) {
      this.paramSubs = route.params.subscribe(params => {
        this.id = params['id'];
        if ( this.id) {
        this.editMode = true;
        console.log('ID : ' + this.id + ' Is edit mode enabled: ' + this.editMode);
        // const paymentSubs = this.paymObservable.subscribe(data => {
        //   this.paymentObj = data;
        //   this.setForm(this.paymentObj);
        // });
        console.log('ID : ' + this.id + ' Is edit mode enabled: ' + this.editMode)
        }
        this.service.getUserNChits()
        .subscribe(x => x.forEach(
          obj => {
            this.users.push(obj.uname);
            this.result.push(obj);
          }
        ));
      });
      }
  colspan = 2;
  /* For chit users name */
  result: Users[] = [];
  users: string[] = [];
  filterusers: Observable<string[]>;
  /* For chit number */
  nos: string[] = [];
  filterNums: Observable<string []>;
  /* For installment month*/
  months: string[] = [];
  start = 0;
  end = 0;

  filterNoMonths: Observable<string []>;
  /* For Agent names */
  agent: string[] = ['Shankar', 'Umapathi', 'GRR'];
  filterAgents: Observable<string []>;
  hideTransNo: boolean = true;
  @ViewChild(FormGroupDirective,{static: false}) myForm: FormGroupDirective;
  editMode = false;
  id: string;
  paramSubs: any;
  // paymentObj;

  // private paymObservable = this.service.getAllPayments().pipe(
  //   map(x => x.find( y => y.paymentId === this.id)),
  // )
  paymentForm: FormGroup = new FormGroup ({
    paymntMode: new FormControl('', Validators.required),   /* Formcontrol for payment mode*/
    paymntDt: new FormControl('', Validators.required),    /* Formcontrol for payment date*/
    transRef: new FormControl({value: '', disabled: true}, Validators.required),
    memberName: new FormControl('' ,[Validators.required, AutoCompValidator.validator(this.users)] ),
    chitNum: new FormControl({value:'', disabled: true}, [Validators.required, AutoCompValidator.validator(this.nos)]),
    monthNum: new FormControl({value:'', disabled: true}, [Validators.required, AutoCompValidator.validator(this.months)]),
    agentNm: new FormControl('', [Validators.required, AutoCompValidator.validator(this.agent)])
  });



  pymntType(value) {
    if (value === 'cash' || value === '') {
      this.paymentForm.get('transRef').disable();
    } else {
      this.paymentForm.get('transRef').enable();
    }
  }

  ngOnInit() {
    // this.setForm(this.paymentObj);
    // this.service.getPayment().subscribe(x => this.setForm(x));
    if(this.editMode) {
      this.service.getPaymentById(this.id).subscribe(x => this.setForm(x));
    }

    this.filterusers = this.paymentForm.get('memberName').valueChanges.pipe(
      startWith(''),
      // map(value => this._filter(value))
      map(value => value ? this._genFilter(this.users, value) : this.users)
    );
    this.filterNums = this.paymentForm.get('chitNum').valueChanges.pipe(
      startWith(''),
      map(value => value ? this._genFilter(this.nos, value) : this.nos)
    );
    this.filterNoMonths = this.paymentForm.get('monthNum').valueChanges.pipe(
      startWith(''),
      map(value => value ? this._genFilter(this.months, value) : this.months)
    );
    this.filterAgents= this.paymentForm.get('agentNm').valueChanges.pipe(
      startWith(''),
      map(value => value ? this._genFilter(this.agent, value) : this.agent)
    );
    /**
     * To subscribe and autopopulate values according to change in user
     */
    this.paymentForm.get('memberName').valueChanges.subscribe( value => {
     if(this.users.includes(value)) {
      this.paymentForm.get('chitNum').enable({emitEvent: false});
      this.enableMonthNo();
      this.result.filter(x => x.uname === value).forEach(x => {
        this.nos.length > 0 ? this.nos.length = 0 : this.nos ;
        x.activechits.forEach(x => this.nos.push(x.chitname));
      } );
      console.log(this.result);
     } else {
      this.paymentForm.get('chitNum').disable();
      this.paymentForm.get('chitNum').reset();
     }
    });

    this.paymentForm.get('chitNum').valueChanges.subscribe( value => {
      if ( this.nos.includes(value)) {
       this.paymentForm.get('monthNum').enable();
       this.result.filter(x => x.uname === this.paymentForm.get('memberName').value).
       filter(x => x.activechits.filter(name => name.chitname === value)
       .forEach(x => {this.start = +x.start; this.end = +x.end; } ));
       this.months.length >0 ? this.months.length = 0 : this.months ;
       const gen = range(this.start, this.end-this.start+1).subscribe( value => {

        this.months.push('' + value);
        });
       console.log(this.start , this.end);
      } else {
       this.paymentForm.get('monthNum').disable();
       this.paymentForm.get('monthNum').reset();
      }
     });
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
    this.paymentForm.setValue({
        paymntMode: payment.paymentMode,
        paymntDt: new Date(payment.paymentDt),
        transRef:  payment.paymentTransRef,
        memberName: payment.paymentMemNm,
        chitNum: payment.paymentChitNum,
        monthNum: payment.paymentInsMonNum,
        agentNm: payment.paymentAgentNm
      })
    if(payment.paymentMode === 'cash'){
      this.paymentForm.get('transRef').disable();}
    else{this.paymentForm.get('transRef').enable();}
      // this.paymentObj = payment;
      // console.log(this.paymentObj)
    }
    enableMonthNo() {

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
