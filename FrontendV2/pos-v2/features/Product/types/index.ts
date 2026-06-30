export type ProductsModel = {
  id: number;
  name: string;
  categoryName: string;
  description: string;
  imageUrl: string;
  barcode: string;
  fileId: number;
  quantity: number;
  price: number;
  cost: number;
  createdAt: string;
  totalCount: number;
}

export type ProductDetail = {
  id: number;
  name: string;
  price: number;
  cost: number;
  categoryId: number;
  imagePath: string;
}

export type Category = {
  id: number;
  name: string;
}
