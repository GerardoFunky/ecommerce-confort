export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  stock: number;
  specs?: Record<string, string>;
  createdAt: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  image: string;
  count: number;
}

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}
