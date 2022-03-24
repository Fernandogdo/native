import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/interfaces/Product';
import { Sale } from 'src/app/interfaces/Sale';
import { ProductsService } from 'src/app/services/products/products.service';
import { SalesService } from 'src/app/services/sales/sales.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-register-sale',
  templateUrl: './register-sale.component.html',
  styleUrls: ['./register-sale.component.scss']
})
export class RegisterSaleComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;


  displayedColumns: string[] = ['opciones', 'title', 'description', 'date', 'total'];
  arrayProducts: Product[] = [];
  product: Product;
  arraySales: Sale[] = [];
  dataSource;
  opcionSeleccionada: string;
  stock: number = 0;
  cantidad: number;
  productName: string;
  title: string;
  description: string;
  price: number;
  Products = [];
  totalVentas: number;
  categoryProduct: string;
  descriptionProduct: string;
  imageProduct: string;
  productsOriginal;

  orderForm: FormGroup;
  items: FormArray;

  constructor(
    private salesService: SalesService,
    private productsService: ProductsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.orderForm = new FormGroup({
      items: new FormArray([])
    });
    // this.getSales();
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts().subscribe(res => {
      this.arrayProducts = res;
      this.productsOriginal = JSON.parse(
        JSON.stringify(this.arrayProducts)
      );
    })
  }


  myChange($event) {
    console.log($event);
    this.productsService.getProduct(this.opcionSeleccionada).subscribe((res) => {
      this.product = res
      this.productName = this.product.title
      this.stock = this.product.stock
      this.price = this.product.price
      this.categoryProduct = this.product.category;
      this.descriptionProduct = this.product.description;
      console.log("🚀 ~ file: register-sale.component.ts ~ line 60 ~ RegisterSaleComponent ~ this.productsService.getProduct ~ res", this.productName, this.product.stock, this.cantidad)
    });
  }


  getTotalCost() {
    this.totalVentas = this.Products.map(t => t.price * t.quantity).reduce((acc, value) => acc + value, 0);
    return this.totalVentas;
  }


  addProduct(cantidad: number) {
    this.cantidad = cantidad
    const product = {
      title: this.productName,
      price: this.price,
      quantity: cantidad
    }
    this.Products.push(product)
    console.log("arrayProducts", this.Products)
    this.dataSource = new MatTableDataSource(this.Products);
    this.dataSource.paginator = this.paginator;
    // this.editProduct(cantidad)
  }


  editProduct() {
    console.log("PRODUCTS", this.Products)
    console.log("PRODUCTS", this.productsOriginal)

    this.Products.forEach((productSale) => {
      console.log("Productsale", productSale)
      let confPersonalizadaOriginal = this.productsOriginal.find(productOriginal => productOriginal.title == productSale.title)
      console.log("🚀 ~ file: register-sale.component.ts ~ line 109 ~ RegisterSaleComponent ~ this.Products.forEach ~ confPersonalizadaOriginal", confPersonalizadaOriginal)

      if (confPersonalizadaOriginal.title == productSale.title && confPersonalizadaOriginal.stock == productSale.stock) return

      console.log("confPersonalizadaOriginal", confPersonalizadaOriginal)

      this.stock = confPersonalizadaOriginal.stock - productSale.quantity

      // if (confPersonalizadaOriginal.title == productSale.title) {
      console.log("confPersonalizadaOriginal.title == productSale.title", confPersonalizadaOriginal.title, productSale.title)
      const editProduct = {
        title: confPersonalizadaOriginal.title,
        category: confPersonalizadaOriginal.category,
        description: confPersonalizadaOriginal.description,
        price: confPersonalizadaOriginal.price,
        stock: this.stock,
        // imagePath: this.imageProduct
      }
      console.log('editProduct', this.opcionSeleccionada, editProduct)
      // }

    });





    // this.productsService.updateProduct(this.opcionSeleccionada, editProduct).subscribe((res)=>{
    //   console.log(res)
    // }, (error)=>{
    //   console.log("ERROR")
    // })
  }


  deleteElementProducts(title, price, quantity) {
    console.log("titie", title)
    this.Products = this.Products.filter((item) => item.title !== title)
    console.log("arrayProductsdelre", this.Products)

    this.dataSource = new MatTableDataSource(this.Products);

    this.dataSource.paginator = this.paginator;

  }


  postSale() {
    let now = new Date();
    let month = now.toLocaleString("es-ES", { month: "long" })
    console.log("date", now.toLocaleString("es-ES", { month: "long" }))
    const sale = {
      title: this.title,
      description: this.description,
      date: now,
      month: month,
      total: this.totalVentas,
      products: this.Products
    }

    console.log("🚀 ~ file: register-sale.component.ts ~ line 148 ~ RegisterSaleComponent ~ postSale ~ sale", sale)

    // this.salesService.createSale(sale).subscribe((res) => {
    //   console.log(res);
    // })
    this.editProduct()
    // this.salesService.createSale()
  }
}
