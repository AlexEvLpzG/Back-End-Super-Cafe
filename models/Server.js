const express = require( 'express' );
const cors = require( 'cors' );

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.port;

        //* Rutas de la applicación
        this.routes();
    }

    middlewares() {
        // * Cors
        this.app.use( cors() );

        // * Lectura y parseo del body
        this.app.use( express.json() );

        // * Directorio Público
        this.app.use( express.static( 'public' ) );
    }

    routes() {

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log( 'Servidor corriendo en el puerto: ', this.port );
        });
    }
}

module.exports = Server;