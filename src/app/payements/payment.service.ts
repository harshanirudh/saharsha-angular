import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPayment } from './paymentModel';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';



@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private client: HttpClient){
  }
  getAllPayments(): Observable<any> {
    return this.client.get<IPayment>('/assets/data/paymentData.json');
  }
}
