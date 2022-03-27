import { Component, OnInit, ViewChild } from '@angular/core';
import { SalesService } from 'src/app/services/sales/sales.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Sale } from "../../interfaces/Sale";
import * as _ from "lodash";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;


  displayedColumns: string[] = ['title', 'description', 'date', 'total', 'opciones'];
  arraySales: Sale[] = [];
  arraySalesMeses: Sale[] = [];
  // arraySalesMeses: Sale[] = [];

  // arraySalesMeses: Sale[] = [];
  // arraySalesMeses: Sale[] = [];
  dataSource;
  pipe = new DatePipe('en-US');
  opcionSeleccionada;
  totalVentas: number;


  meses = [
    'Todo', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
  ]

  constructor(
    private salesService: SalesService,
  ) { }

  ngOnInit(): void {
    this.getSales()
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getSales() {
    this.salesService.getSales().subscribe((res) => {
      // console.log("🚀 ~ file: sale.component.ts ~ line 28 ~ SaleComponent ~ getSales ~ res", res)
      this.arraySales = res;
      console.log("🚀 ~ file: sale.component.ts ~ line 36 ~ SaleComponent ~ this.salesService.getProducts ~ this.arraySales", this.arraySales)

      this.dataSource = new MatTableDataSource(this.arraySales);

      this.dataSource.paginator = this.paginator;
    })
  }

  filtro($event) {
    console.log("MONTH", $event);

    if ($event == 'Todo') {
      this.getSales()
    }

    if ($event == 'Enero') {
      console.log("MES DE ENERO")
      this.arraySalesMeses = _.filter(this.arraySales, ['month', 'Enero'])
      console.log("🚀 ~ file: sale.component.ts ~ line 61 ~ SaleComponent ~ filtro ~ arraySales", this.arraySalesMeses)
      this.dataSource = new MatTableDataSource(this.arraySalesMeses);
      this.dataSource.paginator = this.paginator;
    }

    if ($event == 'Febrero') {
      console.log("MES DE FEBRERO", this.arraySales)
      this.arraySalesMeses = _.filter(this.arraySales, ['month', 'Febrero'])
      console.log("🚀 ~ file: sale.component.ts ~ line 69 ~ SaleComponent ~ filtro ~ this.arraySales", this.arraySalesMeses)
      this.dataSource = new MatTableDataSource(this.arraySalesMeses);
      this.dataSource.paginator = this.paginator;
    }

    if ($event == 'Marzo') {
      console.log("MES DE MARZO")
      this.arraySalesMeses = _.filter(this.arraySales, ['month', 'Marzo'])
      console.log("🚀 ~ file: sale.component.ts ~ line 77 ~ SaleComponent ~ filtro ~ this.arraySales", this.arraySalesMeses)
      this.dataSource = new MatTableDataSource(this.arraySalesMeses);
      this.dataSource.paginator = this.paginator;
    }

    if ($event == 'Abril') {
      console.log("MES DE MARZO")
      this.arraySalesMeses = _.filter(this.arraySales, ['month', 'Abril'])
      console.log("🚀 ~ file: sale.component.ts ~ line 77 ~ SaleComponent ~ filtro ~ this.arraySales", this.arraySalesMeses)
      this.dataSource = new MatTableDataSource(this.arraySalesMeses);
      this.dataSource.paginator = this.paginator;
    }

    if ($event == 'Mayo') {
      console.log("MES DE MARZO")
      this.arraySalesMeses = _.filter(this.arraySales, ['month', 'Mayo'])
      console.log("🚀 ~ file: sale.component.ts ~ line 77 ~ SaleComponent ~ filtro ~ this.arraySales", this.arraySalesMeses)
      this.dataSource = new MatTableDataSource(this.arraySalesMeses);
      this.dataSource.paginator = this.paginator;
    }

    if ($event == 'Junio') {
      console.log("MES DE MARZO")
      this.arraySalesMeses = _.filter(this.arraySales, ['month', 'Junio'])
      console.log("🚀 ~ file: sale.component.ts ~ line 77 ~ SaleComponent ~ filtro ~ this.arraySales", this.arraySalesMeses)
      this.dataSource = new MatTableDataSource(this.arraySalesMeses);
      this.dataSource.paginator = this.paginator;
    }

    if ($event == 'Julio') {
      console.log("MES DE MARZO")
      this.arraySalesMeses = _.filter(this.arraySales, ['month', 'Julio'])
      console.log("🚀 ~ file: sale.component.ts ~ line 77 ~ SaleComponent ~ filtro ~ this.arraySales", this.arraySalesMeses)
      this.dataSource = new MatTableDataSource(this.arraySalesMeses);
      this.dataSource.paginator = this.paginator;
    }

    if ($event == 'Agosto') {
      console.log("MES DE MARZO")
      this.arraySalesMeses = _.filter(this.arraySales, ['month', 'Agosto'])
      console.log("🚀 ~ file: sale.component.ts ~ line 77 ~ SaleComponent ~ filtro ~ this.arraySales", this.arraySalesMeses)
      this.dataSource = new MatTableDataSource(this.arraySalesMeses);
      this.dataSource.paginator = this.paginator;
    }

    if ($event == 'Septiembre') {
      console.log("MES DE MARZO")
      this.arraySalesMeses = _.filter(this.arraySales, ['month', 'Septiembre'])
      console.log("🚀 ~ file: sale.component.ts ~ line 77 ~ SaleComponent ~ filtro ~ this.arraySales", this.arraySalesMeses)
      this.dataSource = new MatTableDataSource(this.arraySalesMeses);
      this.dataSource.paginator = this.paginator;
    }

    if ($event == 'Octubre') {
      console.log("MES DE MARZO")
      this.arraySalesMeses = _.filter(this.arraySales, ['month', 'Octubre'])
      console.log("🚀 ~ file: sale.component.ts ~ line 77 ~ SaleComponent ~ filtro ~ this.arraySales", this.arraySalesMeses)
      this.dataSource = new MatTableDataSource(this.arraySalesMeses);
      this.dataSource.paginator = this.paginator;
    }

    if ($event == 'Noviembre') {
      console.log("MES DE MARZO")
      this.arraySalesMeses = _.filter(this.arraySales, ['month', 'Noviembre'])
      console.log("🚀 ~ file: sale.component.ts ~ line 77 ~ SaleComponent ~ filtro ~ this.arraySales", this.arraySalesMeses)
      this.dataSource = new MatTableDataSource(this.arraySalesMeses);
      this.dataSource.paginator = this.paginator;
    }

    if ($event == 'Diciembre') {
      console.log("MES DE MARZO")
      this.arraySalesMeses = _.filter(this.arraySales, ['month', 'Diciembre'])
      console.log("🚀 ~ file: sale.component.ts ~ line 77 ~ SaleComponent ~ filtro ~ this.arraySales", this.arraySalesMeses)
      this.dataSource = new MatTableDataSource(this.arraySalesMeses);
      this.dataSource.paginator = this.paginator;
    }

  }


  deleteSale(id) {
    this.salesService.deleteSale(id).subscribe((res) => {
      console.log("eliminado", res)
      this.getSales()
    })
  }
  getTotalCostMonth() {
    // console.log("ARRAY", this.arraySalesMeses)
    this.totalVentas = this.arraySalesMeses.map(t => t.total).reduce((acc, value) => acc + value, 0);
    return this.totalVentas;
  }

  getTotalCost() {
    this.totalVentas = this.arraySales.map(t => t.total).reduce((acc, value) => acc + value, 0);
    return this.totalVentas;
  }



}
