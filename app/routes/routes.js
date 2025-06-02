const AuthGuard = require('../common/guard/authGuard')
const { authRoutes } = require('../modules/auth/auth.routes')
const { taskRoutes } = require('../modules/tasks/tasks.routes')

const router = require('express').Router()

router.use('/auth', authRoutes)
router.use('/tasks', AuthGuard, taskRoutes)

module.exports = {
    allRoutes: router,
}
