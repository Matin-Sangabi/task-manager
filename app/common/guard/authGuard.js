const createHttpError = require('http-errors')
const { verifyJwt } = require('../jwt/Jwt')
const { userModel } = require('../../models/user.model')

async function AuthGuard(req, res, next) {
    try {
        const access = req.headers?.authorization
        if (access) {
            const token = access.split(' ')[1]
            if (!token) {
                throw createHttpError.Unauthorized('not find token')
            }
            const data = verifyJwt(token)
            if (typeof data === 'object' && 'id' in data) {
                const user = await userModel
                    .findById(data?.id, { _id: 1 , role : 1 })
                    .lean()
                if (!user) {
                    throw createHttpError.Unauthorized(
                        'not find user or valid token'
                    )
                }
                req.user = user
                return next()
            }
        }
        throw createHttpError.Unauthorized('not find user or valid token')
    } catch (error) {
        if (!res.headersSent) {
            next(error)
        }
    }
}

module.exports = AuthGuard
