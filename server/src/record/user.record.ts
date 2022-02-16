import {UserType} from "../types/userType";
import {TaskType} from "../types/taskType";
import {User} from "../models/user";
import { ValidationError } from "../../utils/errors";

// nasz user ma tylko te 4 właściwości, tasks będzie tablicą obiektów
export class UserRecord {
    // dodawanie użytkownika do bazy danych
    public async createUser(newUserObj:UserType): Promise<void> {
        await User.create(newUserObj)
    }
    // pobieranie jednego użytkownika poprzez jego ID
    public static async getOne(id: string): Promise<UserType> {
        return await User.findById(id)
    }

// pobieranie wszystkich użytkowników
    public static async getAll(): Promise<UserType[]> {
        return await User.find()
    }

// usunięcie użytkownika po id
    public static async deleteUser(id: string): Promise<void> {
        await User.findByIdAndDelete(id)
    }
// edycja użytkownika
    public static async editUser(id:string,newUserObj:UserType):Promise<UserType>{
        const editedUser = newUserObj
        let user = await User.findById(id)
        user = {
            ...user,
            ...editedUser
        }
        await user.save()
        return user
    }
}
