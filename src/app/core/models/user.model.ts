import { Order } from "./order.model"

interface CartProduct{
    productId: number
    variation: object
    quantity:number
}

export interface User{
    address: {
        geolocation: {
            lat: string
            long: string
        },
        city: string
        street: string
        number: number
        zipcode: string
    },
    id: number
    email: string
    username: string
    password: string
    name: {
        firstname: string
        lastname: string
    },
    phone: string
    cart : CartProduct[]
    orders : Order[]
}