import Category from "./../entities/category.entity";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import CategoryService from "../services/category.service";
import { CreateCategoryInput } from "../entities/category.entity";

@Resolver()
export default class CategoryResolver {
  @Query(() => [Category])
  async categories() {
    return await new CategoryService().listCategories();
  }

  @Query(() => Category)
  async findCategory(@Arg("id") id: string) {
    return await new CategoryService().findCategory(id);
  }

  @Mutation(() => Category)
  async createCategory(@Arg("data") data: CreateCategoryInput) {
    const newCategory = await new CategoryService().createCategory({ ...data });
    return newCategory;
  }

  //   @Authorized(["admin"])
  @Mutation(() => Category)
  async deleteCategory(@Arg("id") id: string) {
    const categoryDeleted = await new CategoryService().deleteCategory(id);
    return categoryDeleted;
  }
}
