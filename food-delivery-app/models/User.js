import { Schema, model } from 'mongoose';
// import bycrypt from "bcrypt";
// const { hash, compare, genSalt } = bycrypt;

import bcrypt from 'bcrypt';




const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: {type: String, required: false, unique: false},
    password: { type: String, required: true },
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

export default model('User', UserSchema);
