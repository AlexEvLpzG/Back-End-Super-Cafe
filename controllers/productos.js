const { response } = require( 'express' );
const { Producto } = require( '../models' );

const obtenerProductos = async( req, res = response ) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    
    const [ total, productos ] = await Promise.all([
        Producto.countDocuments( query ),
        Producto.find( query ).populate( 'usuario', 'nombre' )
            .skip( Number( desde ) ).limit( Number( limite ) )
    ]);

    res.status(201).json({
        total,
        productos
    });
}

const obtenerProducto = async( req, res ) => {
    const { id } = req.params;

    const productoDB = await Producto.findById( id ).populate( 'usuario', 'nombre' );

    if( !productoDB.estado ) {
        return res.status(400).json({ msg: 'Producto incorrecta - estado: false' })
    }

    res.status(201).json( productoDB );
}

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
    obtenerProductos,
    obtenerProducto,
    crearProducto,
}