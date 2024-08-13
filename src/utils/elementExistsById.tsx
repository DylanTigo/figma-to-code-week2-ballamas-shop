import { Product } from "../types/productTypes";

export function elementExistsById(list : Product[], id: string) : boolean {
  return list.some((item) => item.id === id);
}
