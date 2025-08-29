export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  imagePath?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  name: string;
  price: number;
  description?: string;
  image?: File;
}


export interface FormErrors {
  name?: string;
  price?: string;
}

export interface UserFormEdit{
    firstName?: string;
    lastName?: string;
    phone?: string;
    dateOfBirth?: string;
    country?: string;
    state?: string;
}