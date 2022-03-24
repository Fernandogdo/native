import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Categorie } from 'src/app/interfaces/Category';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-modal-edit-category',
  templateUrl: './modal-edit-category.component.html',
  styleUrls: ['./modal-edit-category.component.scss']
})
export class ModalEditCategoryComponent implements OnInit {

  constructor(
    private categoriesService:CategoriesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  idCategoria: string;
  category: Categorie

  ngOnInit(): void {
    console.log("DATACATEGORIA", this.data.idCategoria)
    this.idCategoria = this.data.idCategoria
    this.getProduct()
  }

  getProduct(){
    this.categoriesService.getCategory(this.idCategoria).subscribe((res)=>{
      this.category = res;
      console.log("DATOSCATEGORIAEDITAR", res)
    })
  }

  updateCategory(title:HTMLInputElement, description: HTMLTextAreaElement): boolean{
    // console.log("editado", title, description)
    this.categoriesService.updateCategory(this.idCategoria, title.value, description.value).subscribe((res)=>{
      console.log("editadoCategory", res)
    })
    return false;
  }



  

}
