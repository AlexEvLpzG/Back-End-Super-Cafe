const express = require( 'express' );
const cors = require( 'cors' );
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.port;
        this.usuariosPath = '/api/usuarios';

        // * Conectar a base de datos
        this.conectarDB();

        // * Middlewares
        this.middlewares();

        // * Rutas de la applicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
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
        this.app.use( this.usuariosPath, require( '../routes/usuarios' ) );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log( 'Servidor corriendo en el puerto:', this.port );
        });
    }
}

module.exports = Server;