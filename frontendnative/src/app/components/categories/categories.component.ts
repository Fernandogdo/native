import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalCategoryComponent } from '../modal-category/modal-category.component';
import { ModalEditCategoryComponent } from '../modal-edit-category/modal-edit-category.component';
import { ModalRegistroProductosComponent } from '../modal-registro-productos/modal-registro-productos.component';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  

  dialogCreateCategoria: MatDialogRef<ModalCategoryComponent>;
  dialogEditCategoria: MatDialogRef<ModalEditCategoryComponent>;
  dialogCreateProduct: MatDialogRef<ModalRegistroProductosComponent>;


  categorias:any = []

  constructor(
    private categoriesService:CategoriesService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCategories()
  }


  getCategories(){
    this.categoriesService.getCategories().subscribe((categories)=>{
      this.categorias = categories;
      console.log("categories", categories)
    });
  }

  ModalCreateCategoria(){
    this.dialogCreateCategoria = this.dialog.open(ModalCategoryComponent, {
      // data: {
      //   idCategoria: id,
      //   name: name,
      //   description: description,
      //   img: img
      // }
    });
    this.dialogCreateCategoria.afterClosed().subscribe(()=> {
      this.getCategories();
    });
  }


  ModalEditCategory(id, title, description){
    this.dialogEditCategoria = this.dialog.open(ModalEditCategoryComponent, {
      data: {
        idCategoria: id,
        title: title,
        description: description,
        // img: img
      }
    });
    this.dialogEditCategoria.afterClosed().subscribe(()=> {
      this.getCategories();
    });

  }

  ModalCreateProduct(idCategory, title){
    this.dialogCreateProduct = this.dialog.open(ModalRegistroProductosComponent, {
      data: {
        idCategoria: idCategory,
        title: title,
        // description: description,
        // img: img
      }
    });
    this.dialogCreateProduct.afterClosed().subscribe(()=> {
      this.getCategories();
    });

  }


  deleteCategory(id: string){
    console.log("IDAELIMINARCATEGORY", id)
    this.categoriesService.deleteCategory(id).subscribe((res)=>{
      console.log("Categoria eliminada", res)
      this.getCategories()
    })
  }


}
