import { createSelector, createFeatureSelector } from '@ngrx/store';
import { StoreState } from './store.reducer';
import { AppState } from './app.state';

export const selectStore = (state: AppState) => state.store;

// select coffee product by id
export const selectCoffeeProductByID = (id: any) => createSelector(
  selectStore,
  (state: StoreState) => {
    return state.products.find(product => product.id === id);
  }
)
// select all coffee products
export const selectAllProducts = createSelector(
  selectStore,
  (state: StoreState) => {
    return state.products;
  }
)


