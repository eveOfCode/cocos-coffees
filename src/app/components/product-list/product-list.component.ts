import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ProductListComponent implements OnInit, AfterViewInit {

  selectedCoffeeId: number;
  hideHeroImage = false;

  length = 10;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 50];
  displayedColumns: string[] = ['id', 'blend_name', 'origin', 'variety', 'intensifier', 'action'];

  dataSource = new MatTableDataSource<Product>([]); // using MatTableDataSource since it can work with MatPaginator to listen for page changes

  allCoffeeProducts$ = this.store.select(selectAllProducts).subscribe(val => { // used to get raw data for the table
    this.dataSource.data = val
  });

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private store: Store,
    private breakpointObserver: BreakpointObserver,
    private cd: ChangeDetectorRef
  ) { }

  applyBreakpoints() {
    // The observe method returns an observable of type BreakpointState and
    // can be used to observe when the viewport changes between matching a media query or not.
    this.breakpointObserver.observe([
      Breakpoints.XSmall, // (max-width: 599.98px)
      Breakpoints.Small, // (min-width: 600px) and (max-width: 959.98px)
      Breakpoints.Medium, // (min-width: 960px) and (max-width: 1279.98px)
    ])
      .subscribe(breakPointState => {
        this.hideHeroImage = breakPointState.matches;
        this.cd.markForCheck(); // call the markForCheck method to explicitely mark the view as changed after resizing window. This is needed to trigger the change detection.
      });
  }

  ngOnInit() {
    if (this.dataSource.data.length === 0)
      this.store.dispatch(loadProducts());

    this.applyBreakpoints();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
