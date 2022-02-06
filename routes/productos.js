const { Router } = require( 'express' );

const router = Router();

/*
* /api/productos
*    
*/

// ? Obtener todas las productos - public
router.get( '/', ( req, res ) => {
    res.json({
        msg: 'Obteniendo productos'
    });
});

// ? Obtener productos por el id - publico
router.get( '/:id', ( req, res ) => {
    const { id } = req.params;
    
    res.json({
        msg: `Obteniendo el producto con el id: ${ id }`
    });
});

// ? Crear productos - Privado - Cualquiera con un token válido
router.post( '/', ( req, res ) => {
    res.json({
        msg: 'Creando producto'
    });
});

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