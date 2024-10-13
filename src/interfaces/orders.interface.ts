import { resultProduct } from "../types/types"

export interface ProductBought {
  id: string
  quantity: number
  product: resultProduct
}

export interface Order {
  id: string
  bought_at: string
  total: number
  products_includes: ProductBought[]
}