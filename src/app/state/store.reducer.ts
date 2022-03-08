import { createReducer, on } from "@ngrx/store";
import { Product } from "../product.model";
import { loadProducts, loadProductsSuccess } from "./store.actions";

export interface StoreState {
  products: Product[];
}

export const initialState: StoreState = {
  products: [],
}

export const storeReducer = createReducer(
  initialState,
  on(loadProducts, (state) => ({...state})),
  on(loadProductsSuccess, (state, { products }) => ({...state, products}))
);
