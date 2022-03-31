interface productDetails{
    productId:number
    variation:object
    quatity:number
}

export interface Order{
    id:number
    products:productDetails[]
    payment:{
        subtottal:number
        shipping:number
    }
    address:string
    date:string
}