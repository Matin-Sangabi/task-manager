const { Router } = require('express')
const { AuthController } = require('./auth.controller')
const { AuthGuard } = require('../../common/guard/authGuard')
const router = Router()

router.post('/register', AuthController.registerUser)
router.post('/login', AuthController.loginUser)
router.get('/user', AuthGuard, AuthController.getUserInformation)

module.exports = {
    authRoutes: router,
}
