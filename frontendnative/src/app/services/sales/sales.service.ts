import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Product } from "../../interfaces/Product";
import { Global } from '../global/global';
import { Sale } from 'src/app/interfaces/Sale';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  // URI = 'http://localhost:3000/api/products';

  public url:string

  constructor(
    private http: HttpClient
  ) { 
    this.url = Global.url;
  }


  createSale(sale) {
  
    return this.http.post(this.url + 'sales', sale);
  }

  getProducts() {
    return this.http.get<Sale[]>(this.url + 'sales');
  }

  getProduct(id: string) {
    return this.http.get<Sale>(`${this.url}sales/${id}`);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.url}sales/${id}`);
  }

  updateProduct(id: string, title: string, description: string) {
    return this.http.put(`${this.url}/sales${id}`, {title, description});
  }

}

