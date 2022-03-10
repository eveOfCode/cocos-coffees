import { createAction, props } from "@ngrx/store";
import { Product } from "../product.model";

export const loadProducts = createAction(
  "[Products] Load Products" // change to "[Product-List] Load Products"
);

export const loadProductsSuccess = createAction(
  "[Products] Load Products Success", // change to "[Product-List] Load Products Success"
  props<{ products: Product[] }>()
);

export const getCoffeeDetails = createAction(
  "[Products] Get Coffee Details",
  props<{ productId: number }>()
);
