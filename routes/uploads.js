const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

const { validarCampos } = require( '../middlewares/validar-campos' );
const { cargarArchivo, actualizarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators');

const router = Router();

router.post( '/', cargarArchivo );

router.put( '/:coleccion/:id',
    [
        check( 'id', 'El Id no es valido' ).isMongoId(),
        check( 'coleccion' ).custom( c => coleccionesPermitidas( c, [ 'usuarios', 'productos' ]) ),
        validarCampos
    ], actualizarImagen
)

module.exports = router;