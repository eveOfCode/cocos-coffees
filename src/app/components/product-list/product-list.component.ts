import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { Store } from '@ngrx/store';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { selectAllProducts } from 'src/app/state/store.selectors';
import { loadProducts } from 'src/app/state/store.actions';
import { Product } from 'src/app/product.model';
import { Observable, of, BehaviorSubject} from 'rxjs';
// import { ChangeDetectionStrategy} from '@angular/compiler';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ProductListComponent implements OnInit, AfterViewInit {

  selectedCoffeeId: number;
  // hideHeroImage$ = new Observable<boolean>(observer => { observer.next(false); });
  hideHeroImage$ = new BehaviorSubject<boolean>(false);
  // hideHeroImage = false;

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
    private responsive: BreakpointObserver,
    private cd: ChangeDetectorRef
  ) { }

  currentBreakpoint(bool) {
    this.hideHeroImage$.next(bool)
    console.log(bool);

    // this.hideHeroImage$.next(!this.hideHeroImage$.getValue())
  }
  applyBreakpoints() {
    // responsive response UI changes logic
    this.responsive.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
    ])
      .subscribe(result => {
        // this.hideHeroImage = result.matches; // will set the hideHeroImage to true or false depending on the current breakpoint
        this.currentBreakpoint(result.matches);
        // this.cd.markForCheck(); // call the markForCheck method to explicitely mark the view as changed after resizing window
      });
  }

  ngOnInit() {
    this.store.dispatch(loadProducts());
    this.applyBreakpoints();

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
