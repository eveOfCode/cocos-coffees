import { createReducer, on } from "@ngrx/store";
import { Product } from "../product.model";
import { loadProducts, loadProductsSuccess, loadProductsFailure } from "./store.actions";

export interface StoreState {
  products: Product[];
  error: string;
}

export const initialState: StoreState = {
  products: [],
  error: null,
}

export const storeReducer = createReducer(
  initialState,
  on(loadProducts, (state) => ({ ...state })),
  on(loadProductsSuccess, (state, { products }) => ({ ...state, products })),
  on(loadProductsFailure, (state, { error }) => ({ ...state, error }))
);
