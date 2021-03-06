import { Schema, model } from 'mongoose';
import { validateEmail } from "../../utils/validateEmail";
import * as bcrypt from 'bcrypt';
import { myTaskSchema } from './MyTaskModel';
import { MyUserInterface } from 'src/types/myUserInterface';

const userSchema = new Schema<MyUserInterface>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validateEmail, 'Invalid email format']
        // validate: [/^\S+@\S+\.\S+$/.test, 'Provide a valid email address!'],
    },
    password: {
        type: String,
        required: true,
        minLength: [5, 'Password must be at least 5 characters!'],
    },
    tasks: [myTaskSchema],
});

/**
 * funkcja wywoływana przed zapisem do bazy - hashuje wprowadzone hasło
 * w przypadku gdy nie zostało ono zmienione np. przy edycji profilu użytkownika, funkcja kończy działanie
 */
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});



/**
 * metoda porównująca wprowadzone hasło z hashem przechowywanym w bazie danych - zwraca boolean
 */
userSchema.methods = {
    async checkPassword(password: string): Promise<boolean> {
        return (await bcrypt.compare(password, this.password));
    },
};
export const Users = model<MyUserInterface>('Users', userSchema);
