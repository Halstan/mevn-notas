import mongoose from 'mongoose';
import uniqueValidator from "mongoose-unique-validator"
const Schema = mongoose.Schema;

const roles = {
    values: ['ADMIN', 'USER'],
    message: '{VALUE} rol no valido'
}

const user = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    email: {
        type: String,
        required: [true, "El email es obligatorio"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Contraseña obligatoria"]
    },
    role: {
        type: String,
        default: 'USER',
        enum: roles
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    }
});

user.plugin(uniqueValidator, { message: "Error, esperaba {PATH} único" });

user.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
}

const User = mongoose.model('User', user)

export default User