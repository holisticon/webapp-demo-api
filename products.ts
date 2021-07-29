import * as faker from 'faker';

interface Product {
    _id: string;
    price: string;
    productDescription: string;
    productName: string;
    image: string;
}

export const products: Product[] = new Array(20).fill(null).map(() => ({
    _id: faker.datatype.uuid(),
    image: faker.image.imageUrl(350, 263, 'food'),
    price: faker.commerce.price(),
    productDescription: faker.commerce.productDescription(),
    productName: faker.commerce.productName()
}))