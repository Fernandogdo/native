import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailSaleComponent } from './components/detail-sale/detail-sale.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterSaleComponent } from './components/register-sale/register-sale.component';
import { SaleComponent } from './components/sale/sale.component';


const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'sale', component: SaleComponent},
  {path: 'register-sale', component: RegisterSaleComponent},
  {path: 'detail-sale/:id', component: DetailSaleComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
