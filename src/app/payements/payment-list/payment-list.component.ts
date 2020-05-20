import { Component, OnInit, ViewChild } from '@angular/core';
import { IPayment } from '../paymentModel';
import { MatTableDataSource, MatSort, MatPaginator, MatIconRegistry, MatTab, MatAutocomplete } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PaymentService } from '../payment.service';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { take, retry } from 'rxjs/operators';


@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {


dataSource: any;

displayedColumns: string[] = ['paymentId', 'paymentMode', 'paymentMemNm' , 'paymentChitNum', 'Edit' ]
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
@ViewChild(MatSort, {static: true}) sort: MatSort;


constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private router: Router, private service: PaymentService) {
  iconRegistry.addSvgIcon(
      'edit',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/edit-black-24dp.svg'));
  this.dataSource = new MatTableDataSource();
  this.service.getAllPayments().pipe(
    retry(3),
    map(data => this.dataSource.data = data),
    ).subscribe({
      error: (err) => console.log('Error from catch' + err )
    });
}

  ngOnInit() {
    // this works
    //this.dataSource = new PaymentDataSource(this.service);
    // this.dataSource.data = this.payment;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sendData(row: IPayment) {
    this.router.navigate(['/Payments/edit', row.paymentId]);
  }
}
/**
 * This class can be used for creating datasources which can be used by mat tables
 */
export class PaymentDataSource extends DataSource<any>  {
  constructor(private service: PaymentService) {
    super();
  }
  connect(): Observable<IPayment[]> {
  return this.service.getAllPayments();
  }
  disconnect(){
    console.log('disconneting from data source');
  }
}

// https://blog.angular-university.io/angular-material-data-table/
