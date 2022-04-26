export interface User{
    address: {
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
    carts : number[]
    orders : string[]
}