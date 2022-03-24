import { Component, OnInit, ViewChild} from '@angular/core';
import { SalesService } from 'src/app/services/sales/sales.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
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
  arraySalesEnero: Sale[] = [];
  arraySalesFebrero: Sale[] = [];
  arraySalesMarzo: Sale[] = [];
  dataSource;
  pipe = new DatePipe('en-US');
  opcionSeleccionada;
  totalVentas: number;


  meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'
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
    this.salesService.getProducts().subscribe((res) => {
      // console.log("🚀 ~ file: sale.component.ts ~ line 28 ~ SaleComponent ~ getSales ~ res", res)
      this.arraySales = res;
      console.log("🚀 ~ file: sale.component.ts ~ line 36 ~ SaleComponent ~ this.salesService.getProducts ~ this.arraySales", this.arraySales)
      
      this.dataSource = new MatTableDataSource(this.arraySales);
      
      this.dataSource.paginator = this.paginator;
    })
  }

  filtro($event) {
    console.log("MONTH",$event);

    if ($event == 'Enero') {
      console.log("MES DE ENERO")
      this.arraySalesEnero = _.filter(this.arraySales, ['month', 'Enero'])
      console.log("🚀 ~ file: sale.component.ts ~ line 61 ~ SaleComponent ~ filtro ~ arraySales", this.arraySalesEnero)
      this.dataSource = new MatTableDataSource(this.arraySalesEnero);
      this.dataSource.paginator = this.paginator;
    }

    if ($event == 'Febrero') {
      console.log("MES DE FEBRERO", this.arraySales)
      this.arraySalesFebrero = _.filter(this.arraySales, ['month', 'Febrero'])
      console.log("🚀 ~ file: sale.component.ts ~ line 69 ~ SaleComponent ~ filtro ~ this.arraySales", this.arraySalesFebrero)
      this.dataSource = new MatTableDataSource(this.arraySalesFebrero);
      this.dataSource.paginator = this.paginator;
    }
    
    if ($event == 'Marzo') {
      console.log("MES DE MARZO")
      this.arraySalesMarzo = _.filter(this.arraySales, ['month', 'Marzo'])
      console.log("🚀 ~ file: sale.component.ts ~ line 77 ~ SaleComponent ~ filtro ~ this.arraySales", this.arraySalesMarzo)
      this.dataSource = new MatTableDataSource(this.arraySalesMarzo);
      this.dataSource.paginator = this.paginator;
    }
   
  }


  getTotalCost() {
    this.totalVentas = this.arraySales.map(t => t.total).reduce((acc, value) => acc + value, 0);
    return this.totalVentas;
  }

}
