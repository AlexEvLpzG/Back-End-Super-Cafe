const Role = require("../models/role");

const esRoleValido = async ( rol = '' ) => {
    const existeRole = await Role.findOne({ rol });
    if( !existeRole ) {
        throw new Error( `El rol ${ rol } no está registrado en la BD` );
    }
}

module.exports = {
    esRoleValido
}