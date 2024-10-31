export class Customer {
    id: string
    name: string
    email: string
    phone: string
    city: string
    createdAt?: string

    constructor(id:string, name: string, email: string, phone: string, city: string, createdAt:string) {
        this.id = id
        this.name = name
        this.email = email
        this.phone = phone
        this.city = city
        this.createdAt = createdAt
    }
}