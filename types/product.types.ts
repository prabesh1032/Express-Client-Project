import { Brand } from "./brand.types";
import { Category } from "./category.types";

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string;
  brand: Brand | string;
  category: Category | string;
  createdAt?: string;
  updatedAt?: string;
};

export type ProductInput = {
  name: string;
  description: string;
  price: number;
  stock: number;
  brand: string;
  category: string;
  image?: FileList;
};
