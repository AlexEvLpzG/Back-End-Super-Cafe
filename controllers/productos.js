const { response } = require( 'express' );
const { Categoria, Producto } = require('../models');

const crearProducto = async( req, res = response ) => {
    const { estado, usuario, ...body } = req.body;

    let producto = await Producto.findOne({ nombre: body.nombre });

    if( producto ) {
        return res.status(400).json({
            msg: `El Producto con el nombre:"${ producto.nombre }" ya existe`
        });
    }

    const data = {
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id,
        ...body
    }

    producto = await Producto( data );

    // Todo: Guardar en la DB
    await producto.save();

    res.status(201).json( producto );
}


module.exports = {
    crearProducto
}