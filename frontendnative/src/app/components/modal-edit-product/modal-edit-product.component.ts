import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { Product } from "../../interfaces/Product";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-modal-edit-product',
  templateUrl: './modal-edit-product.component.html',
  styleUrls: ['./modal-edit-product.component.scss']
})
export class ModalEditProductComponent implements OnInit {


  // public dialogRef: MatDialogRef<ModalEditProductComponent>

  idProduct: string;
  titleProduct: string;
  categoryProduct: string;
  descriptionProduct: string;
  priceProduct: number;
  stockProduct: number;
  arrayCategories;
  product: Product;

  constructor(
    public dialogRef: MatDialogRef<ModalEditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getCategories()
    console.log("sadsad", this.data.idProduct, this.data.category, this.data.title, this.data.description, this.data.price, this.data.stock)
    this.idProduct = this.data.idProduct;
    this.titleProduct = this.data.title;
    this.categoryProduct = this.data.category._id,
      this.descriptionProduct = this.data.description
    this.priceProduct = this.data.price;
    this.stockProduct = this.data.stock

    this.getProduct();

  }


  getProduct() {
    this.productsService.getProduct(this.idProduct).subscribe((res) => {
      console.log("product", res)
      this.product = res
    })
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe((res) => {
      console.log("categorias", res)
      this.arrayCategories = res
    })
  }



  updateProduct(title: HTMLInputElement, price: HTMLInputElement, stock: HTMLInputElement, description: HTMLTextAreaElement) {

    const producUpdated = {
      title: title.value,
      category: this.categoryProduct,
      description: description.value,
      price: price.value,
      stock: stock.value,
    }
    console.log("🚀 ~ file: modal-edit-product.component.ts ~ line 103 ~ ModalEditProductComponent ~ updateProduct ~ producUpdated", producUpdated)


    this.productsService.updateProduct(this.idProduct, producUpdated).subscribe({
      next: (res) => {
        console.log("res", res)
        this._snackBar.open("Producto actualizado", "Cerrar", {
          duration: 3000,
        });
      },

      error: (e) => {
        console.log(e)
      }

    })





    this.onNoClick()

  }

  onNoClick(): void {
    // console.log("empezado a cerrar")
    this.dialogRef.close();
  }

}
