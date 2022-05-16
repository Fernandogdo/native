import { Component, OnInit, ViewChild } from '@angular/core';
import { SalesService } from 'src/app/services/sales/sales.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Sale } from "../../interfaces/Sale";
import * as _ from "lodash";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['title', 'description', 'date', 'total', 'opciones'];
  arraySales: Sale[] = [];
  arraySalesYear: Sale[] = [];

  dataSource;
  opcionSeleccionada;
  totalVentas: number;
  yearActual;
  yearSelect;

  // meses = [
  //   'Todo', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  // ]


  years = [
    '2022', '2023', '2024', '2025'
  ]

  constructor(
    private salesService: SalesService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getSales()
    var currentTime = new Date();
    this.yearActual = currentTime.getFullYear()
    this.setIntrvl()
    this.yearSelect = currentTime.getFullYear()
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  //Get all the sales
  getSales() {
    this.salesService.getSales().subscribe({
      next: (res) => {
        this.arraySales = res;

        this.dataSource = new MatTableDataSource(this.arraySales);

        this.dataSource.paginator = this.paginator;
      },

      error: (err) => {
        console.log(err)
      }
    })
  }


  //Filter year
  filterYear($event) {
    this.yearSelect = parseInt($event)
    console.log('Anio aselect', this.yearSelect)
    this.arraySalesYear = _.filter(this.arraySales, ['year', this.yearSelect])
    this.dataSource = new MatTableDataSource(this.arraySalesYear);
    this.dataSource.paginator = this.paginator;
  }


  //Delere Sale for id of sale
  deleteSale(id, titleSale) {
    this.salesService.deleteSale(id).subscribe({
      next: (res) => {
        this._snackBar.open("Venta " + titleSale + " eliminada", "Cerrar", {
          duration: 3000,
        });
        this.getSales()
      },

      error: (err) => {
        console.log(err)
        this._snackBar.open("Error al eliminar venta " + titleSale, "Cerrar", {
          duration: 3000,
        });
      }
    })
  }


  //Get cost total for year of sale
  getTotalYear() {
    this.totalVentas = 0
    this.totalVentas = this.arraySalesYear.map(t => t.total).reduce((acc, value) => acc + value, 0);
    // console.log("🚀 ~ file: sale.component.ts ~ line 344 ~ SaleComponent ~ getTotalCost ~ this.totalVentas", this.totalVentas)

    return this.totalVentas;
  }

  //Refresh method filtroYear
  setIntrvl() {
    // console.log("EJECUTNDO LALA")
    setTimeout(() => this.filterYear(this.yearSelect), 200);
  }

}
