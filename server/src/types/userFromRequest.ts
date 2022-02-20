import {UserType} from './userType'
export interface UserFromRequest extends Request {
    user:UserType,
}