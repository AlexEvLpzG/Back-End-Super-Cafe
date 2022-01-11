const Role = require( '../models/role' );
const Usuario = require( '../models/usuario' );

const esRoleValido = async( rol = '' ) => {
    // * Verificar si el rol existe
    const existeRole = await Role.findOne({ rol });
    if( !existeRole ) {
        throw new Error( `El rol ${ rol } no está registrado en la BD` );
    }
}

const emailExiste = async( correo = '' ) => {
    // * Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });

    if( existeEmail ) {
        throw new Error( `El correo ${ correo } ya está registrado` );
    }
}

module.exports = {
    esRoleValido,
    emailExiste
}