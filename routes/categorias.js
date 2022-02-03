const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { crearCategoria } = require('../controllers/categorias');
const { validarJWT, validarCampos } = require('../middlewares');

const router = Router();

/*
* /api/categorias
*    
*/

// ? Obtener todas las categorias - public
router.get( '/', ( req, res ) => {
    res.json({
        msg: 'get'
    });
});

// ? Obtener categoria por el id - publico
router.get( '/:id', ( req, res ) => {
    res.json({
        msg: 'get by id'
    });
});

// ? Crear categoria - Privado - Cualquiera con un token válido
router.post( '/', 
    [ 
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ], crearCategoria
);

// ? Actualizar categoria - Privado - Cualquiera con un token válido
router.put( '/:id', ( req, res ) => {
    res.json({
        msg: 'put'
    });
});

// ? Borrar categoria - Solo con permiso de administrador
router.delete( '/:id', ( req, res ) => {
    res.json({
        msg: 'delete'
    });
});

module.exports = router;