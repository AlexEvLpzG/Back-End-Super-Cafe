const { Categoria, Role, Usuario } = require( '../models' );
// const Role = require( '../models/role' );
// const Usuario = require( '../models/usuario' );

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

const existeUsuarioPorId = async( id ) => {
    // * Verificar si el usuario existe
    const existeUsuario = await Usuario.findById( id );

    if( !existeUsuario ) {
        throw new Error( `El id no existe ${ id }` );
    }
}

const exiteCategoriaId = async( id ) => {
    // * Verifica si la categoria existe
    const existeCategoria = await Categoria.findById( id );

    if( !existeCategoria ) {
        throw new Error( `La categoria con el id:${ id } no exite` );
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    exiteCategoriaId
}