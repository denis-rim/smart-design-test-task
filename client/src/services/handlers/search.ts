import { api } from "../apiClient";
import { ProductModel } from "./product";

export function searchByKeyword(searchKeyword: string) {
  return api.get<null, { data: ProductModel[] }>(
    `/products/search/?keyword=${searchKeyword}`
  );
}

export function searchByFilterQuery(searchByFilterQuery: string) {
  return api.get<null, { data: ProductModel[] }>(
    `/products/search/?${searchByFilterQuery}`
  );
}
