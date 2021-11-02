const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {

    constructor () {
        this.app = express()
        this.port = process.env.PORT
        // Connect DB
        this.connectDB()

        // Middlewares
        this.middlewares()
        this.routes()
    }

    async connectDB () {
        await dbConnection()
    }

    middlewares () {
        // CORS
        this.app.use(cors())
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.get('/', (req, res) => {
            res.send('Hello World!')
        })
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        })
    }
}

module.exports = Server