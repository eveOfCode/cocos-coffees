import { createAction, props } from "@ngrx/store";
import { Product } from "../product.model";

export const loadProducts = createAction(
  "[Products] Load Products"
);

export const loadProductsSuccess = createAction(
  "[Products] Load Products Success",
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  "[Products] Load Products Error",
  props<{ error: string }>()
);
