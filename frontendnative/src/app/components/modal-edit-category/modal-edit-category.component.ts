import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categorie } from 'src/app/interfaces/Category';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-modal-edit-category',
  templateUrl: './modal-edit-category.component.html',
  styleUrls: ['./modal-edit-category.component.scss']
})
export class ModalEditCategoryComponent implements OnInit {

  constructor(
    private categoriesService: CategoriesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalEditCategoryComponent>,
    private _snackBar: MatSnackBar

  ) { }

  idCategoria: string;
  category: Categorie

  ngOnInit(): void {
    console.log("DATACATEGORIA", this.data.idCategoria)
    this.idCategoria = this.data.idCategoria
    this.getProduct()
  }

  getProduct() {
    this.categoriesService.getCategory(this.idCategoria).subscribe((res) => {
      this.category = res;
      console.log("DATOSCATEGORIAEDITAR", res)
    })
  }

  updateCategory(title: HTMLInputElement, description: HTMLTextAreaElement) {
    // console.log("editado", title, description)
    this.categoriesService.updateCategory(this.idCategoria, title.value, description.value).subscribe({
      next: (res) => {
        console.log("editadoCategory", res)
        this._snackBar.open("Categoria editada correctamente", "Cerrar", {
          duration: 3000,
        });

      },
      error: (e) => {
        console.log(e);

      }
    })

    this.onNoClick();

    // return false;
  }


  onNoClick(): void {
    console.log("empezado a cerrar")
    this.dialogRef.close();
  }




}
