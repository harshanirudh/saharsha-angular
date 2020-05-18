import { Component, OnInit, ViewChild } from '@angular/core';
import { IPayment } from '../paymentModel';
import { MatTableDataSource, MatSort, MatPaginator, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  payment: Array<IPayment> = [{
    paymentId: '23',
    paymentMode: 'Cheque',
    paymentDt: '23/02/97',
    paymentTransRef: 'TR100037 ',
    paymentMemNm: 'Suhas',
    paymentChitNum: 'LTGX 1007 56',
    paymentInsMonNum: '22',
    paymentAgentNm: 'GRR'
  },
  {
    paymentId: '24',
    paymentMode: 'Cheque',
    paymentDt: '23/02/97',
    paymentTransRef: 'TR100037 ',
    paymentMemNm: 'Anirudh',
    paymentChitNum: 'LTGX 1007 56',
    paymentInsMonNum: '22',
    paymentAgentNm: 'GRR'
  },
  {
    paymentId: '300',
    paymentMode: 'Cheque',
    paymentDt: '23/02/97',
    paymentTransRef: 'TR100037 ',
    paymentMemNm: 'Harsha',
    paymentChitNum: 'LTGX 1007 56',
    paymentInsMonNum: '22',
    paymentAgentNm: 'GRR'
  },
  {
    paymentId: '69',
    paymentMode: 'Cheque',
    paymentDt: '23/02/97',
    paymentTransRef: 'TR100037 ',
    paymentMemNm: 'Manasa',
    paymentChitNum: 'MTGX 1007 56',
    paymentInsMonNum: '22',
    paymentAgentNm: 'Harsha'
  }
]
dataSource: MatTableDataSource<IPayment> = new MatTableDataSource(this.payment);
//displayedColumns: string[] = ['Payment ID', 'Payment Mode', 'Member Name', 'Chit Number', 'Edit' ];
displayedColumns: string[] = ['paymentId', 'paymentMode', 'paymentMemNm' , 'paymentChitNum', 'Edit' ]
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
@ViewChild(MatSort, {static: true}) sort: MatSort;
constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
  iconRegistry.addSvgIcon(
      'edit',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/edit-black-24dp.svg'));
}

  ngOnInit() {
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
}
