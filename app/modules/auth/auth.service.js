const autoBind = require('auto-bind')
const { userModel } = require('../../models/user.model')
const createHttpError = require('http-errors')
const { hashPassword } = require('../../common/password/bcrypt.password')
const { createJwt } = require('../../common/jwt/jwt')

class AuthService {
    #userModel
    constructor() {
        autoBind(this)
        this.#userModel = userModel
    }

    async registerUser(userDto) {
        const { email } = userDto
        const user = await this.existUser(email)
        if (user) {
            throw createHttpError[401]('This user already exists')
        }
        userDto.password = hashPassword(userDto.password)
        const createNewUser = await this.#userModel.create(userDto)
        return createNewUser
    }

    async loginUser(userDto) {
        const existsUser = await this.existUser(userDto?.email)
        if (!existsUser) {
            throw createHttpError[401]('Not Found Any User')
        }

        const isPasswordValid = await verifyPassword(
            userDto?.password,
            existsUser?.password
        )
        if (!isPasswordValid) {
            throw createHttpError[401]('Password is not valid')
        }

        const accessToken = createJwt({ id: existsUser?._id }, '1d')
        const refreshToken = createJwt({ id: existsUser?._id }, '30d')
        return { accessToken, refreshToken }
    }

    async getUserInformation(userId) {
        const user = await this.#userModel.findById(userId).select('-password')
        return user
    }

    async existUser(email) {
        const existUser = await this.#userModel.findOne({ email })
        return existUser
    }
}

module.exports = {
    AuthService: new AuthService(),
}