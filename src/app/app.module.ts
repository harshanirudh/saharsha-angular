import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule, MatAutocompleteModule, MatTable, MatTableDataSource, MatTableModule, MatPaginatorModule, MatIconModule, MatSortModule} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRadioModule} from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';


import { AppComponent } from './app.component';
import { UsersListComponent } from './Users/users-list/users-list.component';
import { UserDetailsComponent } from './Users/user-details/user-details.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './Shared/dropdown.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserFormComponent } from './Users/user-form/user-form.component';
import { ChitsListComponent } from './chits/chits-list/chits-list.component';
import { ChitsFormComponent } from './chits/chits-form/chits-form.component';
import { PaymentListComponent } from './payements/payment-list/payment-list.component';
import { PaymentFormComponent } from './payements/payment-form/payment-form.component';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  {path: 'Users/all' , component : UsersListComponent, data: {title:'All Users'}},
  {path: 'Users/new' , component: UserFormComponent, data: {title: 'New User Registration'}},
  {path: 'User' , component: UserDetailsComponent, data: {title: 'User Details'}},
  {path: 'Chits', component: ChitsListComponent, data: {title: 'List of Chits'}},
  {path: 'Chits/new', component: ChitsFormComponent, data:{ title: 'New Chit Registration'}},
  {path: 'Payments/All', component : PaymentListComponent, data:{ title: 'List of Payments'}},
  {path: 'Payments/new', component : PaymentFormComponent, data:{title: 'New Payment Transaction'}},
  {path: 'Payments/edit/:id', component : PaymentFormComponent, data: { title: 'Edit Payment Transaction'}}
];

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UserDetailsComponent,
    HeaderComponent,
    DropdownDirective,
    UserFormComponent,
    ChitsListComponent,
    ChitsFormComponent,
    PaymentListComponent,
    PaymentFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatRadioModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
