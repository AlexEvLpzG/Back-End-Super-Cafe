const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto } = require( '../controllers/productos' );
const { exiteCategoriaId, exiteProductoId } = require('../helpers/db-validators');
const { validarCampos, validarJWT } = require('../middlewares');

const router = Router();

/*
* /api/productos
*    
*/

// ? Obtener todas las productos - public
router.get( '/', obtenerProductos );

// ? Obtener productos por el id - publico
router.get( '/:id', 
    [
        check( 'id', 'El ID es incorrecta' ).isMongoId(),
        check( 'id' ).custom( exiteProductoId ),
        validarCampos
    ], obtenerProducto
);

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
router.put( '/:id', 
    [
        validarJWT,
        check( 'categoria', 'La categoria es invalida' ).isMongoId(),
        check( 'id', 'El ID es incorrecto' ).isMongoId(),
        check( 'id' ).custom( exiteProductoId ),
        validarCampos
    ], actualizarProducto
);

// ? Borrar productos - Solo con permiso de administrador
router.delete( '/:id', ( req, res ) => {
    const { id } = req.params;

    res.json({
        msg: `El producto con el id: ${ id }, ha sido desactivado`
    });
});

module.exports = router;