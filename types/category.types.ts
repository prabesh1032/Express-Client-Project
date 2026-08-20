export type Category = {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CategoryInput = {
  name: string;
  description: string;
  image?: FileList;
};
