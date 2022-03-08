import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProducts } from 'src/app/state/store.actions';
import { selectAllProducts } from 'src/app/state/store.selectors';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  sxs = 123;
  allCoffeeProducts$: any = this.store.select(selectAllProducts);

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(loadProducts());
    console.log('allCoffeeProducts$', this.allCoffeeProducts$.pipe());

  }
}
