export interface Cart{
    id:number
    productId:number
    title: string;
    total: {
        price:number
        shipping:number
        discount:number
    };
    description: string;
    image: string
    variation: object
    quantity : number
}