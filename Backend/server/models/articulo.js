const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let articuloSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor ingresa el nombre del articulo']
    },
    modelo: {
        type: String,
        required: [true, 'Por favor ingresa el modelo o tipo de articulo']
    },
    categoria: {
        type: String,
        required: [true, 'Por favor ingresa la categoria']
    },
    cantidad: {
        type: Number,
        required: [true, 'ingresa la cantidad del producto en el stock']

    },
    descripcion: {
        type: String,
        required: [true, 'ingresa la descripcion del producto']

    },
    disponible: {
        type: Boolean,
        default: true

    },
    img: {
        type: String,
        //required: [true, 'Por favor ingresa la imagen del libro']
    }
});

articuloSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Articulp', articuloSchema);