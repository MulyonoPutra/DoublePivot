import { Category } from './../../entity/category';

export interface PostPayload {
  title: string
  subtitle: string
  author: string
  content: string
  images: string
  category: Category
}
