import {UserType} from "../types/userType";
import {TaskType} from "../types/taskType";
import {User} from "../models/user";

// nasz user ma tylko te 4 właściwości, tasks będzie tablicą obiektów
export class UserRecord {
    public email: string
    public userName: string
    public password: string
    public tasks: TaskType[]

    constructor(userObj: UserType) {
        this.email = userObj.email
        this.userName = userObj.userName
        this.password = userObj.password
        this.tasks = userObj.tasks


    }

    // dodawanie użytkownika do bazy danych
    public async createUser(): Promise<void> {
        const newUser = new User({
            email: this.email,
            userName: this.userName,
            password: this.password,
            tasks: this.tasks
        })
        await newUser.save()
    }
    // pobieranie jednego użytkownika poprzez jego ID
    public static async getOne(id: string): Promise<UserType> {
        const user = await User.findById(id)
        return new UserRecord(user)
    }

// pobieranie wszystkich użytkowników
    public static async getAll(): Promise<UserType[]> {
        const users = await User.find()
        return users.map(el => new UserRecord(el))
    }

// usunięcie użytkownika po id
    public static async deleteUser(id: string): Promise<void> {
        await User.findByIdAndDelete(id)
    }
// edycja użytkownika, nie wiem czy dobrze zrobiłem z tym rozbiciem obiektów, ale teoretycznie powinno działać
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
