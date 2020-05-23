import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPayment } from './paymentModel';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Users } from '../Users/Users';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private payment: BehaviorSubject<IPayment> = new BehaviorSubject(new IPayment());
  constructor(private client: HttpClient){
  }
  getAllPayments(): Observable<any> {
    return this.client.get<IPayment>('/assets/data/paymentData.json');
  }
  getUserNChits() {
    return this.client.get<Users[]>('/assets/data/userschits.json');
  }
  sendPayment(p: IPayment) {
    this.payment.next(p);
  }
  getPayment() {
    return this.payment.asObservable();
  }
  getPaymentById(p: string){
   return  this.getAllPayments().pipe(
      map(x => x.find( y => y.paymentId === p))
    );
  }
  setPaymentLocalStorage(payment: IPayment) {

  }
  getPaymentLocalStorage(){

  }
  clearPaymentLocalStorage(){

  } ;
}
