const { Schema, model } = require( 'mongoose' );

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre es obligatorio' ]
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        types: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [ true, 'El Usuario es obligatorio' ]
    }
});

module.exports = model( 'Categoria', CategoriaSchema );