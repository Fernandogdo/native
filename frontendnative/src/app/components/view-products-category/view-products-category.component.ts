import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material/dialog";
import * as _ from "lodash";
import { ActivatedRoute } from '@angular/router';
import { ModalEditProductComponent } from '../modal-edit-product/modal-edit-product.component';



@Component({
  selector: 'app-view-products-category',
  templateUrl: './view-products-category.component.html',
  styleUrls: ['./view-products-category.component.scss']
})
export class ViewProductsCategoryComponent implements OnInit {

  dialogEditCategoria: MatDialogRef<ModalEditProductComponent>;


  categoryProduct;


  arrayProductsCategory;
  constructor(
    private productsService:ProductsService,
    private route: ActivatedRoute,
    private dialog: MatDialog


  ) { }

  ngOnInit(): void {
    this.categoryProduct = this.route.snapshot.params["category"];
    this.getProducts();

  }


  getProducts(){
    this.productsService.getProducts().subscribe((res)=>{
      console.log("resProductts", res)
      this.arrayProductsCategory = res;
      this.arrayProductsCategory = _.filter(this.arrayProductsCategory, ['category', this.categoryProduct])
      console.log("resProducttsFilter", this.arrayProductsCategory)

    })
  }


  ModalEditProduct(id, title, category, description, price, stock){
    this.dialogEditCategoria = this.dialog.open(ModalEditProductComponent, {
      data: {
        idProduct: id,
        title: title,
        category: category,
        description: description,
        price: price,
        stock: stock
        // img: img
      }
    });
    this.dialogEditCategoria.afterClosed().subscribe(()=> {
      this.getProducts();
    });

  }


}
