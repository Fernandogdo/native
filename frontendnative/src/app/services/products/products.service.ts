import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Product } from "../../interfaces/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  URI = 'http://localhost:3000/api/products';

  constructor(
    private http: HttpClient
  ) { }

  // title.value, category.value, description.value,  stock.value, price.value, this.file
  createProduct(title: string, category: string, description: string, stock: string, price:string, product: File) {
    const fd = new FormData();
    fd.append('title', title);
    fd.append('category', category);
    fd.append('description', description);
    fd.append('stock', stock);
    fd.append('price', price);
    fd.append('image', product);
    return this.http.post(this.URI, fd);
  }

  getProducts() {
    return this.http.get<Product[]>(this.URI);
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.URI}/${id}`);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.URI}/${id}`);
  }

  updateProduct(id: string, objetoEdit:Product) {
    console.log("editandoProducto", id, objetoEdit)
    return this.http.put(`${this.URI}/${id}`, objetoEdit);
  }


  // getProdcuts(){
  //   return this.http.get(this.URI)
  // }
}
