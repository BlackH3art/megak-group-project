import { Schema, model } from 'mongoose';
import * as bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [/^\S+@\S+\.\S+$/.test, 'Provide a valid email address!'],
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: [3, 'Username must be at least 3 characters!'],
        maxLength: [30, 'Username cannot be longer than 30 characters!'],
    },
    password: {
        type: String,
        required: true,
        minLength: [5, 'Password must be at least 5 characters!'],
    },
    tasks: [],
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

export const User = model('User', userSchema);