import { ProductModel } from "../../products/models/product.model";

export class OrderModel{
    _id: string = "";
    userId: string = "";
    productId: string = "";
    products: ProductModel[]=[];
    price: number=0;
    quantity: number = 0;
    createdDate: string = "";
}