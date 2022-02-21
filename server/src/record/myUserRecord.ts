import {MyUserType} from "../types/myUserType";
import { Users } from "../models/MyUserModel";



export class MyUserRecord {

    public static async createUser(newUserObj:MyUserType): Promise<void> {
      return await Users.create(newUserObj);
    }

    public static async getOne(id: string): Promise<MyUserType> {
      return await Users.findById(id);
    }

    public static async findByEmail(email: string): Promise<MyUserType> {
      return Users.findOne({ email }).lean();
    }

    public static async deleteUser(id: string): Promise<void> {
      await Users.findByIdAndDelete(id);
    }

}
