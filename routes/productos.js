const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { crearProducto, obtenerProductos } = require( '../controllers/productos' );
const { exiteCategoriaId } = require('../helpers/db-validators');
const { validarCampos, validarJWT } = require('../middlewares');

const router = Router();

/*
* /api/productos
*    
*/

// ? Obtener todas las productos - public
router.get( '/', obtenerProductos );

// ? Obtener productos por el id - publico
router.get( '/:id', ( req, res ) => {
    const { id } = req.params;
    
    res.json({
        msg: `Obteniendo el producto con el id: ${ id }`
    });
});

// ? Crear productos - Privado - Cualquiera con un token válido
router.post( '/', 
    [
        validarJWT,
        check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
        check( 'categoria', 'La categoria es invalida' ).isMongoId(),
        check( 'categoria' ).custom( exiteCategoriaId ),
        validarCampos,
    ], crearProducto
);

// ? Actualizar productos - Privado - Cualquiera con un token válido
router.put( '/:id', ( req, res ) => {
    const { id } = req.params;
    res.json({
        msg: `Modificando el producto con el id: ${ id }`
    });
});

// ? Borrar productos - Solo con permiso de administrador
router.delete( '/:id', ( req, res ) => {
    const { id } = req.params;

    res.json({
        msg: `El producto con el id: ${ id }, ha sido desactivado`
    });
});

module.exports = router;