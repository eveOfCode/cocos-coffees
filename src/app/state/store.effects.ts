import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from } from 'rxjs';
import { map, mergeMap, switchMap} from 'rxjs/operators';
import { CoffeeService } from '../services/coffee.service';
import { loadProductsSuccess, loadProducts } from './store.actions'


@Injectable()
export class StoreEffects {
  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(loadProducts),
    mergeMap(() =>
      from(this.coffeeService.getCoffeeProducts()).pipe(
        map((products: any) => loadProductsSuccess({  products }))
      )
    )

  ));
  constructor(
    private actions$: Actions,
    private coffeeService: CoffeeService,
  ) { }
}
