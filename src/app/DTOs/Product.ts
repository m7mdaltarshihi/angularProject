import { Warehouse } from "./Warehouse"

export class Product {

    productId!: number
    name!: string
    price!: number
    sku!: string
    description?: string
    stock!: number
    image?: string
    warehouseId!: number
    warehouse?: Warehouse
}