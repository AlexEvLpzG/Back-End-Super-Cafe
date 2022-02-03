const { response } = require( 'express' );
const { Categoria } = require( '../models' );

const obtenerCategorias = async( req, res = response ) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments( query ),
        Categoria.find( query ).populate( 'usuario', 'nombre' )
            .skip( Number( desde ) ).limit( Number( limite ) )
    ]);

    res.status(201).json({
        total,
        categorias
    });
} 

// Todo: ObtenerCategoria - populate{}

const crearCategoria = async( req, res = response ) => {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre });

    if( categoriaDB ) {
        return res.status( 400 ).json({
            msg: `La categoria ${ categoriaDB.nombre } que intenta agregar ya existe` 
        });
    }

    // Todo: Generar la daya a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data );

    // Todo: Guardar en la DB
    await categoria.save();

    res.status(201).json( categoria );
}

// Todo: ActualizarCategoria

// Todo: BorrarCategoria - estado : false

module.exports = {
    crearCategoria,
    obtenerCategorias
}