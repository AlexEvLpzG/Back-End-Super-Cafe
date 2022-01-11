const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { crearUsuario } = require('../controllers/usuarios');

const router = Router();

router.post( '/', 
    [
        check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
        check( 'password', 'El password debe de ser más de 6 letras' ).isLength({ min: 6 }),
        check( 'correo', 'El dirección de correo electronico no es válido' ).isEmail(),
        check( 'rol', 'No es un rol válido' ).isIn([ 'ADMIN_ROLE', 'USER_ROLE' ])
    ],
    crearUsuario 
);

router.get( '/'  );

router.put( '/:id'  );

router.delete( '/' );

router.patch( '/' );

module.exports = router;