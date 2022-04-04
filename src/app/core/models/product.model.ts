import { Variation } from "./variation.model";

export interface Product {
    isActive: boolean;
    id: number;
    title: string;
    price: number;
    description: string;
    category: string
    image: string
    rating: {
        rate: number
        count: number
    },
    variation: Variation[]
}