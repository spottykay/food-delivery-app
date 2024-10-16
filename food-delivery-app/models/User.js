import { Schema, model } from 'mongoose';
import bycrypt from "bcrypt";
const { hash, compare, genSalt } = bycrypt;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: {type: String, required: false, unique: false},
    password: { type: String, required: true }
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
});


UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await compare(candidatePassword, this.password);
    return isMatch;
};

export default model('User', UserSchema);
