export interface productDetails{
    title:string
    image:string
    productId:number
    variation:object
    quantity:number
}

export interface Order{
    id:string,
    products:productDetails[]
    payment:{
        subtotal:number
        shipping:number
    }
    name:string
    address:string
    date:string
    status:string
    phone:string
    email:string
}