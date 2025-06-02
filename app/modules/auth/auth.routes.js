const AuthGuard = require('../../common/guard/authGuard')
const { AuthController } = require('./auth.controller')
const router = require('express').Router()

router.post('/register', AuthController.registerUser)
router.post('/login', AuthController.loginUser)
router.get('/user', AuthGuard, AuthController.getUserInformation)

module.exports = {
    authRoutes: router,
}
