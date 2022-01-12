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

const actualizarUsuario = async( req = request, res = response ) => {
    const { id } = req.params;
    const { password, google, correo,...resto } = req.body;

    // Todo: Validar contra la base de datos
    if( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json({
        msg: 'put API - usuarioPut',
        usuario
    });
}

module.exports = {
    crearUsuario,
    actualizarUsuario
}