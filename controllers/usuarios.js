const { response, request } = require( 'express' );
const bcryptjs = require( 'bcryptjs' );

const Usuario = require( '../models/usuario' );

const crearUsuario = async( req = request, res = response ) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // * Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // * Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

module.exports = {
    crearUsuario,
}