interface Variation{
    type : object
    quantity : number
}

export interface Cart{
    title: string;
    price: number;
    description: string;
    image: string
    variation: Variation[]
}