const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { default: mongoose } = require('mongoose')
const path = require('path')
const createError = require('http-errors')
const { allRoutes } = require('./routes/routes')

module.exports = class Application {
    #app = express()
    #DB_URL
    #PORT
    #COOKIE_PARSER

    constructor(PORT, DB_URL, COOKIE_PARSER) {
        this.#PORT = PORT
        this.#DB_URL = DB_URL
        this.#COOKIE_PARSER = COOKIE_PARSER
        this.configApplication()
        this.connectTO_DB()
        this.corsOptions()
        this.cookieParserConfig()
        this.createRoutes()
        this.createServer()
        this.errorHandling()
    }

    configApplication() {
        this.#app.use(express.json())
        this.#app.use(express.urlencoded({ extended: true }))

        this.#app.use(express.static(path.join(__dirname, '..', 'public')))
    }

    corsOptions() {
        const corsOptions = {
            origin: true,
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization'],
        }
        this.#app.use(cors(corsOptions))
    }

    cookieParserConfig() {
        this.#app.use(cookieParser(this.#COOKIE_PARSER))
    }


    createServer() {
        const http = require('http')
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log(`run > http://localhost:${this.#PORT}`)
        })
    }

    connectTO_DB() {
        mongoose
            .connect(this.#DB_URL)
            .then(() => console.log('connect to db'))
            .catch((err) => console.log(err?.message ?? 'failed to connect db'))
    }

    createRoutes() {
        // routes
        this.#app.use('/api/v1', allRoutes)
    }

    errorHandling() {
        this.#app.use((req, res, next) => {
            next(createError.NotFound('Not Found'))
        })

        /* eslint-disable-next-line no-unused-vars */
        this.#app.use((error, req, res, next) => {
            const serverError = createError.InternalServerError('Server Error')
            const statusCode = error.status || serverError.status
            const message = error.message || serverError.message
            return res.status(statusCode).json({
                error: {
                    statusCode,
                    message,
                },
            })
        })
    }
}
