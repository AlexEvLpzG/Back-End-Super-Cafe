const { response } = require( 'express' );
const { subirArchivo } = require( '../helpers/subir-archivos' );
const { Usuario, Producto } = require( '../models' );

const cargarArchivo = async( req, res = response ) => {
    if ( !req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
        return res.status(400).json({ msg: 'No hay archivos que subir.' });
    }

    try {
        // const nombre = await subirArchivo( req.files, [ 'txt', 'md' ], 'textos' );
        const nombre = await subirArchivo( req.files, undefined, 'imgs' );
        res.status(200).json({ nombre });
    } catch( msg ) {
        res.status(400).json({ msg });
    }
}

const actualizarImagen = async( req , res = response ) => {
    if ( !req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
        return res.status(400).json({ msg: 'No hay archivos que subir.' });
    }

    const { id, coleccion } = req.params;

    let modelo;

    switch( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById( id );
            if( !modelo ) {
                return res.status(400).json({ msg: `No existe un usuario con el id: ${ id }` });
            }
            break;
        case 'productos':
            modelo = await Producto.findById( id );
            if( !modelo ) {
                return res.status(400).json({ msg: `No existe un producto con el id: ${ id }` });
            }
            break;
        default: 
            return res.status(500).json({ msg: 'No se ha agregado la colección' });
    }

    const nombre = await subirArchivo( req.files, undefined, coleccion );
    modelo.img = nombre;

    await modelo.save();

    res.json( modelo )
}

module.exports = { 
    cargarArchivo,
    actualizarImagen
}