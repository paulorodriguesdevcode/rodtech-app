import { Customer } from "./customer"
import { Product } from "./product"

export class Order {
    id?: string
    totalValue?: number
    customer?: Customer
    customerId: string
    product?: Product
    productId: string
    createdAt?:string
    quantity: number
    isDeleted?: boolean

    constructor(id: string, product: Product, productId: string, totalValue: number, customer: Customer, customerId: string, quantity: number, createdAt: string) {
        this.id = id
        this.customer = customer
        this.product = product
        this.totalValue = totalValue
        this.customerId = customerId
        this.productId = productId
        this.quantity = quantity
        this.createdAt = createdAt
    }
}
