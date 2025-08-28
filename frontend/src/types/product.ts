export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  name: string;
  price: number;
  description?: string;
}


export interface FormErrors {
  name?: string;
  price?: string;
}