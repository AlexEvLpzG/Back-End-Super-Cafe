const { response, request } = require( 'express' );
const bcryptjs = require( 'bcryptjs' );

const Usuario = require( '../models/usuario' );
const { validationResult } = require( 'express-validator' );

const crearUsuario = async( req = request, res = response ) => {
    // * Para mostrar los errores
    const errors = validationResult( req );
    if( !errors.isEmpty() ) {
        return res.status( 400 ).json( errors );
    }

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // * Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });

    if( existeEmail ) {
        return res.status(400).json({
            msg: 'El correo ya está registrado'
        });
    }

    // * Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // * Guardar en BD
    await usuario.save();

    res.json({
        msg: 'post Api -Usuarios Post',
        usuario
    });
}

module.exports = {
    crearUsuario,
}