import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/interfaces/Product';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalEditProductComponent } from '../modal-edit-product/modal-edit-product.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dialogEditCategoria: MatDialogRef<ModalEditProductComponent>;


  displayedColumns: string[] = ['image', 'title', 'category', 'price', 'stock', 'opciones'];
  arregloProductos: Product[] = [];
  dataSource;

  constructor(
    public productsService: ProductsService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getProducts()
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  getProducts() {
    this.productsService.getProducts().subscribe(res => {
      console.log("products", res)
      this.arregloProductos = res;
      this.dataSource = new MatTableDataSource(this.arregloProductos);
      this.dataSource.paginator = this.paginator;
    })
  }


  deleteProduct(idProduct: string, titleProduct) {
    this.productsService.deleteProduct(idProduct).subscribe({
      next: (res) => {
        console.log(res);
        this.getProducts()
        this._snackBar.open("Producto " + titleProduct + " eliminado" , "Cerrar", {
          duration: 3000,
        });
      },

      error: (e) => {
        console.log(e)
      }
    })
  }


  ModalEditProduct(id, title, category, description, price, stock) {
    console.log("category", category)
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
    this.dialogEditCategoria.afterClosed().subscribe(() => {
      this.getProducts();
    });

  }


}
