export interface Product {
  id?: number;
  description: string;
  price: number;
  available: string;
  imageUrl: string;
  rating: number;
}

export interface ProductsResponse {
  products: Product[];
}

export interface SingleProductResponse {
  product: Product;
}
