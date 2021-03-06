import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Product } from 'src/app/product.model';
import { selectCoffeeProductByID } from 'src/app/state/store.selectors';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {

  // @Input() coffeeProductId: number | undefined = 3; // Not in use

  ID: number = +this.route.snapshot.paramMap.get('id') as number;

  coffeeData: Product;
  selectedCoffeeProduct$ = this.store.select(selectCoffeeProductByID(this.ID)).subscribe(val => { this.coffeeData = val; }); // used to get raw data for the table

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (!this.coffeeData) this.router.navigate(['/product-list']);
  }
}
