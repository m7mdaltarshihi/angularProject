import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NewUserComponent } from './new-user/new-user.component';
import { OrderListComponent } from './order-list/order-list.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { ProductListComponent } from './product-list/product-list.component';
import { NewProductComponent } from './new-product/new-product.component';
import { WarehouselIstComponent } from './warehouse-list/warehousel-ist.component';
import { NewWarehouseComponent } from './new-warehouse/new-warehouse.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';
import { Error404Component } from './error404/error404.component';
import { Error401Component } from './error401/error401.component';
import { authenticationGuard } from './guards/authentication.guard';
import { ErrorHandlingInterceptor } from './interceptors/error-handling.interceptor';
import { Error403Component } from './error403/error403.component';
import { ProfileComponent } from './profile/profile.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from "@ngx-translate/core";
const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'error404', component: Error404Component },
  { path: 'error401', component: Error401Component },
  { path: 'error403', component: Error403Component },
  {
    path: 'home', component: HomeComponent, canActivate: [authenticationGuard], children: [

      { path: 'userList', component: UserListComponent },
      { path: 'newUser', component: NewUserComponent },
      { path: 'orderList', component: OrderListComponent },
      { path: 'newOrder', component: NewOrderComponent },
      { path: 'productList', component: ProductListComponent },
      { path: 'newProduct', component: NewProductComponent },
      { path: 'warehouseList', component: WarehouselIstComponent },
      { path: 'newWarehouse', component: NewWarehouseComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },


    ]
  },
]
@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    LoginComponent,
    HomeComponent,
    NewUserComponent,
    OrderListComponent,
    NewOrderComponent,
    ProductListComponent,
    NewProductComponent,
    WarehouselIstComponent,
    NewWarehouseComponent,
    DashboardComponent,
    Error404Component,
    Error401Component,
    Error403Component,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HtppLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private translate: TranslateService) {
    translate.use('en')
  }
}
export function HtppLoaderFactory(http: HttpClient): TranslateHttpLoader {

  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

