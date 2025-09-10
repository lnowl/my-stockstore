export interface Product {
    id: number;
    name: string;
    sku: string;
    category: string;
    price: number;
    quantity: number;
    unit?: string;
    supplier: string;
}