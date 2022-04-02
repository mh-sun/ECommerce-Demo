interface productDetails{
    title:string
    image:string
    productId:number
    variation:object
    quantity:number
}

export interface Order{
    id:number,
    userid:number,
    products:productDetails[]
    payment:{
        subtotal:number
        shipping:number
    }
    address:string
    date:string
}