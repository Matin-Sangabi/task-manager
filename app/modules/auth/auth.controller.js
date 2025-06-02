const autoBind = require('auto-bind')
const { AuthService } = require('./auth.service')

class AuthController {
    #authService
    constructor() {
        autoBind(this)
        this.#authService = AuthService
    }

    async registerUser(req, res, next) {
        try {
            await registerSchema.validateAsync(req.body)
            const { email, password, first_name, last_name } = req.body
            const userDto = { email, password, first_name, last_name }
            const user = await this.#authService.registerUser(userDto)
            res.status(201).json({
                message: 'User created successfully',
                data: user,
            })
        } catch (error) {
            next(error)
        }
    }

    async loginUser(req, res, next) {
        try {
            const { email, password } = req.body
            const userDto = { email, password }
            const user = await this.#authService.loginUser(userDto)
            res.status(200).json({
                message: 'User logged in successfully',
                data: user,
            })
        } catch (error) {
            next(error)
        }
    }

    async getUserInformation(req, res, next) {
        try {
            const { id } = req.user
            const user = await this.#authService.getUserInformation(id)
            res.status(200).json({
                message: 'User information fetched successfully',
                data: user,
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    AuthController: new AuthController(),
}
