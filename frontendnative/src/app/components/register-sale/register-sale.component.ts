import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/interfaces/Product';
import { Sale } from 'src/app/interfaces/Sale';
import { ProductsService } from 'src/app/services/products/products.service';
import { SalesService } from 'src/app/services/sales/sales.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
  disabled: boolean = false
  disabledQuantity: boolean = true

  orderForm: FormGroup;
  items: FormArray;

  constructor(
    private salesService: SalesService,
    private productsService: ProductsService,
    // private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    // this.orderForm = new FormGroup({
    //   items: new FormArray([])
    // });
    // this.getSales();
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts().subscribe(res => {
      this.arrayProducts = res;
      console.log("arrayProducts", this.arrayProducts)
      this.productsOriginal = JSON.parse(
        JSON.stringify(this.arrayProducts)
      );
    })
  }


  myChange($event) {
    console.log($event);
    this.disabledQuantity = false
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

    let cont = 2
    const product = {
      id: Math.floor(Math.random() * (1 + 100000)),
      title: this.productName,
      price: this.price,
      quantity: cantidad
    }
    this.Products.push(product)
    this.disabled = true;

    console.log("arrayProducts", this.Products)


    this.Products.forEach((productSale) => {
      let productOriginal = this.arrayProducts.find(productOriginal => productOriginal.title == productSale.title)
      console.log("product", productOriginal.title, productSale.title)

      if (productSale.quantity > productOriginal.stock) {
        console.log("NO ESTA EN EL RNGO")
        this._snackBar.open("La cantidad " + productSale.quantity + " sobrepasa el stock disponible " + productOriginal.stock, "Cerrar", {
          duration: 2000,
        });
        this.Products = this.Products.filter((item) => item.id !== productSale.title)
        console.log("🚀 ~ file: register-sale.component.ts ~ line 112 ~ RegisterSaleComponent ~ this.Products.forEach ~ this.Products", this.Products)
      }

      if (productSale.quantity < 1) {
        console.log("NO ESTA EN EL RNGO")
        this._snackBar.open("Debe ingresar una cantidad mayor a 0 ", "Cerrar", {
          duration: 2000,
        });
        this.Products = this.Products.filter((item) => item.title !== productSale.title)

        // this.Products = this.Products.filter((item) => item.title !== productSale.title)
        console.log("🚀 ~ file: register-sale.component.ts ~ line 112 ~ RegisterSaleComponent ~ this.Products.forEach ~ this.Products", this.Products)
      }
    })

    this.dataSource = new MatTableDataSource(this.Products);
    this.dataSource.paginator = this.paginator;
    // this.editProduct(cantidad)
  }


  editProduct() {
    console.log("PRODUCTS", this.Products)
    console.log("PRODUCTS", this.productsOriginal)

    this.Products.forEach((productSale) => {
      // console.log("Productsale", productSale)
      let productOriginal = this.arrayProducts.find(productOriginal => productOriginal.title == productSale.title)
      // console.log("🚀 ~ file: register-sale.component.ts ~ line 109 ~ RegisterSaleComponent ~ this.Products.forEach ~ productOriginal", productOriginal)

      if (productOriginal.title == productSale.title && productOriginal.stock == productSale.stock) return

      console.log("saleProduct", productOriginal.title, productOriginal.category)

      this.stock = productOriginal.stock - productSale.quantity

      // if (productOriginal.title == productSale.title) {
      // console.log("productOriginal.title == productSale.title", productOriginal.title, productSale.title)
      const editProduct = {
        title: productOriginal.title,
        category: productOriginal.category,
        description: productOriginal.description,
        price: productOriginal.price,
        stock: this.stock,
        // imagePath: this.imageProduct
      }
      console.log('editProduct', productOriginal._id, editProduct)


      this.productsService.updateProduct(productOriginal._id, editProduct).subscribe((res) => {
        console.log("reseditado", res)
        this.getProducts()
      })

    });
  }


  deleteElementProducts(id) {
    console.log("titie", id)
    this.Products = this.Products.filter((item) => item.id !== id)
    console.log("arrayProductsdelre", this.Products)

    this.dataSource = new MatTableDataSource(this.Products);

    this.dataSource.paginator = this.paginator;

  }


  postSale() {
    let now = new Date();
    let year = new Date().getFullYear();
    // console.log("🚀 ~ file: register-sale.component.ts ~ line 174 ~ RegisterSaleComponent ~ postSale ~ year", year)


    let month = now.toLocaleString("es-ES", { month: "long" })
    console.log("date", now.toLocaleString("es-ES", { month: "long" }))
    month.charAt(0).toUpperCase() + month.slice(1);

    month = month.charAt(0).toUpperCase() + month.slice(1)
    // console.log("MESTRANS", month)

    const sale = {
      title: this.title,
      description: this.description,
      date: now,
      month: month,
      total: this.totalVentas,
      year: year,
      products: this.Products
    }

    // console.log("🚀 ~ file: register-sale.component.ts ~ line 148 ~ RegisterSaleComponent ~ postSale ~ sale", sale)

    if (this.title && this.description) {
      console.log("titlwe Existe y descripton")
      this.salesService.createSale(sale).subscribe({

        next: (res) => {
          this._snackBar.open("Venta registrada con exito!", "Cerrar", {
            duration: 3000,
          });
          this.router.navigate(['/sale']);

          this.editProduct()
        },

        error: (err) => {
          console.log("error", err)
        }
      })

    } else {
      this._snackBar.open("Ingrese todos los datos", "Cerrar", {
        duration: 2000,
      });
    }


  }
}
