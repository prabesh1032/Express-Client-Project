export type Brand = {
  _id: string;
  name: string;
  description?: string;
  logo?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type BrandInput = {
  name: string;
  description: string;
  logo?: FileList;
};

export type ApiResponse<T> = {
  message: string;
  data: T;
  success: boolean;
};
