import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { selectAllProducts } from 'src/app/state/store.selectors';
import { loadProducts } from 'src/app/state/store.actions';
import { Product } from 'src/app/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, AfterViewInit {

  selectedCoffeeId: number;
  hideHeroImage = false;

  length = 10;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  displayedColumns: string[] = ['id', 'blend_name', 'origin', 'variety', 'intensifier', 'action'];

  dataSource = new MatTableDataSource<Product>([]); // using MatTableDataSource since it can work with MatPaginator to listen for page changes

  allCoffeeProducts$ = this.store.select(selectAllProducts).subscribe(val => { // used to get raw data for the table
    this.dataSource.data = val
  });

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private store: Store,
    private responsive: BreakpointObserver
  ) { }

  ngOnInit() {
    this.store.dispatch(loadProducts());

    // responsive response UI changes logic
    this.responsive.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
    ])
      .subscribe(result => {
        this.hideHeroImage = result.matches;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
