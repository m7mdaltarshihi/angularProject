import { Warehouse } from "./Warehouse"

export class User {
    userId!: string
    userName!: string
    email!: string
    roles!: any
    name!: string
    warehouseId?: number
    warehouse?: Warehouse
}