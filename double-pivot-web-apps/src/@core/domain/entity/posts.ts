import { Category } from "./category"

export interface Posts {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  content: string;
  images: string;
  category: Category;
}
