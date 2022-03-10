import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { map, mergeMap, catchError} from 'rxjs/operators';

import { CoffeeService } from '../services/coffee.service';
import { loadProductsSuccess, loadProducts, loadProductsFailure } from './store.actions'

@Injectable()
export class StoreEffects {
  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(loadProducts),
    mergeMap(() =>
      from(this.coffeeService.getCoffeeProducts()).pipe(
        map((products: any) => loadProductsSuccess({  products })),
        catchError((error) => of(loadProductsFailure({ error: error })))
      )
    )

  ));
  constructor(
    private actions$: Actions,
    private coffeeService: CoffeeService,
  ) { }
}
