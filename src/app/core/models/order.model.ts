interface productDetails{
    title:string
    image:string
    productId:number
    variation:object
    quantity:number
}

export interface Order{
    id:string,
    userid:number,
    products:productDetails[]
    payment:{
        subtotal:number
        shipping:number
    }
    address:string
    date:string
}