export interface productDetails{
    title:string
    image:string
    productId:number
    variation:object
    quantity:number
}

export interface Order{
    id:string,
    userId:number,
    products:productDetails[]
    payment:{
        subtotal:number
        shipping:number
    }
    address:string
    date:string
    status:string
    phone:string
    email:string
}