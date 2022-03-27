import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'; 
import { MatTableModule } from '@angular/material/table'; 
import { MatMenuModule } from '@angular/material/menu'; 
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatSelectModule } from '@angular/material/select'; 
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatSnackBarModule} from '@angular/material/snack-bar'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { BodyComponent } from './components/body/body.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BodyComponent } from './components/body/body.component';
import { ModalCategoryComponent } from './components/modal-category/modal-category.component';
import { ModalEditCategoryComponent } from './components/modal-edit-category/modal-edit-category.component';
import { ModalRegistroProductosComponent } from './components/modal-registro-productos/modal-registro-productos.component';

// import { SalesComponent } from './components/sales/sales.component';
import { ProductsComponent } from './components/products/products.component';
import { SaleComponent } from './components/sale/sale.component';
import { RegisterSaleComponent } from './components/register-sale/register-sale.component';
import { DetailSaleComponent } from './components/detail-sale/detail-sale.component';
import { ModalEditProductComponent } from './components/modal-edit-product/modal-edit-product.component';
import { ViewProductsCategoryComponent } from './components/view-products-category/view-products-category.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
// import { VentasComponent } from './components/sales/ventas.component';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { CategoriesComponent } from './components/categories/categories.component';

@NgModule({
  declarations: [
    AppComponent,
    // BodyComponent,
    SidenavComponent,
    DashboardComponent,
    CategoriesComponent,
    BodyComponent,
    ModalCategoryComponent,
    ModalEditCategoryComponent,
    ModalRegistroProductosComponent,
    SaleComponent,
    ProductsComponent,
    RegisterSaleComponent,
    DetailSaleComponent,
    ModalEditProductComponent,
    ViewProductsCategoryComponent,
    UserRegisterComponent,
    // VentasComponent,
    
    // DashboardComponent,
    // CategoriesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSelectModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }