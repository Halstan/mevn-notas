import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const tipo = new Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre requerido'],
    },
    descripcion: String,
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
})

const Tipo = mongoose.model('Tipo', tipo)

export default Tipo;