const { Router } = require( 'express' );
const router = Router();

router.get( '/'  );

router.put( '/:id'  );

router.post( '/'  );

router.delete( '/' );

router.patch( '/' );

module.exports = router;