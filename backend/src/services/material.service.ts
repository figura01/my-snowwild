import { validate } from "class-validator";
import { Repository } from "typeorm";
import datasource from "../db";
import Material, {
  CreateMaterialInput,
  UpdateMaterialInput,
} from "../entities/material.entity";
import CategoryService from "./category.service";

export default class MaterialService {
  db: Repository<Material>;
  constructor() {
    this.db = datasource.getRepository(Material);
  }
  async findMaterialById(id: string) {
    const material = await this.db.findOneBy({ id });
    if (!material) {
      throw new Error("Ce matériel n'existe pas");
    }
    return material;
  }

  async find(id: string) {
    const material = await this.db.findOne({
      where: { id },
      relations: { category: true },
    });
    return material;
  }

  async listMaterials() {
    return this.db.find();
  }

  async createMaterial(data: CreateMaterialInput) {
    const categoryToLink = await new CategoryService().find(data?.category?.id);
    if (!categoryToLink) {
      throw new Error("La catégorie n'existe pas!");
    }
    const newMaterial = this.db.create({
      ...data,
      category: categoryToLink,
    });
    const errors = await validate(newMaterial);
    console.log("ERRORS => ", errors);
    return await this.db.save(newMaterial);
  }

  async deleteMaterial(id: string) {
    const material = (await this.find(id)) as Material;
    await this.db.remove(material);
    return { ...material, id };
  }

  async updateMaterial(id: string, data: Omit<UpdateMaterialInput, "id">) {
    if (!data.category) return null;
    const categoryToLink = await new CategoryService().find(data?.category.id);

    const materialToUpdate = await this.find(id);
    if (!materialToUpdate) {
      throw new Error("L'annonce n'existe pas!");
    }

    const materialToSave = this.db.merge(materialToUpdate, {
      ...data,
      category: categoryToLink,
    });

    const errors = await validate(materialToSave);
    if (errors.length !== 0) {
      console.log(errors);
      throw new Error("il y a eu une erreur");
    }

    return await this.db.save(materialToSave);
  }
}
