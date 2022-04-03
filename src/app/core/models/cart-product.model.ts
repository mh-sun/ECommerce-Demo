import { Product } from "./product.model";

export interface CartProduct{
    product: Product
    quantity: number
    variation: object
}