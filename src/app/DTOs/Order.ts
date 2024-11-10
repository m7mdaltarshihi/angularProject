import { Product } from "./Product"

export class Order {

    orderId!: number
    quantity!: number
    paymentMethod!: string
    shippingAddress!: string
    customerName!: string
    status!: string
    productid!: number
    date!: Date
    product!: Product
}