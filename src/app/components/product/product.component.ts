import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from 'src/app/product.model';
import { getCoffeeDetails } from 'src/app/state/store.actions';
import { Store } from '@ngrx/store';
import { selectCoffeeProductByID } from 'src/app/state/store.selectors';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() coffeeProductId: number | undefined = 3;

  ID: number = +this.route.snapshot.paramMap.get('id') as number;

  coffeeData: Product;
  selectedCoffeeProduct$ = this.store.select(selectCoffeeProductByID(this.ID)).subscribe(val => { this.coffeeData = val; });
  // selectedCoffeeProduct$ = this.store.select(selectCoffeeProductByID(this.ID)).subscribe(val => { this.coffeeData = val; });

  constructor(private route: ActivatedRoute,
    private router: Router, private store: Store) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (!this.coffeeData) this.router.navigate(['/product-list']);
  }

}
