const { response } = require( 'express' );
const { ObjectId } = require( 'mongoose' ).Types;

const { Categoria ,Usuario } = require( '../models' );

const coleccioneaPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsarios = async( termino = '', res = response ) => {
    const esMongoID = ObjectId.isValid( termino );

    if( esMongoID ) {
        const usuario = await Usuario.findById( termino );
        return res.status(201).json({
            results: ( usuario ) ? [ usuario ] : []
        });
    } 

    const regex = new RegExp( termino, 'i' );
    const usuarios = await Usuario.find({ 
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
     });

    res.status(201).json({
        results: usuarios
    });
}

const buscarCategorias = async( termino = '', res = response ) => {
    const esMongoID = ObjectId.isValid( termino );

    if( esMongoID ) {
        const categoria = await Categoria.findById( termino );
        return res.status(201).json({
            results: ( categoria) ? [ categoria ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    const categorias = await Categoria.find({ nombre: regex, estado: true });

    res.status( 201 ).json({
        results: categorias
    })
}
const buscar = ( req, res = response ) => {
    const { coleccion, termino } = req.params;

    if( coleccioneaPermitidas.includes( coleccion ) ) {

    } else {
        return res.status(400).json({ msg: `Las colecciones permitidas son: ${ coleccioneaPermitidas}` });
    }

    switch( coleccion ) {
        case 'usuarios':
            buscarUsarios( termino, res );
            break;
        case 'categorias':
            buscarCategorias( termino, res );
            break;
        case 'productos':
            break;
        default: 
            res.status(500).json({ msg: 'No se a implementado discha busqueda' });
    }
}

module.exports = { buscar };