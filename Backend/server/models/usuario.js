const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'Por favor ingresa el nombre']
    },
    usuario: {
        type: String,
        unique: true,
        required: [true, 'Por favor ingresa el nombre del usuario']
    },
    password: {
        type: String,
        required: [true, 'Por favor ingresa la contraseña del password']
    },

    role: {
        type: String,
        default: 'USER_ROLE'
    },

});

usuarioSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Usuario', usuarioSchema);