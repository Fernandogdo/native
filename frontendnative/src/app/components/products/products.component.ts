import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Product } from 'src/app/interfaces/Product';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalEditProductComponent } from '../modal-edit-product/modal-edit-product.component';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dialogEditCategoria: MatDialogRef<ModalEditProductComponent>;


  displayedColumns: string[] = [ 'image','title', 'category', 'price', 'stock', 'opciones'];
  arregloProductos: Product[] = [];
  dataSource;

  constructor(
    public productsService:ProductsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getProducts()
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
  getProducts(){
    this.productsService.getProducts().subscribe(res=>{
      console.log("products",res)
      this.arregloProductos = res;
      this.dataSource = new MatTableDataSource(this.arregloProductos);
      this.dataSource.paginator = this.paginator;
    })
  }

  
  deleteProduct(idProduct:string){
    this.productsService.deleteProduct(idProduct).subscribe((res)=>{
      console.log("eliminar Prouct", res)
      this.getProducts()
    })
  }


  ModalEditCategory(id, title, category, description, price, stock){
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
