import User, { InputRegister } from "../entities/user.entity";
import { Repository } from "typeorm";
import datasource from "../db";

export default class UserService {
  db: Repository<User>;
  constructor() {
    this.db = datasource.getRepository(User);
  }
  async findUser(id: string) {
    const user = await this.db.findOneBy({ id });
    if (!user) {
      throw new Error("Ce matériel n'existe pas");
    }
    return user;
  }

  async listUser() {
    return this.db.find();
  }

  async findUserByEmail(email: string ){
    return await this.db.findOneBy({email})
  }

  async createUser({ email, password, lastName, firstName, phone }: InputRegister) {
    const newUser = this.db.create({ email, password, lastName, firstName, phone });
    return await this.db.save(newUser);
  }

  async deleteUser(id: string) {
    const user = (await this.findUser(id)) as User;
    await this.db.remove(user);
    return { ...user, id };
  }
}