import { Repository } from "typeorm";
import datasource from "../db";
import Category, { CreateCategoryInput } from "../entities/category.entity";

export default class CategoryService {
  db: Repository<Category>;
  constructor() {
    this.db = datasource.getRepository(Category);
  }
  async findCategory(id: string) {
    const category = await this.db.findOneBy({ id });
    if (!category) {
      throw new Error("Cette catégorie n'existe pas");
    }
    return category;
  }
  async listCategories() {
    return this.db.find();
  }

  async createCategory({ name }: CreateCategoryInput) {
    const newCategory = this.db.create({ name });
    return await this.db.save(newCategory);
  }

  async deleteCategory(id: string) {
    const category = (await this.findCategory(id)) as Category;
    await this.db.remove(category);
    return { ...category, id };
  }

  async find(id: string) {
    const category = await this.db.findOne({
      where: { id },
      relations: { material: true },
    });
    if (!category) {
      throw new Error("La catégorie n'existe pas!");
    }
    return category;
  }
}
