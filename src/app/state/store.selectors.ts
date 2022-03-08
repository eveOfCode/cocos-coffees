import { createSelector, createFeatureSelector } from '@ngrx/store';
import { StoreState } from './store.reducer';
import { AppState } from './app.state';

// export const selectStore = createFeatureSelector<StoreState>('store');
export const selectStore = (state: AppState) => state.store;

export const selectAllProducts = createSelector(
  selectStore,
  (state: StoreState) => {
    return state.products;
  }
)

