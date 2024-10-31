export class Product {
    id: string;
    name: string;
    description: string;
    type: string;
    quantity: number;
    purchaseValue?: number;
    saleValue: number;
    purchaseDate: Date;

    constructor(
        id: string,
        name: string,
        description: string,
        type: string,
        quantity: number,
        purchaseValue: number,
        saleValue: number,
        purchaseDate: Date,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.quantity = quantity;
        this.purchaseValue = purchaseValue;
        this.saleValue = saleValue;
        this.purchaseDate = purchaseDate;
    }
}
