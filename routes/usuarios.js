const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { crearUsuario, actualizarUsuario, obtenerUsuarios, eliminarUsuario } = require('../controllers/usuarios');

const router = Router();

router.post( '/', 
    [
        check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
        check( 'correo', 'El dirección de correo electronico no es válido' ).isEmail(),
        check( 'correo' ).custom( emailExiste ),
        check( 'password', 'El password debe de ser más de 6 letras' ).isLength({ min: 6 }),
        // check( 'rol', 'No es un rol válido' ).isIn([ 'ADMIN_ROLE', 'USER_ROLE' ]),
        check( 'rol' ).custom( esRoleValido ),
        validarCampos
    ],
    crearUsuario 
);

router.put( '/:id', 
    [
        check( 'id', 'No es un ID válido' ).isMongoId(),
        check( 'id' ).custom( existeUsuarioPorId ),
        check( 'rol' ).custom( esRoleValido ),
        validarCampos
    ],
    actualizarUsuario 
);

router.get( '/', obtenerUsuarios );

router.delete( '/:id', 
    [
        validarJWT,
        check( 'id', 'No es un ID válido' ).isMongoId(),
        check( 'id' ).custom( existeUsuarioPorId ),
        validarCampos
    ],
    eliminarUsuario 
);

router.patch( '/' );

module.exports = router;