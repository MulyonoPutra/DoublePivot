import { Category } from "../../entity/category";

export interface PostResponse {
  createdBy: string;
  createdDate: string;
  updateBy: string;
  updateDate: string;
  id: string;
  title: string;
  subtitle: string;
  content: string;
  author: string;
  images: string;
  category: Category;
}
