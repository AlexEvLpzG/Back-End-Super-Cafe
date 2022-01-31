const { request, response } = require( 'express' );
const bcryptjs = require( 'bcryptjs' );

const { generarJWT } = require( '../helpers/generar-jwt' );
const Usuario = require( '../models/usuario' );
const { googleVerify } = require( '../helpers/google-verify' );

const login = async( req = request, res = response ) => {
    const { correo, password } = req.body;

    try {
        // * Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });

        if( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        // * Si el usuario está activo
        if( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        // * Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );

        if( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        // * Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            msg: 'Login ok',
            usuario,
            token
        });
    } catch (error) {
        console.log( error );
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const googleSignIn = async( req = request, res = response  ) => {
    const { id_token } = req.body;

    try {
        const googleUser = await googleVerify( id_token );

        res.json({
            msg: 'GoogleSing-In ok',
            googleUser
        });
    } catch ( error ) {
        res.status(400).json({
            msg: 'Token de Google no es válido'
        });
    }
}

module.exports = { 
    login,
    googleSignIn 
}