import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import {Router} from '@angular/router'

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-modal-category',
  templateUrl: './modal-category.component.html',
  styleUrls: ['./modal-category.component.scss']
})
export class ModalCategoryComponent implements OnInit {

  photoSelected: string | ArrayBuffer;
  file: File;

  constructor(
    private categoriesService: CategoriesService, private router: Router
    ) { }

  ngOnInit(): void {
  }

  

  onPhotoSelected(event): void {
    const evento = event.target as HTMLInputElement
    if (evento.files && evento.files[0]) {
      this.file = <File>evento.files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  uploadPhoto(title: HTMLInputElement, description: HTMLTextAreaElement) {
    console.log("datos", title.value, description.value)
    this.categoriesService.createCategory(title.value, description.value, this.file).subscribe(
      res => console.log(res), 
      err => console.log(err)
    )
    return false;
  }
  
}
