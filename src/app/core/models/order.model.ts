interface productDetails{
    productId:number
    variation:object
    quatity:number
}

export interface Order{
    id:number
    userid:number
    products:productDetails[]
    payment:{
        subtottal:number
        shipping:number
        // discount:number
    }
    address:string
    date:string
}