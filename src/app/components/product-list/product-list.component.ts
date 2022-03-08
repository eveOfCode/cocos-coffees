import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProducts } from 'src/app/state/store.actions';
import { selectAllProducts } from 'src/app/state/store.selectors';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Product } from 'src/app/product.model';
import {PageEvent} from '@angular/material/paginator';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {

  allCoffeeProducts$: any = this.store.select(selectAllProducts); // retrieves the data from the store using the selectAllProducts selector
  length = 10;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  displayedColumns: string[] = ['id','blend_name', 'origin', 'variety', 'intensifier'];

  // dataSource = this.allCoffeeProducts$;
  dataSource: MatTableDataSource<Product>; // using MatTableDataSource since it can work with MatPaginator to listen for page changes

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private store: Store) {}

  updateCoffeeProductsView() {

  }

  ngOnInit() {
    this.store.dispatch(loadProducts());
    this.dataSource = this.allCoffeeProducts$;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    console.log("this.dataSource", this.dataSource);
    console.log("this.dataSource.paginator", this.dataSource.paginator);
    console.log("this.paginator.page", this.paginator.page.emit);
    console.log("this.paginator.length", this.paginator.length);
  }
}
