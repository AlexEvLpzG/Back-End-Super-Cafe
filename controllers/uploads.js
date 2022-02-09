const { response } = require( 'express' );
const { subirArchivo } = require( '../helpers/subir-archivos' );

const cargarArchivo = async( req, res = response ) => {
    if ( !req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
        return res.status(400).json({ msg: 'No hay archivos que subir.' });
    }

    const nombre = await subirArchivo( req.files );

    res.status(200).json({ nombre });
}

module.exports = { 
    cargarArchivo
}