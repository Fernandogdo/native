import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import * as _ from "lodash";
import { ActivatedRoute } from '@angular/router';
import { ModalEditProductComponent } from '../modal-edit-product/modal-edit-product.component';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-view-products-category',
  templateUrl: './view-products-category.component.html',
  styleUrls: ['./view-products-category.component.scss']
})
export class ViewProductsCategoryComponent implements OnInit {

  dialogEditCategoria: MatDialogRef<ModalEditProductComponent>;
  categoryProduct;
  categoryTitle;
  categoryId;
  products = [];

  arrayProductsCategory;
  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.categoryProduct = this.route.snapshot.params["categoryID"];
    console.log("🚀 ~ file: view-products-category.component.ts ~ line 41 ~ ViewProductsCategoryComponent ~ ngOnInit ~ this.categoryProduct", this.categoryProduct)
    this.getCategory();
    this.getProducts();

  }

  // Get Category
  getCategory() {
    this.categoriesService.getCategory(this.categoryProduct).subscribe((res) => {
      // console.log("category", res.title)
      this.categoryTitle = res.title

    })
  }

  // Get Product
  getProducts() {
    this.productsService.getProducts().subscribe((res) => {
      this.arrayProductsCategory = res;
      console.log("🚀 ~ file: view-products-category.component.ts ~ line 51 ~ ViewProductsCategoryComponent ~ this.productsService.getProducts ~ res", res)

      this.arrayProductsCategory = this.arrayProductsCategory.filter(product => product.category._id == this.categoryProduct);

    });
  }


  // Modal Edit Product
  ModalEditProduct(id, title, category, description, price, stock) {
    console.log("categoryViewProduct", category)
    this.dialogEditCategoria = this.dialog.open(ModalEditProductComponent, {
      data: {
        idProduct: id,
        title: title,
        category: category,
        description: description,
        price: price,
        stock: stock
      }
    });
    this.dialogEditCategoria.afterClosed().subscribe(() => {
      this.getProducts();
    });
  }


  //Delete Product
  deleteProduct(idProduct, titleProduct) {
    console.log("idProduct", idProduct)
    this.productsService.deleteProduct(idProduct).subscribe({
      next: (res) => {
        console.log(res)
        this._snackBar.open("Producto " + titleProduct + " eliminado", "Cerrar", {
          duration: 2000,
        });
        this.getProducts();

      },
      error: (e) => {
        console.log(e)
      }
    });
  }


}
