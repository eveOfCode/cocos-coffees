import { createReducer, on } from "@ngrx/store";
import { Product } from "../product.model";
import { loadProducts, loadProductsSuccess, getCoffeeDetails } from "./store.actions";

export interface StoreState {
  products: Product[];
}

export const initialState: StoreState = {
  products: [],
}

export const storeReducer = createReducer(
  initialState,
  on(loadProducts, (state) => ({...state})),
  on(loadProductsSuccess, (state, { products }) => ({...state, products})),
  on(getCoffeeDetails, (state, { productId }) => ({...state, products: state.products.map(product => product.id === productId ? {...product, showDetails: true} : product)})),
);
