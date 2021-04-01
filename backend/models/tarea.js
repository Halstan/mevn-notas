import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const tarea = new Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre obligatorio'],
    },
    tipo: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Tipo'
    },
    descripcion: String,
    fechaRegistro: {
        type: Date,
        default: Date.now
    },
    isActivo: {
        type: Boolean,
        default: true
    }
})

const Tarea = mongoose.model('Tarea', tarea);

export default Tarea;