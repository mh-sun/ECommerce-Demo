interface productDetails{
    title:string
    image:string
    productId:number
    variation:object
    quantity:number
}
export interface orderAdmin{
  
    id:string,
    name:string,
    products:productDetails[]
    payment:{
        subtotal:number
        shipping:number
    }
    address:string,
    date:string,
    status:string
}