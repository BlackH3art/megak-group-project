import { MyUserInterface } from "../types/myUserInterface";
import { Users } from "../models/MyUserModel";



export class MyUserRecord {

    public static async createUser(newUserObj:MyUserInterface): Promise<void> {
      await Users.create(newUserObj);
    }

    public static async getOne(id: string): Promise<MyUserInterface> {
      return await Users.findById(id);
    }

    public static async findByEmail(email: string): Promise<MyUserInterface> {
      return Users.findOne({ email }).lean();
    }

    public static async deleteUser(id: string): Promise<void> {
      await Users.findByIdAndDelete(id);
    }

}
