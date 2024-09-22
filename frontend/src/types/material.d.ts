import { Category } from "./category";

export interface Material {
  imageUrl: string | undefined;
  name: string!;
  picture: string!;
  id: string!;
  description: string!;
  category: Category;
  price: number!;
  sizes:Size[];
}
export interface Size {
  size: string!;
  quantity: number!;
}
export interface MaterialQuery {
  listMaterials: Material[];
  findMaterialByCategories: Material[]; 
}
