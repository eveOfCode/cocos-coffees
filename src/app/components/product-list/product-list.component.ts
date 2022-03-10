import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProducts } from 'src/app/state/store.actions';
import { selectAllProducts } from 'src/app/state/store.selectors';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/product.model';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, AfterViewInit {

  selectedCoffeeId: number;

  length = 10;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  displayedColumns: string[] = ['id', 'blend_name', 'origin', 'variety', 'intensifier', 'action'];

  dataSource = new MatTableDataSource<Product>([]); // using MatTableDataSource since it can work with MatPaginator to listen for page changes
  // allCoffeeProducts$: any = this.store.select(selectAllProducts);

  allCoffeeProducts$: any = this.store.select(selectAllProducts).subscribe(val => {
    this.dataSource.data = val
  });
  // retrieves the data from the store using the selectAllProducts selector then extracting from it to get the raw data
  // allCoffeeProducts$: any = this.store.select(selectAllProducts);
  // dataSource = new MatTableDataSource<Product>(this.allCoffeeProducts$);


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(loadProducts());
  }
  ngAfterContentChecked() {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // scroll(el: HTMLElement) {
  //   el.scrollIntoView({ behavior: 'smooth' });
  // }
}
